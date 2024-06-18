import { Component, forwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, filter, switchMap } from 'rxjs';
import { Form, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../../model/model';
import { OrderService } from '../../../services/order/order.service';
import { textFieldValidator } from '../../../utils';
import { CommonModule } from '@angular/common';
import { SculpturePickerComponent } from './sculpture-picker/sculpture-picker.component';

const EMPTY_ORDER = {
  id: '',
  buyerName: '',
  buyerDeliveryAddress: '',
  configuredSculptures: []
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SculpturePickerComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrderFormComponent),
      multi: true,
    },
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  orderId: string;
  orders$: Observable<Order>;
  orderForm: FormGroup = this.formBuilder.group<Order>({ ...EMPTY_ORDER });;

  private routeSub: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private httpService: OrderService, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.orders$ = this.route.params.pipe(
      filter(params => !!params['id']),
      switchMap(params => this.httpService.getOrder(params['id']))
      // mai pun un switchMap pentru initForm ???
    ) as Observable<Order>;

    this.orders$.subscribe({
      next: (order) => {
        this.orderId = order.id;
        this.initForm(order)
      },
      error: (error) => console.error(error)
    })
  }

  initForm(order: Order) {
    this.orderForm = this.formBuilder.group({
      id: [order.id],
      buyerName: [order.buyerName, textFieldValidator],
      buyerDeliveryAddress: [order.buyerDeliveryAddress, textFieldValidator],
      configuredSculptures: [order.configuredSculptures]
    });
  }

  onSubmit() {
    if (!this.orderForm.valid) {
      return;
    }
    console.log(this.orderForm.value)
    // if (this.orderId) {
    //   this.httpService.updateOrder(this.orderForm.value).subscribe({
    //     next: () => this.router.navigate(['/orders'])
    //   });
    // } else {
    //   this.httpService.createOrder(this.orderForm.value).subscribe({
    //     next: () => this.router.navigate(['/orders'])
    //   });
    // }
  }

  // ngOnDestroy() {
  //   this.routeSub.unsubscribe();
  // }
}
