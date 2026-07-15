# 🚀 شروع سریع - Mamadtella Villa

## Step 1: تنظیم اولیه

### Windows 11
```bash
# 1. دانلود و نصب Node.js 18+
https://nodejs.org

# 2. دانلود و نصب Ollama
https://ollama.ai/download

# 3. دانلود و نصب Git
https://git-scm.com
```

## Step 2: Clone پروژه

```bash
# Git Bash یا Command Prompt بازکن و:
git clone https://github.com/YOUR_USERNAME/mamadtella-villa.git
cd mamadtella-villa
```

## Step 3: اجرای Setup

```bash
# اسکریپت خودکار:
setup-windows.bat

# یا دستی:
npm install
```

## Step 4: شروع سرویس‌ها

### پنجره 1 - Ollama:
```bash
ollama serve

# منتظر پیغام: "Listening on ..."
```

### پنجره 2 - Server:
```bash
npm start

# منتظر پیغام: "پنل کنترل هوشمند ویلای ممد تلا در حال اجراست ✅"
```

## Step 5: دسترسی

### کاربران عادی:
```
URL: http://localhost:118
Username: guest123 (از admin ایجاد می‌شود)
Password: خودکار تولید می‌شود
```

### مدیر:
```
URL: http://localhost:118/admin
Username: admin
Password: AdminTella@1404

⚠️ فوراً تغییر بدهید!
```

## Step 6: اولین تنظیمات

1. **وورود به مدیریت**:
   - http://localhost:118/admin
   - admin / AdminTella@1404

2. **تغییر پسورد مدیر**:
   - بخش "تغییر رمز مدیر"
   - پسورد جدید (6+ کاراکتر)

3. **اضافه کردن کاربر اول**:
   - بخش "افزودن کاربر جدید"
   - شماره موبایل
   - مژول‌ها (درب، دوربین، ...)
   - یوزرنیم و پسورد خودکار

4. **اضافه کردن دوربین** (اگر دارید):
   - بخش "دوربین‌ها"
   - IP دوربین Dahua
   - یوزرنیم/پسورد

## Step 7: استفاده

### 💬 چت با AI
1. وورود با کاربری
2. بخش "دستیار هوشمند"
3. سوالت رو بنویس
4. جواب فوری دریافت کن

### 🎤 دستور صوتی
1. دکمه 🎤 را فشار بده
2. بگو: "**ممد تلا** درب را باز کن"
3. سیستم اجرا می‌کند و پاسخ می‌دهد

## 🔧 مشکلات و حل

### Ollama پاسخ نداد
```bash
# اول اجرا کن:
ollama serve

# یا پورت تغییر بده:
set OLLAMA_HOST=http://localhost:11435
ollama serve
```

### "Port 118 already in use"
```bash
# config.json را ویرایش کن:
"port": 8080
```

### npm: command not found
```bash
# Node.js دوباره نصب کن:
https://nodejs.org
```

## 📖 دریافت راهنمای کامل

- [نصب تفصیلی](./INSTALLATION.md)
- [تنظیمات](./CONFIG.md)
- [عیب‌یابی](./TROUBLESHOOTING.md)

---

**تمام شد! حالا آماده استفاده هستی! 🎉**
