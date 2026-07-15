const WAKE_WORDS = ['ممد تلا', 'ممد طلا', 'هوشمند', 'دستیار'];

const COMMANDS = {
  'درب': { module: 'gate', action: 'toggle', responses: ['درب باز میشود', 'باشه، درب را باز میکنم'] },
  'درب را ببند': { module: 'gate', action: 'close', responses: ['درب بسته میشود'] },
  'درب را باز کن': { module: 'gate', action: 'open', responses: ['درب را باز میکنم'] },
  'دوربین': { module: 'camera', action: 'snapshot', responses: ['تصویر فعلی را نشان میدهم'] },
  'پخش زنده': { module: 'camera', action: 'stream', responses: ['پخش زنده را شروع میکنم'] },
  'روشن کن': { module: 'lights', action: 'on', responses: ['روشن کردم'] },
  'خاموش کن': { module: 'lights', action: 'off', responses: ['خاموش کردم'] },
  'سلام': { module: 'greeting', action: 'hello', responses: ['سلام! چطور می‌تونم کمکت کنم؟'] },
};

function similarity(a, b) {
  const matrix = [];
  
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const distance = matrix[b.length][a.length];
  return 1 - distance / Math.max(a.length, b.length);
}

function detectWakeWord(text) {
  let best = null;
  let bestScore = 0;

  const normalized = text.toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .trim();

  for (const word of WAKE_WORDS) {
    const score = similarity(normalized, word.toLowerCase());
    if (score > bestScore && score > 0.7) {
      best = word;
      bestScore = score;
    }
  }

  return { word: best, score: bestScore };
}

function extractCommand(text) {
  const normalized = text.toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .trim();

  for (const [keyword, command] of Object.entries(COMMANDS)) {
    if (normalized.includes(keyword.toLowerCase())) {
      return { keyword, ...command };
    }
  }

  return null;
}

async function executeCommand(command, context) {
  if (!context.modules || !context.modules.includes(command.module)) {
    return { error: 'شما به این ماژول دسترسی ندارید' };
  }

  switch (command.module) {
    case 'gate':
      return require('../../lib/gate').sendGateCommand();
    case 'camera':
      return { success: true, action: command.action };
    case 'lights':
      return { success: true, action: command.action };
    case 'greeting':
      return { success: true };
    default:
      return { error: 'ماژول نامشناخته است' };
  }
}

async function processVoiceCommand(text, context) {
  const wake = detectWakeWord(text);
  
  if (!wake.word) {
    return { executed: false, reason: 'wake_word_not_found' };
  }

  const command = extractCommand(text);

  if (!command) {
    return {
      executed: false,
      reason: 'ask_ai',
      heard: text,
      confidence: wake.score
    };
  }

  try {
    const result = await executeCommand(command, context);

    if (result.error) {
      return {
        executed: false,
        reason: 'command_error',
        error: result.error
      };
    }

    return {
      executed: true,
      command: command.keyword,
      response: command.responses[Math.floor(Math.random() * command.responses.length)],
      result
    };
  } catch (error) {
    return {
      executed: false,
      reason: 'execution_error',
      error: error.message
    };
  }
}

module.exports = { processVoiceCommand, COMMANDS, detectWakeWord };
