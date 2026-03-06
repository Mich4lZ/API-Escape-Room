import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './create.product.dto';

@Injectable()
export class ProductsService {
  private readonly products = [
    { id: 1, name: 'Laptop', price: 2999.99 },
    { id: 2, name: 'Smartphone', price: 1499.99 },
    { id: 3, name: 'Headphones', price: 299.99 },
    { id: 4, name: 'Keyboard', price: 149.99 },
    { id: 5, name: 'Mouse', price: 79.99 },
  ];

  create(dto: CreateProductDto) {
    const maxId = this.products.reduce(
      (max, p) => (p.id > max ? p.id : max),
      0,
    );
    const newProduct = {
      id: maxId + 1,
      name: dto.name,
      price: dto.price,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
