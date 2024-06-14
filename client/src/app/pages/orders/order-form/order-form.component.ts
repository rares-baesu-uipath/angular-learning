import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  orderId: string;

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.orderId = params['id']
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
