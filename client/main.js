"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
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
ipc.on(ipc_1.IPC_EVENTS.CREATE_ORDER, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) {
        var newData = __assign(__assign({}, info), { id: (0, uuid_1.v4)() });
        data.orders.push(newData);
        writeData(data).then(function () { return event.reply(ipc_1.IPC_EVENTS.CREATE_ORDER, { status: 'ok' }); });
    })
        .catch(function () { return event.reply(ipc_1.IPC_EVENTS.CREATE_ORDER, 'ERROR'); });
});
ipc.on(ipc_1.IPC_EVENTS.DELETE_ORDER, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) {
        var newData = __spreadArray([], data.orders, true);
        //data.orders.push(newData);
        var index = newData.findIndex(function (d) { return d.id === info.id; });
        if (index > -1) {
            newData.splice(index, 1);
            data.orders = newData;
            writeData(data).then(function () { return event.reply(ipc_1.IPC_EVENTS.DELETE_ORDER, { status: 'ok' }); });
        }
    });
});
ipc.on(ipc_1.IPC_EVENTS.GET_SCULPTURES, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) { return event.reply(ipc_1.IPC_EVENTS.GET_SCULPTURES, data.sculptures); })
        .catch(function (error) { return event.reply(ipc_1.IPC_EVENTS.GET_SCULPTURES, error); });
});
ipc.on(ipc_1.IPC_EVENTS.GET_SCULPTURE, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) { return event.reply(ipc_1.IPC_EVENTS.GET_SCULPTURE, data.sculptures.find(function (s) { return s.id === info.id; })); })
        .catch(function (error) { return event.reply(ipc_1.IPC_EVENTS.GET_SCULPTURE, error); });
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
ipc.on(ipc_1.IPC_EVENTS.CREATE_SCULPTURE, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) {
        var newData = __assign(__assign({}, info), { id: (0, uuid_1.v4)() });
        data.sculptures.push(newData);
        writeData(data).then(function () { return event.reply(ipc_1.IPC_EVENTS.CREATE_SCULPTURE, { status: 'ok' }); });
    })
        .catch(function (error) { return event.reply(ipc_1.IPC_EVENTS.CREATE_SCULPTURE, error); });
});
ipc.on(ipc_1.IPC_EVENTS.DELETE_SCULPTURE, function (event, info) {
    readData()
        .then(function (data) { return JSON.parse(data.toString()); })
        .then(function (data) {
        var newData = __spreadArray([], data.sculptures, true);
        //data.orders.push(newData);
        var index = newData.findIndex(function (d) { return d.id === info.id; });
        if (index > -1) {
            newData.splice(index, 1);
            console.log(newData);
            console.log(index);
            console.log('====================================');
            data.sculptures = __spreadArray([], newData, true);
            writeData(data).then(function () { return event.reply(ipc_1.IPC_EVENTS.DELETE_SCULPTURE, { status: 'ok' }); });
        }
    }).catch(function (error) { return event.reply(ipc_1.IPC_EVENTS.DELETE_SCULPTURE, error); });
});
function createWindow() {
    var win = new BrowserWindow({
        width: 1200,
        height: 800,
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
