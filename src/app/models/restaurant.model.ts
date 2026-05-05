export interface MenuItem {
  name: string;
  description: string;
  price: number;
}

export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  category: string;
  menu: MenuItem[];
}