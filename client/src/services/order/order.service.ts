import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private BASE_URL = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.BASE_URL);
  }

  getOrder(id: string) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  createOrder(order: Order) {
    return this.http.post(`${this.BASE_URL}`, {
      ...order
    })
  }

  updateOrder(order: Order) {
    return this.http.put(`${this.BASE_URL}/${order.id}`, {
      ...order
    })
  }
}
