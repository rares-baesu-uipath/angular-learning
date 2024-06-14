import { Routes } from '@angular/router';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrderFormComponent } from './pages/orders/order-form/order-form.component';
import { SculpturesListComponent } from './pages/sculptures/sculptures-list/sculptures-list.component';
import { SculptureFormComponent } from './pages/sculptures/sculpture-form/sculpture-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'orders', component: OrdersListComponent },
    { path: 'orders/new', component: OrderFormComponent },
    { path: 'orders/:id', component: OrderFormComponent },
    { path: 'sculptures', component: SculpturesListComponent },
    { path: 'sculptures/new', component: SculptureFormComponent },
    { path: 'sculptures/:id', component: SculptureFormComponent },
];
