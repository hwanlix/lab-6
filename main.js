const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

let mainWindow;
let serverProcess;

function startExpress() {
  serverProcess = spawn('npm', ['start'], { shell: true, cwd: __dirname });
  serverProcess.stdout.on('data', data => console.log(`[express] ${data}`));
  serverProcess.stderr.on('data', data => console.error(`[express:error] ${data}`));
}

function waitForServer(retries = 0) {
  http.get('http://localhost:3000', res => {
    createWindow();
  }).on('error', () => {
    if (retries < 20) {
      setTimeout(() => waitForServer(retries + 1), 500);
    } else {
      console.error('Express server failed to start. Exiting.');
      app.quit();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL('http://localhost:3000');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  startExpress();
  waitForServer();
});

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
