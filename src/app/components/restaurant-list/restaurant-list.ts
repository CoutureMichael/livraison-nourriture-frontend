import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestaurantService } from '../../services/restaurant';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './restaurant-list.html',
  styleUrls: ['./restaurant-list.scss']
})
export class RestaurantList implements OnInit {

  restaurants: any[] = [];
  loading = true;

 constructor(
  private restaurantService: RestaurantService,
  private cdr: ChangeDetectorRef,
  public authService: AuthService 
) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.loading = true;

    this.restaurantService.getAll().subscribe({
      next: (data: any[]) => {
        this.restaurants = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur restaurants:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  deleteRestaurant(id: string) {
  if (!confirm('Supprimer ce restaurant ?')) {
    return;
  }

  this.restaurantService.delete(id).subscribe({
    next: () => {
      this.restaurants = this.restaurants.filter(r => r._id !== id);
      alert('Restaurant supprimé');
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
      alert('Erreur suppression');
    }
  });
}
}