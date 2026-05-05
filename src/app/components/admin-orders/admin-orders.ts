import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order';
import { SocketService } from '../../services/socket';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrls: ['./admin-orders.scss']
})
export class AdminOrders implements OnInit {
  orders: any[] = [];
  loading = true;
  error = '';

  statuses = [
    { value: 'created', label: 'En attente' },
    { value: 'accepted', label: 'Acceptée' },
    { value: 'preparing', label: 'En préparation' },
    { value: 'ready', label: 'Prête' },
    { value: 'delivered', label: 'Livrée' },
    { value: 'cancelled', label: 'Annulée' }
  ];

  constructor(
    private orderService: OrderService,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.listenSockets();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = '';

    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors du chargement des commandes';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

listenSockets(): void {
  this.socketService.onOrderCreated((newOrder: any) => {
    this.orders = [newOrder, ...this.orders];
    this.cdr.detectChanges();
  });

  this.socketService.onOrderUpdated((updatedOrder: any) => {
    this.orders = this.orders.map(order =>
      order._id === updatedOrder._id ? updatedOrder : order
    );
    this.cdr.detectChanges();
  });

  this.socketService.onOrderDeleted((orderId: any) => {
    const id = typeof orderId === 'string' ? orderId : orderId._id;

    this.orders = this.orders.filter(order => order._id !== id);
    this.cdr.detectChanges();
  });
}

  updateStatus(order: any): void {
    this.orderService.updateStatus(order._id, order.status).subscribe({
      next: () => {
        alert('Status mis à jour');
      },
      error: (err) => {
        console.error(err);
        alert('Erreur : accès refusé ou problème serveur');
      }
    });
  }

  deleteOrder(order: any): void {
    if (!confirm('Supprimer cette commande ?')) {
      return;
    }

    this.orderService.delete(order._id).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o._id !== order._id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression');
      }
    });
  }
}