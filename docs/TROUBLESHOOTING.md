# 🔧 عیب‌یابی - Mamadtella Villa

## ⚠️ مشکلات رایج

### 1. "Ollama not responding"

**علت:** Ollama شروع نشده یا مدل‌ها دانلود نشده‌اند

**راه‌حل:**
```bash
# 1. Ollama را شروع کن
ollama serve

# 2. منتظر "Listening on..." پیام

# 3. در پنجره دوم مدل‌ها را دانلود کن
ollama pull mistral
ollama pull neural-chat

# 4. سرور را شروع کن
npm start
```

**اگر مشکل باقی است:**
```bash
# پورت را تغییر بده
set OLLAMA_HOST=http://localhost:11435
ollama serve

# .env تغییر کن:
OLLAMA_HOST=http://localhost:11435
```

---

### 2. "Port 118 already in use"

**علت:** پروسس دیگری از پورت استفاده می‌کند

**راه‌حل 1 - پورت را پیدا و بند کن:**
```bash
# پروسس را پیدا کن
netstat -ano | findstr :118

# Output: TCP 0.0.0.0:118 LISTENING 1234
# (1234 = PID)

# بند کن
taskkill /PID 1234 /F
```

**راه‌حل 2 - پورت دیگری استفاده کن:**
```bash
# config.json تغییر کن
"port": 8080

# سرور را شروع کن
npm start

# دسترسی
http://localhost:8080
```

---

### 3. "npm: command not found"

**علت:** Node.js درست نصب نشده یا PATH غلط است

**راه‌حل:**
```bash
# Node.js نصب است؟
node --version
npm --version

# اگر خطا دارید:
# 1. Node.js را دانلود و دوباره نصب کنید
https://nodejs.org

# 2. PowerShell/CMD را دوباره باز کنید

# 3. از Administrator باز کنید
```

---

### 4. "Permission denied"

**علت:** درخواست اجازه‌ی Administrator

**راه‌حل:**
```bash
# Windows:
# Command Prompt/PowerShell را "Run as Administrator" باز کن
# سپس دستورات را اجرا کن
```

---

### 5. "Cannot find module 'dotenv'"

**علت:** Dependencies نصب نشده‌اند

**راه‌حل:**
```bash
# npm install را دوباره اجرا کن
npm install

# یا حذف و دوباره نصب
rm -r node_modules
rm package-lock.json
npm install
```

---

### 6. "Whisper model not found"

**علت:** مدل Whisper دانلود نشده یا مسیر غلط است

**راه‌حل:**
```bash
# 1. مدل دانلود شده؟
ls models/

# 2. اگر نه، دانلود کن
mkdir models

# Windows PowerShell:
$ProgressPreference = 'SilentlyContinue'
(New-Object Net.WebClient).DownloadFile(
  'https://huggingface.co/openai/whisper-large-v3-turbo/resolve/main/ggml-large-v3-turbo-q5_0.bin',
  'models/ggml-large-v3-turbo-q5_0.bin'
)

# 3. config.json بررسی کن
"whisperModelPath": "./models/ggml-large-v3-turbo-q5_0.bin"
```

---

### 7. "FFmpeg not found"

**علت:** FFmpeg نصب نشده یا در PATH نیست

**راه‌حل:**
```bash
# FFmpeg نصب است؟
ffmpeg -version

# اگر نه، نصب کن:
# Windows:
choco install ffmpeg

# یا دستی:
# 1. https://ffmpeg.org/download.html
# 2. نصب کن
# 3. PATH به آن اضافه کن

# بررسی کن
ffmpeg -version
```

---

### 8. "Camera connection failed"

**علت:** دوربین در دسترس نیست یا اعتبار غلط است

