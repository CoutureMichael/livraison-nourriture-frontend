export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'restaurant' | 'livreur' | 'admin';
}