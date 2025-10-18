const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
    // Fenêtre principale
    mainWindow = new BrowserWindow({
        width: 900,
        height: 900,
        frame: true, // Important pour la barre personnalisée
        show: true,
        icon: path.join(__dirname, 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('index.html');
    mainWindow.on('show', () => {
        mainWindow.setIcon(path.join(__dirname, 'icon.ico'));
    });
}

// Gestion du cycle de vie
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});