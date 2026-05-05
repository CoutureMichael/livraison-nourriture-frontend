import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestaurantService } from '../../services/restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './restaurant-edit.html',
  styleUrls: ['./restaurant-edit.scss']
})
export class RestaurantEdit implements OnInit {

  restaurant: any = null;
  error = '';

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'ID manquant';
      return;
    }

    this.restaurantService.getById(id).subscribe({
      next: (data: any) => {
        this.restaurant = { ...data };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur chargement restaurant';
        this.cdr.detectChanges();
      }
    });
  }

  updateRestaurant() {
    this.restaurantService.update(this.restaurant._id, this.restaurant).subscribe({
      next: () => {
        alert('Restaurant modifié');
        this.router.navigate(['/restaurants']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur modification');
      }
    });
  }
}