import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.authService.saveUser(res.user);

        if (res.user.role === 'admin') {
          this.router.navigate(['/admin/orders']);
        } else {
          this.router.navigate(['/restaurants']);
        }
      },
      error: () => {
        this.error = 'Email ou mot de passe invalide';
      }
    });
  }
}