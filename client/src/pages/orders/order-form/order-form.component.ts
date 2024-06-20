import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order } from '../../../model/model';
import { OrderService } from '../../../services/order/order.service';
import { CommonModule } from '@angular/common';
import { SculpturePickerComponent } from './sculpture-picker/sculpture-picker.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SculpturePickerComponent,     MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule, MatCard, MatFormFieldModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  orderId: string;
  orders$: Observable<Order>;
  orderForm: FormGroup;
  isLoading: boolean = false;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: OrderService,
    private formBuilder: FormBuilder
  ) {
    this.fillForm();
  }

  configuredSculpturesValidator(control: FormControl) {
    const configuredSculptures = control.value;
    if (configuredSculptures.length === 0) {
      return { 
        configuredSculpturesInvalid: {
          message: 'Order must have at least one sculpture'
        } 
      };
    }
    return null;
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
      buyerName: [order?.buyerName || '', Validators.required],
      buyerDeliveryAddress: [order?.buyerDeliveryAddress || '', Validators.required],
      configuredSculptures: [order?.configuredSculptures || '', [Validators.required, this.configuredSculpturesValidator]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.orderForm.valid) {
      return;
    }
    
    const httpCall = this.orderId
      ? this.httpService.updateOrder(this.orderForm.value)
      : this.httpService.createOrder(this.orderForm.value);

    httpCall.subscribe(() => this.router.navigate(['/orders']));
  }
}
