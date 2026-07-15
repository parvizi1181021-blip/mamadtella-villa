# 📡 API Documentation - دستیار هوشمند ویلای ممد تلا

## Base URL
```
http://localhost:118
```

---

## 🔐 Authentication

### User Login
```http
POST /api/login
Content-Type: application/json

{
  "username": "guest123",
  "password": "YourPassword"
}
```

**Response:**
```json
{
  "ok": true
}
```

**Cookies:**
```
Set-Cookie: villa_session=...; HttpOnly; Path=/
```

---

## 🤖 AI & Chat

### Chat (Streaming)
```http
POST /api/ai/chat
Content-Type: application/json

{
  "message": "سلام! چطور می‌تونی کمکم کنی؟"
}
```

**Response (Server-Sent Events):**
```
می‌تونم کمک‌های زیادی بکنم. می‌خوای...
```

### Voice Transcribe
```http
POST /api/ai/transcribe
Content-Type: audio/webm

[Binary Audio Data]
```

**Response:**
```json
{
  "ok": true,
  "text": "سلام ممد تلا",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Voice Command
```http
POST /api/ai/voice-command
Content-Type: audio/webm

[Binary Audio Data]
```

**Response (if command executed):**
```json
{
  "ok": true,
  "type": "command",
  "command": "درب",
  "response": "درب باز میشود",
  "result": { "success": true }
}
```

**Response (if asking AI):**
```
[Streaming Response from AI]
```

### Health Check
```http
GET /api/ai/health
```

**Response:**
```json
{
  "ok": true,
  "status": "آماده",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### List Models
```http
GET /api/ai/models
```

**Response:**
```json
{
  "ok": true,
  "models": [
    {
      "name": "mistral:latest",
      "size": 4294967296,
      "modified": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 🚪 Gate Control

### Toggle Gate
```http
POST /api/gate/toggle
```

**Response:**
```json
{
  "ok": true,
  "message": "دستور با موفقیت ارسال شد",
  "replyHex": "01020304...",
  "time": "2024-01-15T10:30:00Z"
}
```

---

## 📹 Camera

### Get Snapshot
```http
GET /api/camera/{camera-id}/snapshot
```

**Response:** JPEG Image

### Get Stream
```http
GET /api/camera/{camera-id}/stream
```

**Response:** MJPEG Stream

---

## 👤 User Profile

### Get Current User
```http
GET /api/me
```

**Response:**
```json
{
  "ok": true,
  "username": "guest123",
  "label": "مهمان",
  "villaName": "ویلای ممد تلا",
  "modules": ["gate", "camera"],
  "cameras": [
    {
      "id": "cam_123",
      "name": "درب ورودی"
    }
  ]
}
```

### Logout
```http
POST /api/logout
```

**Response:**
```json
{
  "ok": true
}
```

---

## 📊 Logs

### Get User Logs
```http
GET /api/logs
```

**Response:**
```json
{
  "ok": true,
  "logs": [
    {
      "id": "abc123",
      "time": "2024-01-15T10:30:00Z",
      "actorType": "user",
      "actorLabel": "مهمان",
      "action": "gate_toggle",
      "detail": "پاسخ رله: 01020304"
    }
  ]
}
```

---

## 👨‍💼 Admin API

### Admin Login
```http
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "AdminTella@1404"
}
```

### Get All Users
```http
GET /api/admin/users
```

### Create User
```http
POST /api/admin/users
Content-Type: application/json

{
  "phone": "09121234567",
  "label": "مهمان",
  "modules": ["gate", "camera"],
  "cameraAccess": ["cam_123"],
  "expiresAt": "2024-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "ok": true,
  "user": { ... },
  "credentials": {
    "username": "guest123",
    "password": "AbCd1234"
  },
  "sms": {
    "ok": true,
    "message": "پیامک ارسال شد"
  }
}
```

### Update User
```http
PUT /api/admin/users/{user-id}
Content-Type: application/json

{
  "label": "مهمان جدید",
  "modules": ["gate"],
  "expiresAt": "2024-12-31T23:59:59Z"
}
```

### Delete User
```http
DELETE /api/admin/users/{user-id}
```

### Add Camera
```http
POST /api/admin/cameras
Content-Type: application/json

{
  "name": "درب ورودی",
  "host": "10.10.10.50",
  "port": 80,
  "channel": 1,
  "username": "admin",
  "password": "admin123",
  "streamType": "main"
}
```

### Get All Cameras
```http
GET /api/admin/cameras
```

### Update Camera
```http
PUT /api/admin/cameras/{camera-id}
```

### Delete Camera
```http
DELETE /api/admin/cameras/{camera-id}
```

### SMS Settings
```http
GET /api/admin/settings/sms

POST /api/admin/settings/sms
Content-Type: application/json

{
  "enabled": true,
  "username": "my_sms_account",
  "password": "password123",
  "bodyId": "123456"
}
```

### Villa Info (for AI)
```http
GET /api/admin/settings/villa-info

POST /api/admin/settings/villa-info
Content-Type: application/json

{
  "villaInfo": "رمز وای‌فای: MyWiFi2024\nساعت تسویه: ۱۲ ظهر"
}
```

### Admin Logs
```http
GET /api/admin/logs
```

### Change Admin Password
```http
POST /api/admin/change-password
Content-Type: application/json

{
  "currentPassword": "AdminTella@1404",
  "newPassword": "NewPassword123"
}
```

---

## Error Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests (Rate Limited) |
| 502 | Bad Gateway (Service Error) |
| 503 | Service Unavailable (Ollama Down) |
| 504 | Gateway Timeout (Connection Timeout) |

---

## Rate Limiting

- **Login**: 5 attempts per 10 minutes (15 minute block)
- **Gate Toggle**: 6 attempts per minute
- **Camera Snapshot**: 120 per minute
- **Camera Stream**: 10 per minute
- **Voice Transcribe**: 40 per minute
- **Chat**: 15 per minute

---

## Headers

### Required
```
Content-Type: application/json
```

### Optional
```
User-Agent: Mamadtella-Client/1.0
X-Request-ID: unique-id
```

---

## Examples

### cURL - Chat
```bash
curl -X POST http://localhost:118/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "سلام"}'
```

### JavaScript - Voice Command
```javascript
const audio = await recorder.recordAudio();
const response = await fetch('/api/ai/voice-command', {
  method: 'POST',
  body: audio,
  headers: { 'Content-Type': 'audio/webm' }
});
const data = await response.json();
```

### Python - Chat Stream
```python
import requests

response = requests.post(
  'http://localhost:118/api/ai/chat',
  json={'message': 'سلام'},
  stream=True
)

for chunk in response.iter_content(decode_unicode=True):
  print(chunk, end='', flush=True)
```
