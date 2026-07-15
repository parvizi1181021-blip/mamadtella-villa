# ⚙️ راهنمای تنظیمات - Mamadtella Villa

## 📄 config.json

### Server Configuration
```json
{
  "server": {
    "port": 118,
    "hostname": "localhost"
  }
}
```

| پارامتر | توضیح | مثال |
|---------|------|-------|
| `port` | پورت سرور HTTP | `118`, `8080`, `3000` |
| `hostname` | نام میزبان | `localhost`, `0.0.0.0` |

---

### Gate Configuration
```json
{
  "gate": {
    "name": "درب حیاط",
    "host": "10.10.10.99",
    "port": 2000,
    "payloadHex": "00 01 02 03...",
    "timeoutMs": 5000
  }
}
```

| پارامتر | توضیح |
|---------|-------|
| `name` | نام درب |
| `host` | آی‌پی رله |
| `port` | پورت رله |
| `payloadHex` | فرمان کنترلی (Hex) |
| `timeoutMs` | زمان انتظار (میلی‌ثانیه) |

**نحوه یافتن Payload:**
1. به تنظیمات رله برو
2. فرمان کنترلی را پیدا کن
3. به شکل Hex کپی کن
4. Space‌ها رو نگاه داشت

---

### Whisper Configuration
```json
{
  "whisper": {
    "enabled": true,
    "ffmpegPath": "ffmpeg",
    "whisperBinPath": "./whisper.cpp/main",
    "whisperModelPath": "./models/ggml-large-v3-turbo-q5_0.bin",
    "language": "fa"
  }
}
```

| پارامتر | توضیح |
|---------|-------|
| `enabled` | فعال/غیرفعال |
| `ffmpegPath` | مسیر ffmpeg |
| `whisperBinPath` | مسیر Whisper executable |
| `whisperModelPath` | مسیر مدل |
| `language` | کد زبان: `fa` (فارسی), `en` (انگلیسی) |

---

## 🔐 .env File

```bash
# Ollama
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=mistral

# Server
PORT=118
NODE_ENV=production  # یا development

# SMS (اختیاری)
SMS_ENABLED=false
SMS_USERNAME=your_sms_account
SMS_PASSWORD=your_sms_password
SMS_BODYID=123456

# Whisper
WHISPER_ENABLED=true
WHISPER_LANGUAGE=fa

# Debug
DEBUG=false
LOG_LEVEL=info  # debug, info, warn, error

# Sessions
SESSION_TTL_HOURS=12

# Rate Limiting
LOGIN_MAX_ATTEMPTS=5
LOGIN_WINDOW_MINUTES=10
LOGIN_BLOCK_MINUTES=15
```

---

## 📺 Dahua Camera Setup

### پیکربندی دوربین

1. **وارد تنظیمات دوربین شو:**
   - مرورگر: `http://10.10.10.x` (IP دوربین)
   - Username: معمولاً `admin`
   - Password: رمز دوربین

2. **تنظیمات امنیتی:**
   - برو: Setup → System → Security
   - Enable "Basic Authentication" یا "Legacy Compatibility"
   - یادداشت کن: Username, Password, IP

3. **CGI URLs:**
   ```
   Snapshot: /cgi-bin/snapshot.cgi?channel=1
   Stream: /cgi-bin/mjpg/video.cgi?channel=1&subtype=0
   ```

4. **در Mamadtella اضافه کن:**
   - Name: درب ورودی
   - Host: 10.10.10.x
   - Port: 80
   - Channel: 1
   - Username: admin (یا username دوربین)
   - Password: رمز دوربین

---

## 🔊 Ollama Models

### Mistral (توصیه شده)
```bash
ollama pull mistral
```
- **Size:** 4GB
- **Speed:** سریع
- **Quality:** خوب
- **Memory:** 8GB+ RAM

### Neural Chat (بهترین برای مکالمه)
```bash
ollama pull neural-chat
```
- **Size:** 4GB
- **Speed:** سریع
- **Quality:** عالی
- **Memory:** 8GB+ RAM

