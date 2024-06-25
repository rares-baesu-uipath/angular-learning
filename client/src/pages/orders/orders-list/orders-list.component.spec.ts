import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { OrdersListComponent } from './orders-list.component';
import { OrderService } from '../../../services/order/order.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('OrderListComponent', () => {
  let component: OrdersListComponent;
  let fixture: ComponentFixture<OrdersListComponent>;
  let sculptureService: OrderService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OrdersListComponent],
      declarations: [],
      providers: [OrderService,    provideHttpClient(),
        provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersListComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    sculptureService = TestBed.inject(OrderService);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data', fakeAsync(() => {
    const mockData = [{
      id: '1',
      buyerName: 'test',
      buyerDeliveryAddress: 'test',
      configuredSculptures: []
    }];

    spyOn(sculptureService, 'getOrders').and.returnValue(of(mockData));
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('[role="listitem"]').length).toBe(1);
  }));
});
