"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPC_EVENTS = void 0;
var IPC_EVENTS;
(function (IPC_EVENTS) {
    IPC_EVENTS["GET_ORDERS"] = "getOrders";
    IPC_EVENTS["GET_ORDER"] = "getOrder";
    IPC_EVENTS["CREATE_ORDER"] = "createOrder";
    IPC_EVENTS["UPDATE_ORDER"] = "updateOrder";
    IPC_EVENTS["DELETE_ORDER"] = "deleteOrder";
    IPC_EVENTS["GET_SCULPTURES"] = "getSculptures";
    IPC_EVENTS["GET_SCULPTURE"] = "getSculpture";
    IPC_EVENTS["CREATE_SCULPTURE"] = "createSculpture";
    IPC_EVENTS["UPDATE_SCULPTURE"] = "updateSculpture";
    IPC_EVENTS["DELETE_SCULPTURE"] = "deleteSculpture";
})(IPC_EVENTS || (exports.IPC_EVENTS = IPC_EVENTS = {}));
