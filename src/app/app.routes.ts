import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { RestaurantDetail } from './components/restaurant-detail/restaurant-detail';
import { OrderCreate } from './components/order-create/order-create';
import { OrderList } from './components/order-list/order-list';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { RestaurantCreate } from './components/restaurant-create/restaurant-create';
import { RestaurantEdit } from './components/restaurant-edit/restaurant-edit';
import { AdminOrders } from './components/admin-orders/admin-orders';
import { MenuCreate } from './components/menu-create/menu-create';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  { path: 'restaurants', component: RestaurantList, canActivate: [authGuard] },
  { path: 'restaurants/create', component: RestaurantCreate, canActivate: [authGuard] },
  { path: 'restaurants/edit/:id', component: RestaurantEdit, canActivate: [authGuard] },
  { path: 'restaurants/:id', component: RestaurantDetail, canActivate: [authGuard] },
  { path: 'restaurants/:id/menu', component: MenuCreate, canActivate: [adminGuard] },
  { path: 'orders/create/:restaurantId', component: OrderCreate, canActivate: [authGuard] },
  { path: 'orders', component: OrderList, canActivate: [authGuard] },


  { path: 'admin/orders', component: AdminOrders, canActivate: [adminGuard] },

  { path: '**', redirectTo: 'login' }
];