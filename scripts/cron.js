import 'dotenv/config';
import cron from 'node-cron';
import { execFile } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const syncScript = join(__dirname, 'sync-tokko.js');

function runSync() {
  console.log(`[${new Date().toISOString()}] Running sync…`);
  execFile(process.execPath, [syncScript], (err, stdout, stderr) => {
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    if (err)    console.error('Sync error:', err.message);
  });
}

// Run once immediately on start so the cache is fresh after a restart
runSync();

// Then every day at 3:00 AM server time
cron.schedule('0 3 * * *', runSync);

console.log('Tokko sync cron running. Next scheduled run: daily at 03:00.');
