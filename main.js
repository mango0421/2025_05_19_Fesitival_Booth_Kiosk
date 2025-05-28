const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 1920,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // ✅ 이 줄 추가
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.loadFile('start_2.0.html');

  // ✅ 영수증 인쇄 이벤트 처리 (선택적)
ipcMain.on('print-receipt', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.print({
      silent: true,       // ✅ 사용자 설정창 없이
      printBackground: true, // 배경도 포함 (옵션)
      deviceName: ''      // 프린터 이름 (생략 시 기본 프린터 사용)
    });
  }
});


  // ✅ 앱 종료 이벤트 처리
  ipcMain.on('exit-app', () => {
    app.quit();
  });
}

app.whenReady().then(createWindow);
