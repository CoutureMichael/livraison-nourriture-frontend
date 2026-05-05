import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../services/order';
import { SocketService } from '../../services/socket';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.scss']
})
export class OrderList implements OnInit {

  orders: any[] = [];
  loading = true;
  notification = '';

  constructor(
    private orderService: OrderService,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.listenSockets();
  }

  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (data: any[]) => {
        this.orders = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  listenSockets() {

    // 🔥 update
    this.socketService.onOrderUpdated((updatedOrder: any) => {
      this.orders = this.orders.map(order =>
        order._id === updatedOrder._id ? updatedOrder : order
      );

      this.notification = 'Commande mise à jour';
      this.cdr.detectChanges();
    });

    // 🔥 DELETE (IMPORTANT)
    this.socketService.onOrderDeleted((orderId: any) => {
      const id = typeof orderId === 'string' ? orderId : orderId._id;

      this.orders = this.orders.filter(order => order._id !== id);

      this.notification = 'Commande supprimée';
      this.cdr.detectChanges();
    });

    // 🔥 notification
    this.socketService.onNotification((notif: any) => {
      this.notification = notif.message;
      this.cdr.detectChanges();
    });
  }

  // 🔥 correction status
  getStatusText(status: string): string {
    switch (status) {
      case 'created':
        return 'En attente';
      case 'accepted':
        return 'Acceptée';
      case 'preparing':
        return 'En préparation';
      case 'ready':
        return 'Prête';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  }
}