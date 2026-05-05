import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant';
import { OrderService } from '../../services/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-detail.html',
  styleUrls: ['./restaurant-detail.scss']
})
export class RestaurantDetail implements OnInit {

  restaurant: any = null;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('ID restaurant:', id);

    if (!id) {
      this.error = 'ID manquant';
      return;
    }

    this.restaurantService.getById(id).subscribe({
      next: (data: any) => {
        console.log('Restaurant reçu:', data);

        this.restaurant = { ...data };

        // 🔥 force Angular à refresh l'écran
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur chargement';
        this.cdr.detectChanges();
      }
    });
  }

  orderItem(item: any) {
    const order = {
      restaurant: this.restaurant._id,
      items: [
        {
          name: item.name,
          price: item.price,
          quantity: 1
        }
      ],
      total: item.price
    };

    this.orderService.create(order).subscribe({
      next: () => {
        alert('Commande créée');
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur commande');
      }
    });
  }
}