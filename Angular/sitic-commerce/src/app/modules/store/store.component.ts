import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  loading: boolean = false;
  productList: Product[] = [];
  constructor(private productsService: ProductsService) { }

  async ngOnInit(): Promise<void> {
    await this.getAllProducts();
  }

  async getAllProducts() {
    this.loading = true;
    await this.productsService.getAllProducts().then((resp: ProductsResponse) => {
      this.loading = false;
      if (resp.error) {
        return;
      }

      this.productList = resp.products;
    }).catch((err) => {
      this.loading = false;
      console.error(err);
    });
  }

  addToCart(product: Product) {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      // Recuperar carrito existente - /Cart/GetById
    } else {
      // Crear un nuevo carrito - /Cart/Insert
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = false; // aqui mandan llamar su servicio que obtiene los elementos del carrito

    if (existingItem) {
      // Actualizar cantidad /CartItem/Update
      // existingItem.quantity++;
    } else {
      // Agregar nuevo producto al carrito - /CartItem/Insert
    };
  }
}
