import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../model/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  orders: Order[];
  constructor(private httpService: OrderService) { }

  ngOnInit() {
    this.httpService.getOrders().subscribe(
      {
        next: (response) => this.orders = response as Order[],
        error: (err) => console.log(err)
      });
  }
}
