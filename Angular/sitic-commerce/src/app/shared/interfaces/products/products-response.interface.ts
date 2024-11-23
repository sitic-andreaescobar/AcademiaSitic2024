import { ComunResponse } from "../comun/comun-response.interface";
import { Product } from "./product.interface";

export interface ProductsResponse extends ComunResponse {
    product: Product;
    products: Product[];
}