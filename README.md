# 🏠 دستیار هوشمند ویلای ممد تلا

> **سیستم کنترل هوشمند ویلا با هوش مصنوعی رایگان + دستورات صوتی**

![Version](https://img.shields.io/badge/Version-2.1.0-gold)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node.js-18%2B-green)
![AI](https://img.shields.io/badge/AI-Ollama-orange)
![Windows](https://img.shields.io/badge/Windows-11-0078D4)

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

## 🚀 شروع سریع (Windows 11)

### پیش‌نیازها
- **Windows 11**
- **Node.js 18+** ([دانلود](https://nodejs.org))
- **Ollama** ([دانلود](https://ollama.ai/download))
- **64GB RAM** ✓ شما دارید!
- **Ryzen 9 12-Core** ✓ شما دارید!

### نصب خودکار (۳ دقیقه)

```bash
# 1. Git Bash را باز کن
git clone https://github.com/YOUR_USERNAME/mamadtella-villa.git
cd mamadtella-villa

# 2. اسکریپت نصب را اجرا کن
setup-windows.bat

# 3. منتظر بمان (خودکار همه کاری انجام می‌دهد)
```

### شروع سرویس‌ها

**پنجره 1 - Ollama:**
```bash
ollama serve
```

**پنجره 2 - Server:**
```bash
npm start
```

### دسترسی
- 🔓 **کاربران**: http://localhost:118
- 🔑 **مدیریت**: http://localhost:118/admin
- 🤖 **Ollama API**: http://localhost:11434

### پسورد پیش‌فرض
```
Username: admin
Password: AdminTella@1404
```
⚠️ **لطفاً فوراً تغییر دهید!**

---

## 📖 راهنمای کامل

- 📋 [نصب و راه‌اندازی](./INSTALLATION.md)
- 🚀 [شروع سریع](./START.md)
- 🔧 [تنظیمات](./CONFIG.md)
- 🐛 [عیب‌یابی](./TROUBLESHOOTING.md)

---

## 🎯 دستورات صوتی

| دستور | نتیجه |
|-------|-------|
| "ممد تلا درب" | باز کردن درب |
| "ممد تلا درب را ببند" | بستن درب |
| "ممد تلا دوربین" | عکس فوری |
| "ممد تلا پخش زنده" | استریم دوربین |
| "ممد تلا روشن کن" | روشن کردن روشنایی |
| "ممد تلا خاموش کن" | خاموش کردن |

---

## 📦 سخت‌افزار مورد نیاز

| مورد | نیاز | شما ✓ |
|------|------|--------|
| RAM | 8GB+ | 64GB ✓ |
| CPU | 4 Core | 12 Core ✓ |
| GPU | اختیاری | GT430 ✓ |
| OS | Windows 10+ | Windows 11 ✓ |
| Storage | 50GB | ✓ |

🔥 **شما سخت‌افزار فوق‌العاده دارید!**

---

## 💬 چت و صدا

### 💬 چت عادی
1. وارد شو
2. بخش "دستیار هوشمند"
3. سوالت رو بنویس
4. جواب فوری دریافت کن

### 🎤 دستور صوتی
1. دکمه 🎤 را فشار بده
2. بگو: "**ممد تلا** درب را باز کن"
3. سیستم اجرا و پاسخ می‌دهد

---

## 🔧 API Endpoints

### AI و چت
```
POST   /api/ai/chat              # چت (streaming)
POST   /api/ai/voice-command     # دستور صوتی
POST   /api/ai/transcribe        # تشخیص صدا
GET    /api/ai/health            # وضعیت Ollama
```

### کاربران
```
POST   /api/login                # ورود
GET    /api/me                   # اطلاعات
POST   /api/gate/toggle          # کنترل درب
GET    /api/camera/{id}/snapshot # عکس
GET    /api/camera/{id}/stream   # استریم
```

### مدیریت
```
POST   /api/admin/login          # ورود مدیر
GET    /api/admin/users          # لیست کاربران
POST   /api/admin/users          # اضافه کاربر
POST   /api/admin/cameras        # اضافه دوربین
```

---

## 🐛 رفع مشکلات

### Ollama پاسخ نداد
```bash
# اول اجرا کن
ollama serve

# یا پورت تغییر بده
set OLLAMA_HOST=http://localhost:11435
```

### Port استفاده شده است
```bash
netstat -ano | findstr :118
# یا پورت تغییر بده در config.json
```

### npm: command not found
```bash
# Node.js دوباره نصب کن
https://nodejs.org
```

---

## 📚 مدل‌های Ollama

| مدل | اندازه | سرعت | کیفیت |
|-----|--------|------|-------|
| Mistral | 4GB | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| Neural-Chat | 4GB | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| Llama2 | 3.5GB | ⚡⚡ | ⭐⭐⭐⭐⭐ |
| Orca-Mini | 1.9GB | ⚡⚡⚡⚡ | ⭐⭐⭐ |

```bash
ollama pull mistral              # توصیه شده
ollama pull neural-chat          # برای مکالمه
ollama pull llama2               # بهترین کیفیت
ollama pull orca-mini            # برای سیستم‌های ضعیف
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

## 🤝 مشارکت

Issues و PR خوشرنگ! 🎉

---

## 💡 نکات مهم

✅ **Ollama** را **قبل** سرور شروع کن
✅ **اولین رفع پسورد** الزامی است
✅ **دوربین‌ها** نیاز به IP صحیح دارند
✅ **Whisper** اختیاری است (بدون آن فقط متن کار می‌کند)
✅ **Rate Limiting** برای امنیت فعال است

---

## 📞 پشتیبانی

- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/mamadtella-villa/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/YOUR_USERNAME/mamadtella-villa/discussions)
- 📖 Wiki: [Documentation](https://github.com/YOUR_USERNAME/mamadtella-villa/wiki)

---

**ساخته شده با ❤️ برای ویلای ممد تلا**

**نسخه**: 2.1.0  
**Node**: 18+  
**Windows**: 11  
**CPU**: Ryzen 9 3900 XT ✓  
**RAM**: 64GB ✓