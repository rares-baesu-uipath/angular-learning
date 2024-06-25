"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ipc_1 = require("./ipc");
var fs = require('fs');
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow;
var path = require('path');
var electron = require('electron');
var ipc = electron.ipcMain;
var readData = function () {
    return fs.promises.readFile(path.join(__dirname, "data.json"));
};
var writeData = function (data) {
    return fs.promises.writeFile(path.join(__dirname, "data.json"), JSON.stringify(data));
};
// Listen for data from the Renderer process
ipc.on(ipc_1.IPC_EVENTS.GET_ORDERS, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) { return event.reply(ipc_1.IPC_EVENTS.GET_ORDERS, data.orders); })
        .catch(function () { return event.reply(ipc_1.IPC_EVENTS.GET_ORDERS, 'ERROR'); });
});
ipc.on(ipc_1.IPC_EVENTS.GET_ORDER, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) { return event.reply(ipc_1.IPC_EVENTS.GET_ORDER, data.orders.find(function (s) { return s.id === info.id; })); })
        .catch(function () { return event.reply(ipc_1.IPC_EVENTS.GET_ORDER, 'ERROR'); });
});
ipc.on(ipc_1.IPC_EVENTS.UPDATE_ORDER, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) {
        var idx = data.orders.findIndex(function (s) { return s.id === info.id; });
        data.orders[idx] = info;
        writeData(data).then(function () { return event.reply(ipc_1.IPC_EVENTS.UPDATE_ORDER, { status: 'ok' }); });
    })
        .catch(function () { return event.reply(ipc_1.IPC_EVENTS.UPDATE_ORDER, 'ERROR'); });
});
ipc.on(ipc_1.IPC_EVENTS.GET_SCULPTURES, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) { return event.reply(ipc_1.IPC_EVENTS.GET_SCULPTURES, data.sculptures); })
        .catch(function () { return event.reply(ipc_1.IPC_EVENTS.GET_SCULPTURES, 'ERROR'); });
});
ipc.on(ipc_1.IPC_EVENTS.GET_SCULPTURE, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) { return event.reply(ipc_1.IPC_EVENTS.GET_SCULPTURE, data.sculptures.find(function (s) { return s.id === info.id; })); })
        .catch(function () { return event.reply(ipc_1.IPC_EVENTS.GET_SCULPTURE, 'ERROR'); });
});
ipc.on(ipc_1.IPC_EVENTS.UPDATE_SCULPTURE, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) {
        var idx = data.sculptures.findIndex(function (s) { return s.id === info.id; });
        data.sculptures[idx] = info;
        writeData(data).then(function () { return event.reply(ipc_1.IPC_EVENTS.UPDATE_SCULPTURE, { status: 'ok' }); });
    })
        .catch(function () { return event.reply(ipc_1.IPC_EVENTS.UPDATE_SCULPTURE, 'ERROR'); });
});
function createWindow() {
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, //also add this line
            //@ts-ignore
            enableRemoteModule: true, //and this one
            preload: path.join(__dirname, 'preload.js'), // Path to your 'preload.js' file.
        }
    });
    win.removeMenu();
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