**راه‌حل:**
```bash
# 1. IP را ping کن
ping 10.10.10.x

# 2. مرورگر test کن
http://10.10.10.x

# 3. Snapshot test کن
http://10.10.10.x/cgi-bin/snapshot.cgi?channel=1

# 4. Username/Password بررسی کن
# معمولاً: admin/admin

# 5. دوربین تنظیمات بررسی کن
# Setup > System > Security
# "Basic Authentication" را فعال کن
```

---

### 9. "Database locked"

**علت:** چند برنامه همزمان database نوشتن

**راه‌حل:**
```bash
# 1. تمام سرور‌ها بند کن
Ctrl+C

# 2. انتظر 2 ثانیه

# 3. دوباره شروع کن
npm start
```

---

### 10. "Session expired" یا "Please login again"

**علت:** Session TTL منقضی شده (پیش‌فرض 12 ساعت)

**راه‌حل:**
```bash
# دوباره وارد شو:
http://localhost:118

# یا TTL تغییر بده:
# .env:
SESSION_TTL_HOURS=24
```

---

## 🔍 Debug Mode

### فعال کن:
```bash
# .env میں:
DEBUG=true
LOG_LEVEL=debug

# یا:
set DEBUG=true
npm start
```

### لاگ‌ها بررسی کن:
```bash
# Console میں:
شامل: [DEBUG], [INFO], [WARN], [ERROR]

# یا فایل لاگ:
dir logs/
type logs/latest.log
```

---

## 🧪 Test Mode

### API Test کن:
```bash
# Health check
curl http://localhost:118/api/ai/health

# Chat
curl -X POST http://localhost:118/api/ai/chat -H "Content-Type: application/json" -d '{"message": "سلام"}'

# Ollama check
curl http://localhost:11434/api/tags
```

### Browser Console:
```javascript
// F12 > Console
fetch('/api/ai/health').then(r => r.json()).then(console.log)
```

---

## 📋 Performance Issues

### چاق سرور

**علت:** CPU یا RAM بالا

**راه‌حل:**
```bash
# مدل سبک‌تر استفاده کن
ollama pull orca-mini

# .env:
OLLAMA_MODEL=orca-mini
```

### پاسخ آهسته

**علت:** GPU استفاده نشده یا شبکه آهسته

**راه‌حل:**
```bash
# GPU استفاده کن (اگر موجود):
set CUDA_VISIBLE_DEVICES=0
ollama serve

# یا مدل سریع‌تر:
ollama pull mistral
```

---

## 🔄 Restart Services

### Complete Reset:
```bash
# 1. تمام پنجره‌ها بند کن
Ctrl+C

# 2. Database backup
xcopy data data.backup /E /I

# 3. Ollama دوباره شروع
ollama serve

# 4. پنجره دوم - Server
npm start

# 5. دسترسی
http://localhost:118
```

---

## 💾 Backup & Restore

### Backup:
```bash
# تمام داده‌ها
xcopy data data_backup /E /I /Y
xcopy .env .env.backup /Y
xcopy config.json config.json.backup /Y
```

### Restore:
```bash
# داده‌ها بازگردان
xcopy data_backup data /E /I /Y
```

---

## 🗑️ Deep Clean

### تمام چیز پاک کن و دوباره شروع:
```bash
# 1. پروژه بند کن
Ctrl+C

# 2. node_modules حذف کن
rmdir /s /q node_modules
del package-lock.json

# 3. npm دوباره نصب
npm install

# 4. Ollama دوباره شروع
ollama serve

# 5. Server
npm start
```

---

## 📞 وقتی هیچ چیز کار نکنه

1. **فایل‌های لاگ جمع کن:**
   ```bash
   dir logs/
   copy logs/ logs_backup/
   ```

2. **Issue بسازْ:**
   - GitHub Issues
   - شامل: error message, OS, Node version, RAM

3. **Minimal Reproduction:**
   ```bash
   npm start
   # اکشن که مشکل ایجاد کرد را دوباره انجام بده
   # دقیق error message را کپی کن
   ```

---

**موفق باشی! 🚀**
