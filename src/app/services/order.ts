import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  update(id: string, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // 🔥 meilleure méthode pour ton projet
  updateStatus(id: string, status: string) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { status });
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}