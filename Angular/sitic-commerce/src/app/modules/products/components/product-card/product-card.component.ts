import { Component, OnInit } from '@angular/core';

// Interfaces
import { Product } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  product: Product = {
    id:1,
    name:"Mouse Inalámbrico Logitech",
    description:"Mouse ergonómico con conectividad inalámbrica y batería de larga duración",
    price:25.99,
    currentStock:10,
    maxStock:100,
    minStock:10,
    stockStatusId:3,
    imagePath:null,
    createdAt: new Date()
  }
  constructor() { }

  ngOnInit(): void {
  }

}
