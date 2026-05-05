import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant';

@Component({
  selector: 'app-menu-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-create.html',
  styleUrls: ['./menu-create.scss']
})
export class MenuCreate {
  restaurantId = '';

  menu = {
    name: '',
    description: '',
    price: 0
  };

  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService
  ) {
    this.restaurantId = this.route.snapshot.paramMap.get('id') || '';
  }

  addMenu() {
    this.restaurantService.addMenu(this.restaurantId, this.menu).subscribe({
      next: () => {
        alert('Menu ajouté');
        this.router.navigate(['/restaurants']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors de l’ajout du menu';
      }
    });
  }
}