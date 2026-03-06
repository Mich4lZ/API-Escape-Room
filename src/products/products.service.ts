import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly products = [
    { id: 1, name: 'Laptop', price: 2999.99 },
    { id: 2, name: 'Smartphone', price: 1499.99 },
    { id: 3, name: 'Headphones', price: 299.99 },
    { id: 4, name: 'Keyboard', price: 149.99 },
    { id: 5, name: 'Mouse', price: 79.99 },
  ];

  findAll() {
    return this.products;
  }
}