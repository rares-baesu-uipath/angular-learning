import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../../model/model';
import { OrderService } from '../../../services/order/order.service';
import { textFieldValidator } from '../../../utils';
import { CommonModule } from '@angular/common';
import { SculpturePickerComponent } from './sculpture-picker/sculpture-picker.component';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SculpturePickerComponent],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  orderId: string;
  orders$: Observable<Order>;
  orderForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: OrderService,
    private formBuilder: FormBuilder
  ) {
    this.fillForm();
  }

  ngOnInit() {
    this.orders$ = this.route.params.pipe(
      filter(params => !!params['id']),
      switchMap(params => {
        this.isLoading = true;
        return this.httpService.getOrder(params['id']);
      })
    ) as Observable<Order>;

    this.orders$.subscribe({
      next: (order) => {
        this.orderId = order.id;
        this.fillForm(order)
        this.isLoading = false;
      },
      error: (error) => console.error(error)
    })
  }

  fillForm(order?: Order) {
    this.orderForm = this.formBuilder.group({
      id: [order?.id || ''],
      buyerName: [order?.buyerName || '', textFieldValidator],
      buyerDeliveryAddress: [order?.buyerDeliveryAddress || '', textFieldValidator],
      configuredSculptures: [order?.configuredSculptures || '']
    });
  }

  onSubmit() {
    if (!this.orderForm.valid) {
      return;
    }

    const httpCall = this.orderId
      ? this.httpService.updateOrder(this.orderForm.value)
      : this.httpService.createOrder(this.orderForm.value);

    httpCall.subscribe(() => this.router.navigate(['/orders']));
  }
}
