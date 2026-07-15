const http = require('http');
const { EventEmitter } = require('events');

class OllamaClient extends EventEmitter {
  constructor(baseURL = 'http://localhost:11434') {
    super();
    this.baseURL = baseURL;
    this.healthy = false;
    this.checkHealth();
  }

  async checkHealth() {
    try {
      const result = await this._request('GET', '/api/tags');
      this.healthy = !!result.models;
      console.log('✅ Ollama دسترس‌پذیر است');
      return true;
    } catch (error) {
      this.healthy = false;
      console.warn('⚠️ Ollama دسترس‌پذیر نیست:', error.message);
      return false;
    }
  }

  async generate(prompt, model = 'mistral', options = {}) {
    const response = await this._request('POST', '/api/generate', {
      model,
      prompt,
      stream: false,
      system: this._getSystemPrompt(options.context),
      ...options
    });
    return response.response;
  }

  async *generateStream(prompt, model = 'mistral', options = {}) {
    try {
      const response = await this._requestStream('POST', '/api/generate', {
        model,
        prompt,
        stream: true,
        system: this._getSystemPrompt(options.context),
        temperature: 0.7,
        top_p: 0.9,
        ...options
      });

      for await (const line of response) {
        try {
          const json = JSON.parse(line);
          if (json.response) {
            yield json.response;
          }
        } catch (e) {
          // بعضی خطوط شاید JSON نباشند
        }
      }
    } catch (error) {
      console.error('خطا در streaming:', error);
      throw error;
    }
  }

  async listModels() {
    const result = await this._request('GET', '/api/tags');
    return result.models || [];
  }

  async pullModel(model) {
    return this._request('POST', '/api/pull', { name: model });
  }

  async deleteModel(model) {
    return this._request('DELETE', '/api/delete', { name: model });
  }

  _getSystemPrompt(context = {}) {
    return `تو دستیار هوشمند ویلای ممد تلا هستی.
خصوصیات:
- فارسی صحیح و طبیعی صحبت کن
- پاسخ‌ها کوتاه، واضح و مفید باشند
- اگه سوال خارج از موضوع بود، به گرمی پاسخ بده
- در صورت نیاز، دستور پیشنهاد کن

${context.villaInfo ? `📍 اطلاعات ویلا:\n${context.villaInfo}` : ''}
${context.label ? `👤 کاربر: ${context.label}` : ''}
${context.modules ? `🔐 دسترسی: ${context.modules.join(', ')}` : ''}

فوری و کمک‌رسان باش!`;
  }

  _request(method, path, body = null) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, this.baseURL);
      
      const options = {
        hostname: url.hostname,
        port: url.port || 11434,
        path: url.pathname + url.search,
        method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mamadtella-Villa/2.1'
        },
        timeout: 30000
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            if (res.headers['content-type']?.includes('application/json')) {
              resolve(JSON.parse(data));
            } else {
              resolve(data);
            }
          } catch (e) {
            reject(new Error(`خطای parsing: ${e.message}`));
          }
        });
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout: Ollama پاسخ نداد'));
      });

      if (body) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }

  async *_requestStream(method, path, body = null) {
    const url = new URL(path, this.baseURL);

    const options = {
      hostname: url.hostname,
      port: url.port || 11434,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mamadtella-Villa/2.1'
      }
    };

    yield* new Promise((resolve, reject) => {
      const req = http.request(options, async function*(res) {
        let buffer = '';

        async function* readLines() {
          for await (const chunk of res) {
            buffer += chunk.toString();
            const lines = buffer.split('\n');
            buffer = lines.pop();

            for (const line of lines) {
              if (line.trim()) yield line;
            }
          }

          if (buffer.trim()) yield buffer;
        }

        for await (const line of readLines()) {
          yield line;
        }
      }(res));

      req.on('error', reject);

      if (body) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }
}

module.exports = OllamaClient;
