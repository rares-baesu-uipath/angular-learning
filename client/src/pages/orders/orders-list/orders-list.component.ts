import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../model/model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatListModule, MatButtonModule, MatIconModule, MatCard, MatToolbar, MatCardTitle],
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
