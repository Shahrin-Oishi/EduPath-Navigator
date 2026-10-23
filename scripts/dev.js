const fs = require('fs');
const path = require('path');
const net = require('net');
const { spawn } = require('child_process');
const root = path.resolve(__dirname, '..');
require(path.join(root, 'backend/node_modules/dotenv')).config({ path: path.join(root, 'backend/.env') });
const children = [];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = code;
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
function launch(executable, args, cwd) {
  const child = spawn(executable, args, { cwd, stdio: 'inherit', windowsHide: true });
  children.push(child);
  child.on('error', error => { console.error(error.message); stop(1); });
  child.on('exit', code => { if (!stopping) stop(code || 1); });
  return child;
}
function listening(port, host = '127.0.0.1') {
  return new Promise(resolve => {
    const socket = net.connect({ host, port });
    const finish = result => { socket.destroy(); resolve(result); };
    socket.once('connect', () => finish(true));
    socket.once('error', () => finish(false));
    socket.setTimeout(500, () => finish(false));
  });
}
async function main() {
  const uri = new URL(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edupath-navigator');
  if (['127.0.0.1', 'localhost'].includes(uri.hostname) && !await listening(Number(uri.port || 27017))) {
    const local = path.join(root, '.local');
    const folder = fs.existsSync(local) && fs.readdirSync(local).find(name => name.startsWith('mongodb-') && fs.existsSync(path.join(local, name, 'bin', 'mongod.exe')));
    const binary = folder && path.join(local, folder, 'bin', 'mongod.exe');
    if (!binary || !fs.existsSync(binary)) throw new Error('Local MongoDB is missing. Install MongoDB or configure MONGO_URI in backend/.env.');
    const data = path.join(local, 'data');
    fs.mkdirSync(data, { recursive: true });
    launch(binary, ['--dbpath', data, '--bind_ip', '127.0.0.1', '--port', uri.port || '27017', '--logpath', path.join(local, 'mongodb.log'), '--logappend'], root);
    for (let attempt = 0; !await listening(Number(uri.port || 27017)); attempt++) {
      if (stopping) return;
      if (attempt >= 60) throw new Error('Local MongoDB did not start. Check .local/mongodb.log.');
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('Local MongoDB is ready. Data is saved in .local/data.');
  }
  if (stopping) return;
  const apiPort = Number(process.env.PORT || 5000);
  if (await listening(apiPort) || await listening(apiPort, '::1')) {
    const response = await fetch(`http://localhost:${apiPort}/`, { signal: AbortSignal.timeout(3000) });
    const info = await response.json();
    if (info.message !== 'EduPath Navigator API is running!') throw new Error(`Port ${apiPort} is used by another application.`);
    console.log(`EduPath backend is already running on port ${apiPort}.`);
  } else {
    launch(process.execPath, ['server.js'], path.join(root, 'backend'));
  }
  if (await listening(5173) || await listening(5173, '::1')) {
    console.log('Frontend port 5173 is already in use. Open http://localhost:5173 if your frontend is running there.');
  } else {
    launch(process.execPath, ['node_modules/vite/bin/vite.js', '--strictPort'], path.join(root, 'frontend'));
  }
}
main().catch(error => { console.error(error.message); stop(1); });
