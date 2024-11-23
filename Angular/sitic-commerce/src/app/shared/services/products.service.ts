import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductsResponse } from "../interfaces/products/products-response.interface";
import { Product } from "../interfaces/products/product.interface";
import { lastValueFrom } from "rxjs/internal/lastValueFrom";

// CONFIGURACION
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private _actionUrls: string;
    constructor(public http: HttpClient) {
        this._actionUrls = `${environment.URI_SERVER}/Product`;;
    }

    async getById(id: number): Promise<ProductsResponse> {
        const response = await lastValueFrom(this.http.get(`${this._actionUrls}/GetById`,
          { params: { id } }));
          return response as ProductsResponse;
    }

    async getAllProducts(): Promise<ProductsResponse> {
        const response = await lastValueFrom(this.http.get(`${this._actionUrls}/GetAll`, { }));
          return response as ProductsResponse;
    }

    async addProduct(product: Product): Promise<ProductsResponse> {
        const response = await lastValueFrom(this.http.post(`${this._actionUrls}/Insert`, { product }));
          return response as ProductsResponse;
    }

    async updateProduct(product: Product): Promise<ProductsResponse> {
        const response = await lastValueFrom(this.http.put(`${this._actionUrls}/Update`,
          { product }));
          return response as ProductsResponse;
    }

    async deleteProduct(id: number): Promise<ProductsResponse> {
        const response = await lastValueFrom(this.http.delete(`${this._actionUrls}/Delete`,
          { params: { id } }));
          return response as ProductsResponse;
    }
}