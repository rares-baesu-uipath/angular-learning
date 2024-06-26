import { v4 } from "uuid";
import { IPC_EVENTS } from "./ipc";
import { Order } from "./src/model/order";
import { Sculpture } from "./src/model/sculpture";
const fs = require('fs')

const { app, BrowserWindow } = require('electron')
const path = require('path');
const electron = require('electron');

const ipc = electron.ipcMain;

type OrderObject = {
    orders: Order[],
    sculptures: Sculpture[]
}

const readData = () => {
    return fs.promises.readFile(
        path.join(__dirname, "data.json"),
    )
}

const writeData = (data: Object) => {
    return fs.promises.writeFile(
        path.join(__dirname, "data.json"),
        JSON.stringify(data),
    )
}

// Listen for data from the Renderer process
ipc.on(IPC_EVENTS.GET_ORDERS, (event, info) => {
    readData()
    .then((data: Buffer) => JSON.parse(data.toString()))
    .then((data: OrderObject) => event.reply(IPC_EVENTS.GET_ORDERS, data.orders))
    .catch(() => event.reply(IPC_EVENTS.GET_ORDERS, 'ERROR'));
});

ipc.on(IPC_EVENTS.GET_ORDER, (event, info) => {
    readData()
    .then((data: Buffer) => JSON.parse(data.toString()))
    .then((data: OrderObject) => event.reply(IPC_EVENTS.GET_ORDER, data.orders.find((s: any) => s.id === info.id)))
    .catch(() => event.reply(IPC_EVENTS.GET_ORDER, 'ERROR'));
});

ipc.on(IPC_EVENTS.UPDATE_ORDER, (event, info) => {
    readData()
    .then((data: Buffer) => JSON.parse(data.toString()))
    .then((data: OrderObject) => {
      const idx = data.orders.findIndex((s: any) => s.id === info.id);
      data.orders[idx] = info;
      writeData(data).then(() => event.reply(IPC_EVENTS.UPDATE_ORDER, {status: 'ok'}));
    })
    .catch(() => event.reply(IPC_EVENTS.UPDATE_ORDER, 'ERROR'));
})

ipc.on(IPC_EVENTS.CREATE_ORDER, (event, info) => {
    readData()
    .then((data: Buffer) => JSON.parse(data.toString()))
    .then((data: OrderObject) => {
      const newData = {...info, id: v4() }
      data.orders.push(newData);
      writeData(data).then(() => event.reply(IPC_EVENTS.CREATE_ORDER, {status: 'ok'}));
    })
    .catch(() => event.reply(IPC_EVENTS.CREATE_ORDER, 'ERROR'));
})

ipc.on(IPC_EVENTS.DELETE_ORDER, (event, info) => {
    readData()
    .then((data: Buffer) => JSON.parse(data.toString()))
    .then((data: OrderObject) => {
      const newData = [...data.orders]
      //data.orders.push(newData);
      const index = newData.findIndex(d => d.id === info.id)
      if (index > -1) {
        newData.splice(index, 1);
        data.orders = newData
        writeData(data).then(() => event.reply(IPC_EVENTS.DELETE_ORDER, {status: 'ok'}));
      }
      
    })
})



ipc.on(IPC_EVENTS.GET_SCULPTURES, (event, info) => {
    readData()
    .then((data: Buffer) => JSON.parse(data.toString()))
    .then((data: OrderObject) => event.reply(IPC_EVENTS.GET_SCULPTURES, data.sculptures))
    .catch((error: any) => event.reply(IPC_EVENTS.GET_SCULPTURES, error));
});

ipc.on(IPC_EVENTS.GET_SCULPTURE, (event, info) => {
    readData()
    .then((data: Buffer) => JSON.parse(data.toString()))
    .then((data: OrderObject) => event.reply(IPC_EVENTS.GET_SCULPTURE, data.sculptures.find((s: any) => s.id === info.id)))
    .catch((error: any) => event.reply(IPC_EVENTS.GET_SCULPTURE, error));
});

ipc.on(IPC_EVENTS.UPDATE_SCULPTURE, (event, info) => {
    readData()
    .then((data: Buffer) => JSON.parse(data.toString()))
    .then((data: OrderObject) => {
      const idx = data.sculptures.findIndex((s: any) => s.id === info.id);
      data.sculptures[idx] = info;
      writeData(data).then(() => event.reply(IPC_EVENTS.UPDATE_SCULPTURE, {status: 'ok'}));
    })
    .catch(() => event.reply(IPC_EVENTS.UPDATE_SCULPTURE, 'ERROR'));
})

ipc.on(IPC_EVENTS.CREATE_SCULPTURE, (event, info) => {
    readData()
    .then((data: Buffer) => JSON.parse(data.toString()))
    .then((data: OrderObject) => {
      const newData = {...info, id: v4() }
      data.sculptures.push(newData);
      writeData(data).then(() => event.reply(IPC_EVENTS.CREATE_SCULPTURE, {status: 'ok'}));
    })
    .catch((error: any) => event.reply(IPC_EVENTS.CREATE_SCULPTURE, error));
})

ipc.on(IPC_EVENTS.DELETE_SCULPTURE, (event, info) => {
    readData()
    .then((data: Buffer) => JSON.parse(data.toString()))
    .then((data: OrderObject) => {
      const newData = [...data.sculptures]
      //data.orders.push(newData);
      const index = newData.findIndex(d => d.id === info.id)
      if (index > -1) {
        newData.splice(index, 1);
        console.log(newData)
        console.log(index)
        console.log('====================================')
        data.sculptures = [...newData]
        writeData(data).then(() => event.reply(IPC_EVENTS.DELETE_SCULPTURE, {status: 'ok'}));
      }
      
    }).catch((error: any) => event.reply(IPC_EVENTS.DELETE_SCULPTURE, error));
})

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, //also add this line
            //@ts-ignore
            enableRemoteModule: true, //and this one
            preload: path.join(__dirname, 'preload.js'), // Path to your 'preload.js' file.
        }
    })
    win.removeMenu();
    win.loadURL('http://localhost:4200')
    win.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})