// cPanel Passenger entry point - loads Next.js standalone server
// MUST set thread-limiting env vars BEFORE any require() to reduce
// process/thread usage within CloudLinux LVE limits.
process.env.UV_THREADPOOL_SIZE = '1';
process.env.TOKIO_WORKER_THREADS = '1';
process.env.HOSTNAME = '0.0.0.0';
process.env.PORT = process.env.PORT || '3000';

// Load .env.production - OVERRIDE mode: .env.production always wins
// This prevents @next/env from loading .env S3 credentials bundled in standalone
const fs = require('fs');
const path = require('path');
const envFile = path.join(__dirname, '.env.production');
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.substring(0, eqIdx);
        let val = trimmed.substring(eqIdx + 1);
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        // Always set from .env.production (override mode)
        process.env[key] = val;
      }
    }
  }
}

// Start the standalone Next.js server
require('./.next/standalone/server.js');
