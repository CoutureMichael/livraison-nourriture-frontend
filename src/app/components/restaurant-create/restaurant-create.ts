import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './restaurant-create.html',
  styleUrls: ['./restaurant-create.scss']
})
export class RestaurantCreate {

  restaurant = {
    name: '',
    address: '',
    category: '',
    menu: []
  };

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  createRestaurant() {
    this.restaurantService.create(this.restaurant).subscribe({
      next: () => {
        alert('Restaurant créé');
        this.router.navigate(['/restaurants']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur création restaurant');
      }
    });
  }
}