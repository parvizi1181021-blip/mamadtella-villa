# 🏠 دستیار هوشمند ویلای ممد تلا

> **سیستم کنترل هوشمند ویلا با هوش مصنوعی رایگان + دستورات صوتی**

![Version](https://img.shields.io/badge/Version-2.1.0-gold)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node.js-18%2B-green)
![AI](https://img.shields.io/badge/AI-Ollama-orange)

---

## ✨ ویژگی‌ها

### 🤖 هوش مصنوعی
- ✅ **Ollama محلی** - رایگان، بدون محدودیت، بدون فیلتر
- ✅ **مدل‌های فارسی** - Mistral, Llama2, Neural Chat
- ✅ **Streaming** - پاسخ‌های لحظه‌ای مثل ChatGPT
- ✅ **Private** - داده نشت نمی‌کند

### 🎤 دستورات صوتی
- ✅ **Whisper.cpp محلی** - تشخیص صدای فارسی
- ✅ **Wake Word** - بگو "ممد تلا" و دستور بده
- ✅ **Text-to-Speech** - پاسخ صوتی فارسی
- ✅ **Smart Commands** - درب، دوربین، روشنایی

### 🔐 امنیت
- ✅ **دو پنل** - مدیر + کاربران
- ✅ **Rate Limiting** - ضد brute-force
- ✅ **Sessions** - 12 ساعت TTL
- ✅ **Password Hashing** - scrypt

### 📹 دوربین‌ها
- ✅ **Dahua CGI** - Digest Auth
- ✅ **Snapshot** - عکس فوری
- ✅ **MJPEG Stream** - پخش زنده

### 📱 رابط کاربری
- ✅ **PWA** - نصب روی گوشی
- ✅ **Responsive** - تمام صفحات‌نمایش
- ✅ **فارسی RTL** - تمام‌ریز
- ✅ **Dark Theme** - طراحی حرفه‌ای

---

## 🚀 شروع سریع (۳ دقیقه)

### پیش‌نیازها
- **Windows 11**
- **Node.js 18+** ([دانلود](https://nodejs.org))
- **Ollama** ([دانلود](https://ollama.ai/download))

### نصب خودکار (Windows)
```bash
# ۱. Git Bash یا Command Prompt
git clone https://github.com/YOUR_USERNAME/mamadtella-villa.git
cd mamadtella-villa

# ۲. اسکریپت نصب
setup-windows.bat

# ۳. منتظر بمان (۲-۳ دقیقه)
```

### نصب دستی
```bash
# ۱. Dependencies
npm install

# ۲. Ollama (باید قبلاً نصب باشد)
ollama serve
# در پنجره دوم:
ollama pull mistral
ollama pull neural-chat

# ۳. اجرای سرور
npm start
```

### دسترسی
- **کاربران**: http://localhost:118
- **مدیریت**: http://localhost:118/admin
- **Ollama API**: http://localhost:11434

### پسورد پیش‌فرض
```
Username: admin
Password: AdminTella@1404
```
⚠️ **لطفاً فوراً تغییر دهید!**

---

## 📋 تنظیمات

### `config.json` - تنظیمات سرور
```json
{
  "server": {
    "port": 118
  },
  "gate": {
    "name": "درب حیاط",
    "host": "10.10.10.99",
    "port": 2000,
    "payloadHex": "00 01 02 03 04 05 06 07 08 01 00 01 01 01 00 00 00 00 00 03 01 01 01",
    "timeoutMs": 5000
  },
  "whisper": {
    "enabled": true,
    "ffmpegPath": "ffmpeg",
    "whisperBinPath": "./whisper.cpp/main",
    "whisperModelPath": "./models/ggml-large-v3-turbo-q5_0.bin",
    "language": "fa"
  }
}
```

### `.env` - متغیرهای محیطی
```bash
# Ollama
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=mistral

# SMS (اختیاری)
SMS_ENABLED=false
SMS_USERNAME=
SMS_PASSWORD=
SMS_BODYID=

# Debug
DEBUG=false
LOG_LEVEL=info
```

---

## 🎯 استفاده

### 🔓 ورود کاربر
1. برو به http://localhost:118
2. یوزرنیم و پسورد را وارد کن
3. از ماژول‌های دسترسی‌دار استفاده کن

### 🔑 مدیریت
1. برو به http://localhost:118/admin
2. **ایجاد کاربر**: شماره + ماژول‌ها
3. **مدیریت دوربین**: IP + احراز هویت
4. **تنظیمات**: SMS، اطلاعات ویلا

### 🎤 دستور صوتی
1. دکمه 🎤 را فشار بده
2. بگو: "**ممد تلا** درب را باز کن"
3. سیستم اجرا می‌کند و پاسخ می‌دهد

### 💬 چت با AI
1. بخش "دستیار هوشمند" را باز کن
2. سوالت رو بنویس یا بگو
3. جواب فوری دریافت کن

---

## 🛠️ API Endpoints

### کاربران
```
POST   /api/login                    # ورود
POST   /api/logout                   # خروج
GET    /api/me                       # اطلاعات کاربر
POST   /api/gate/toggle              # کنترل درب
GET    /api/camera/{id}/snapshot     # عکس دوربین
GET    /api/camera/{id}/stream       # استریم دوربین
GET    /api/logs                     # لاگ کاربر
```

### AI
```
POST   /api/ai/chat                  # چت (streaming)
POST   /api/ai/voice-command         # دستور صوتی
POST   /api/ai/transcribe            # تشخیص صدا
GET    /api/ai/health                # وضعیت Ollama
GET    /api/ai/models                # لیست مدل‌ها
```

### مدیریت
```
POST   /api/admin/login              # ورود مدیر
GET    /api/admin/users              # لیست کاربران
POST   /api/admin/users              # ایجاد کاربر
PUT    /api/admin/users/{id}         # ویرایش کاربر
DELETE /api/admin/users/{id}         # حذف کاربر
POST   /api/admin/cameras            # اضافه دوربین
GET    /api/admin/logs               # تمام لاگ‌ها
```

---

## 📦 مدل‌های Ollama

### نصب
```bash
ollama pull mistral              # سریع (4GB)
ollama pull neural-chat          # مکالمه (4GB)
ollama pull llama2               # متوازن (3.5GB)
ollama pull orca-mini            # خفیف (1.9GB)
```

### استفاده
```bash
# در config.json یا environment
OLLAMA_MODEL=mistral
```

---

## 🔊 Whisper (تشخیص صدا)

### دانلود مدل
```bash
# اجرای اسکریپت نصب
./setup-windows.bat

# یا دستی:
mkdir models
cd whisper.cpp
make
cd ..

# دانلود مدل (۲GB)
curl -L https://huggingface.co/openai/whisper-large-v3-turbo/resolve/main/ggml-large-v3-turbo-q5_0.bin -o models/ggml-large-v3-turbo-q5_0.bin
```

---

## 📊 ساختار Database

```json
{
  "admin": {
    "username": "admin",
    "salt": "...",
    "hash": "..."
  },
  "users": [
    {
      "id": "u_...",
      "phone": "09...",
      "username": "guest123",
      "modules": ["gate", "camera"],
      "cameraAccess": ["cam_123"],
      "active": true,
      "expiresAt": null
    }
  ],
  "cameras": [
    {
      "id": "cam_...",
      "name": "درب ورودی",
      "host": "10.10.10.x",
      "username": "admin",
      "password": "****"
    }
  ],
  "logs": [...]
}
```

---

## 🐛 رفع‌مشکلات

### ❌ "Ollama پاسخ نداد"
```bash
# چک کن Ollama اجرا شده؟
ollama serve

# پورت ۱۱۴۳۴ باز است؟
netstat -an | find "11434"
```

### ❌ "نتیجه‌ای یافت نش��" (Whisper)
```bash
# مدل دانلود شده؟
ls models/ggml-*.bin

# ffmpeg نصب است؟
ffmpeg -version
```

### ❌ "دوربین متصل نشد"
```bash
# IP دوربین درست؟
ping 10.10.10.x

# یوزرنیم/پسورد درست؟
curl http://10.10.10.x/cgi-bin/snapshot.cgi?channel=1
```

---

## 🔄 آپدیت

```bash
# دریافت جدیدترین تغییرات
git pull origin main

# نصب dependencies جدید
npm install

# اجرا
npm start
```

---

## 📄 لایسنس

MIT - آزادانه استفاده و توزیع کنید

---

## 👨‍💻 توسعه‌دهندگان

- **Architecture**: Hybrid Ollama + Node.js
- **Language**: JavaScript (Node.js + Vanilla JS)
- **UI**: Responsive + RTL Persian
- **AI**: Ollama (Local LLM)
- **Voice**: Whisper.cpp (Local STT) + Google TTS

---

## 🤝 مشارکت

Issues و PR خوشرنگ! 🎉

---

## 📞 پشتیبانی

- 📧 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions
- 🔧 Documentation: `/docs`

---

**ساخته شده با ❤️ برای ویلای ممد تلا**

**Last Updated**: 2024
**Node Version**: 18+
**Windows Version**: 11 (tested)