### Llama2 (بهترین کیفیت)
```bash
ollama pull llama2
```
- **Size:** 3.5GB
- **Speed:** متوسط
- **Quality:** بسیار خوب
- **Memory:** 8GB+ RAM

### Orca Mini (برای سیستم‌های ضعیف)
```bash
ollama pull orca-mini
```
- **Size:** 1.9GB
- **Speed:** خیلی سریع
- **Quality:** باقبول
- **Memory:** 4GB+ RAM

### تغییر مدل:
```bash
# .env یا config.json میں:
OLLAMA_MODEL=llama2
```

---

## 📱 SMS Service (اختیاری)

### ملی‌پیامک Setup

1. **ثبت‌نام:** https://www.melipayamak.com
2. **پنل وب‌سرویس وارد شو**
3. **یوزرنیم و پسورد کپی کن**
4. **الگو (Pattern) بسازْ:**
   - `@bodyId@arg1;arg2` فرمت
   - مثال: `@12345@[نام کاربری];[رمز عبور]`
   - کد الگو را کپی کن (bodyId)

5. **در .env قرار بده:**
   ```bash
   SMS_ENABLED=true
   SMS_USERNAME=your_melipayamak_username
   SMS_PASSWORD=your_melipayamak_password
   SMS_BODYID=12345
   ```

6. **تست کن:**
   - پنل مدیر → تنظیمات پیامک → ارسال تست

---

## 🎯 Windows 11 Specific

### Firewall
```powershell
# به عنوان Administrator
New-NetFirewallRule -DisplayName "Mamadtella-118" -Direction Inbound -LocalPort 118 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Ollama-11434" -Direction Inbound -LocalPort 11434 -Protocol TCP -Action Allow
```

### Environment Path
```bash
# چک کن ffmpeg و ollama قابل دسترسی هستند:
where ffmpeg
where ollama.exe

# اگر نه، مسیر رو به PATH اضافه کن:
setx PATH "%PATH%;C:\Program Files\ffmpeg\bin"
setx PATH "%PATH%;C:\Program Files\Ollama"
```

---

## 🔍 بررسی و Debug

### چک کردن Ollama
```bash
curl http://localhost:11434/api/tags
```

### چک کردن Server
```bash
curl http://localhost:118/api/ai/health
```

### چک کردن دوربین
```bash
curl http://10.10.10.x/cgi-bin/snapshot.cgi?channel=1 > test.jpg
```

### لاگ‌ها
```bash
# Server log
set DEBUG=true
npm start

# یا فایل log:
dir logs/
```

---

## 🔒 بهترین Practices

✅ **توصیه‌های امنیتی:**
- [ ] رمز مدیر را فوراً تغییر بده
- [ ] تنها HTTPS در production استفاده کن
- [ ] پسورد‌های دوربین را تغییر بده
- [ ] Rate limiting را فعال نگاه‌دار
- [ ] منظم لاگ‌ها رو بررسی کن

✅ **بهترین Practices:**
- [ ] مدل Mistral یا Neural-Chat استفاده کن
- [ ] Temperature رو 0.7 نگاه دار
- [ ] Session TTL رو 12 ساعت نگاه دار
- [ ] منظم backup بگیر
- [ ] Ollama رو آپدیت نگاه‌دار

---

## 🚨 Troubleshooting

### Ollama کار نمی‌کنه
```bash
# Restart
ollama serve

# یا دیگر پورت
set OLLAMA_HOST=http://localhost:11435
ollama serve
```

### Port conflict
```bash
# پورت 118 استفاده شده
netstat -ano | findstr :118
taskkill /PID <PID> /F

# یا port تغییر بده
config.json: "port": 8080
```

### دوربین متصل نشد
```bash
# IP را ping کن
ping 10.10.10.x

# Browser test
http://10.10.10.x/cgi-bin/snapshot.cgi

# Username/Password غلط بود؟
# تغییر به: admin/admin
```

### Whisper خطا
```bash
# ffmpeg نصب است؟
ffmpeg -version

# مدل موجود است؟
dir models/

# whisper.cpp موجود است؟
dir whisper.cpp/
```

---

**سوالی دارید؟**
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions
- 📖 Wiki: Documentation
