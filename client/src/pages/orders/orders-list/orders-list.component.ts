import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../model/order';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { State } from '../../../model/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatListModule, MatButtonModule, MatIconModule, MatCard, MatToolbar, MatCardTitle, MatProgressSpinner],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent {
  state$ = new BehaviorSubject<State<Order[]>>({ type: 'loading' });

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders$().subscribe({
      next: data => this.state$.next(data),
      error: err => this.state$.error(err)
    });
  }
}
