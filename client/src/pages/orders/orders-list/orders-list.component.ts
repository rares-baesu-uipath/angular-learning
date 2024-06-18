import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../model/model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  orders$: Observable<Order[]>;
  constructor(private httpService: OrderService) { }

  ngOnInit() {
    this.orders$ = this.httpService.getOrders() as Observable<Order[]>;
  }
}
