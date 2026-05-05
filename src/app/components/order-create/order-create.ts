import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order-create.html',
  styleUrl: './order-create.scss'
})
export class OrderCreate implements OnInit {

  restaurantId = '';
  total = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId')!;
  }

createOrder() {
  const order = {
    restaurant: this.restaurantId, // ✔ bon nom
    items: [
      {
        name: 'Commande simple',
        price: this.total,
        quantity: 1
      }
    ],
    total: this.total
  };

  this.orderService.create(order).subscribe({
    next: () => {
      alert('Commande créée');
      this.router.navigate(['/orders']);
    },
    error: (err) => {
      console.error(err);
      alert('Erreur création commande');
    }
  });
}
  
}