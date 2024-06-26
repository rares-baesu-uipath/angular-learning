import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, filter, of, switchMap, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order } from '../../../model/order';
import { OrderService } from '../../../services/order/order.service';
import { CommonModule } from '@angular/common';
import { SculpturePickerComponent } from './sculpture-picker/sculpture-picker.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCard } from '@angular/material/card';
import { MAX_TOTAL_WEIGHT, State } from '../../../model/common';
import { ConfiguredSculpture, MATERIAL_CONFIG, Sculpture } from '../../../model/sculpture';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SculpturePickerComponent, 
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIcon,
    MatProgressSpinnerModule, MatCard, MatFormFieldModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFormComponent {
  orderId: string;
  state$ = new BehaviorSubject<State<Order>>({ type: 'loading' });
  orderForm: FormGroup = this.formBuilder.group({
    id: '', buyerName: '', buyerDeliveryAddress: '', configuredSculptures: []
  });
  submitted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      tap(params => {
        this.orderId = params['id']
      }),
      switchMap(params =>
        this.orderId ?
          this.orderService.getOrder$(params['id']) :
          of<State<Order>>({ type: 'data', data: { id: '', buyerName: '', buyerDeliveryAddress: '', configuredSculptures: [] } })
      ),
      tap(state => {
        if (state.type === 'data') {
          this.orderId = state.data.id;
          this.fillForm(state.data);
          this.state$.next({
            type: 'data',
            data: state.data
          });
        }
      }),
      catchError((state, obs) => {
        this.state$.next(state);
        return obs;
      })
    ).subscribe({
      next: data => this.state$.next(data),
      error: err => this.state$.error(err)
    });
  }

  fillForm(order: Order) {
    this.orderForm = this.formBuilder.group({
      id: [order.id],
      buyerName: [order.buyerName, Validators.required],
      buyerDeliveryAddress: [order.buyerDeliveryAddress, Validators.required],
      configuredSculptures: [order.configuredSculptures, [Validators.required, this.configuredSculpturesValidator]]
    });
  }
  
  configuredSculpturesValidator(control: FormControl<ConfiguredSculpture[]>) {
    const configuredSculptures = control.value;
    if (configuredSculptures.length === 0) {
      return { 
        configuredSculpturesInvalid: {
          message: 'Order must have at least one sculpture'
        } 
      };
    }

    const totalWeight = configuredSculptures.reduce((prev, curr) => prev + MATERIAL_CONFIG[curr.material].weightMultiplier * curr.sculpture.baseWeight, 0)

    if (totalWeight > MAX_TOTAL_WEIGHT) {
      return { 
        configuredSculpturesInvalid: {
          message: `Order must have a maximum weight of ${MAX_TOTAL_WEIGHT}`
        } 
      }
    }

    return null;
  }

  onSubmit() {
    this.submitted = true;

    if (!this.orderForm.valid) {
      return;
    }

    this.state$.next({type: 'loading'})

    const httpCall = this.orderId
      ? this.orderService.updateOrder$(this.orderForm.value)
      : this.orderService.createOrder$(this.orderForm.value);

    httpCall.subscribe(() => this.router.navigate(['/orders']));
  }

  deleteOrder() {
    if (!this.orderId) {
      return;
    }
    
    this.state$.next({type: 'loading'});

    this.orderService.deleteOrder$(this.orderId).subscribe({
      next: () => this.router.navigate(['/sculptures'])
    });
  }
}
