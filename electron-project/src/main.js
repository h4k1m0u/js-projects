const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  // open window & load html in it
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });
  window.loadFile('./src/index.html');
});
