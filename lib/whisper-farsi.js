const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function normalizeText(text) {
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .trim();
}

function runCommand(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args);
    let output = '';
    
    proc.stdout.on('data', d => output += d);
    proc.stderr.on('data', d => output += d);
    
    proc.on('close', code => {
      code === 0 ? resolve(output) : reject(new Error(`${cmd} failed: ${output}`));
    });
  });
}

async function transcribeAudio(audioBuffer, language = 'fa') {
  const tmpDir = require('os').tmpdir();
  const id = require('crypto').randomBytes(8).toString('hex');
  
  const inputPath = path.join(tmpDir, `audio-${id}.webm`);
  const outputPath = path.join(tmpDir, `audio-${id}`);
  
  try {
    fs.writeFileSync(inputPath, audioBuffer);

    // تبدیل webm به wav
    await runCommand('ffmpeg', [
      '-y',
      '-i', inputPath,
      '-ar', '16000',
      '-ac', '1',
      '-acodec', 'pcm_s16le',
      outputPath + '.wav'
    ]);

    // اجر��ی Whisper
    const result = await runCommand('./whisper.cpp/main', [
      '-m', './models/ggml-large-v3-turbo-q5_0.bin',
      '-l', language,
      '-f', outputPath + '.wav',
      '-otxt',
      '-nt',
      '-t', '4'
    ]);

    // خواندن نتیجه
    const text = fs.readFileSync(outputPath + '.txt', 'utf8').trim();
    
    return normalizeText(text);
  } finally {
    [inputPath, outputPath + '.wav', outputPath + '.txt'].forEach(f => {
      try { fs.unlinkSync(f); } catch (e) {}
    });
  }
}

module.exports = { transcribeAudio };
