import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Order } from '../../model/order';
import { requestIPCData$ } from '../../model/common';
import { IPC_EVENTS } from '../../../ipc';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private ngZone: NgZone) { }

  getOrders$() {
    return requestIPCData$<Order[]>(IPC_EVENTS.GET_ORDERS, {}, this.ngZone);
  }

  getOrder$(id: string) {
    return requestIPCData$<Order>(IPC_EVENTS.GET_ORDER, {id}, this.ngZone);
  }

  createOrder$(order: Order) {
    return requestIPCData$(IPC_EVENTS.CREATE_ORDER, order, this.ngZone);
  }

  updateOrder$(order: Order) {
    return requestIPCData$(IPC_EVENTS.UPDATE_ORDER, order, this.ngZone);
  }
}
