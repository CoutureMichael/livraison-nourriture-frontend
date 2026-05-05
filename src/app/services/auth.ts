import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://livraison-nourriture-backend.onrender.com';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  signup(data: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  // 🔥 TOKEN
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // 🔥 USER
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
  }
}