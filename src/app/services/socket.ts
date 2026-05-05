import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
  }

  onOrderCreated(callback: (order: any) => void) {
    this.socket.on('order:created', callback);
  }

  onOrderUpdated(callback: (order: any) => void) {
    this.socket.on('order:updated', callback);
  }

  onOrderDeleted(callback: (id: string) => void) {
    this.socket.on('order:deleted', callback);
  }

  onNotification(callback: (notification: any) => void) {
    this.socket.on('notification:new', callback);
  }
}