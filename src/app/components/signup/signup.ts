import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {

  name = '';
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signup() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.signup(data).subscribe({
      next: () => {
        alert('Compte créé avec succès');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors de l’inscription';
      }
    });
  }
}