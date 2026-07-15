const OllamaClient = require('../../lib/ollama');
const { processVoiceCommand } = require('../ai/voiceCommander');
const { transcribeAudio } = require('../../lib/whisper-farsi');

const ollama = new OllamaClient();

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function readBinaryBody(req, maxBytes = 8 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on('data', chunk => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error('فایل صوتی خیلی بزرگه'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

module.exports = async function(req, res, pathname, context) {
  
  // چت عادی (Streaming)
  if (pathname === '/api/ai/chat' && req.method === 'POST') {
    const body = await readJson(req);
    const message = body.message || '';

    if (!message.trim()) {
      return sendJson(res, 400, { ok: false, error: 'پیام خالی است' });
    }

    if (!ollama.healthy) {
      return sendJson(res, 503, {
        ok: false,
        error: 'هوش مصنوعی موقتاً دسترس‌پذیر نیست. لطفاً دقایقی بعد دوباره تلاش کنید.'
      });
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    });

    try {
      for await (const chunk of ollama.generateStream(message, 'mistral', { context })) {
        res.write(chunk);
      }
      res.write('\n');
    } catch (error) {
      console.error('❌ خطا:', error);
      res.write(`\n[خطا: ${error.message}]\n`);
    }

    res.end();
  }

  // تشخیص صدا ساده
  if (pathname === '/api/ai/transcribe' && req.method === 'POST') {
    try {
      const audioBuffer = await readBinaryBody(req);
      const text = await transcribeAudio(audioBuffer, 'fa');

      return sendJson(res, 200, {
        ok: true,
        text,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      return sendJson(res, 400, { ok: false, error: error.message });
    }
  }

  // دستور صوتی هوشمند
  if (pathname === '/api/ai/voice-command' && req.method === 'POST') {
    try {
      const audioBuffer = await readBinaryBody(req);
      const text = await transcribeAudio(audioBuffer, 'fa');
      console.log('🎤 شنیده شد:', text);

      const result = await processVoiceCommand(text, context);

      if (result.executed) {
        return sendJson(res, 200, {
          ok: true,
          type: 'command',
          command: result.command,
          response: result.response,
          result: result.result
        });
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });

        res.write(`[شنیدم: "${text}"]\n\n`);

        try {
          for await (const chunk of ollama.generateStream(text, 'mistral', { context })) {
            res.write(chunk);
          }
        } catch (error) {
          res.write(`\n[خطا: ${error.message}]\n`);
        }

        res.end();
      }
    } catch (error) {
      return sendJson(res, 400, { ok: false, error: error.message });
    }
  }

  // لیست مدل‌ها
  if (pathname === '/api/ai/models' && req.method === 'GET') {
    try {
      const models = await ollama.listModels();
      return sendJson(res, 200, {
        ok: true,
        models: models.map(m => ({
          name: m.name,
          size: m.size,
          modified: m.modified_at
        }))
      });
    } catch (error) {
      return sendJson(res, 400, { ok: false, error: error.message });
    }
  }

  // سلامت سیستم
  if (pathname === '/api/ai/health' && req.method === 'GET') {
    return sendJson(res, 200, {
      ok: ollama.healthy,
      status: ollama.healthy ? 'آماده' : 'غیرفعال',
      timestamp: new Date().toISOString()
    });
  }

  return sendJson(res, 404, { ok: false, error: 'مسیر یافت نشد' });
};
