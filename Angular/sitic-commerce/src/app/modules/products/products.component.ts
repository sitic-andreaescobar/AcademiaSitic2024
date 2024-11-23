import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { MatTableDataSource } from '@angular/material/table';

// Componentes
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

// Servicios
import { ProductsService } from 'src/app/shared/services/products.service';

// Interfaces
import { eErrorType, eScreenStatus } from 'src/app/shared/interfaces/comun/enums.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'imgPath', 'name', 'description', 'price', 'currentStock', 'updatedAt', 'tags'];
  productList: Product[] = [];
  dataSource = new MatTableDataSource<Product>(this.productList);
  loading: boolean = false;

  constructor(private dialog: MatDialog,
      private productsService: ProductsService) { }

  async ngOnInit(): Promise<void> {
    this.dataSource = new MatTableDataSource(); 
    await this.getAllProducts();
  }

  async getAllProducts() {
    this.loading = true;
    await this.productsService.getAllProducts().then((resp: ProductsResponse) => {
      this.loading = false;
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return;
      }

      this.dataSource.data = resp.products;
    }).catch((err) => {
      this.loading = false;
      console.error(err);
    });
  }

  onClickDelete(item: Product) {
    console.log(item);
  }

  onClickReadMore(item: Product){
    this.showDialogProduct(eScreenStatus.ViewDetail, item.id);
  }

  async onClickModify(item: Product){
    let result = await this.showDialogProduct(eScreenStatus.Updating, item.id);

    if(result.refreshProducts)
      this.getAllProducts();
  }

  async onClickAdd() {
    let result = await this.showDialogProduct(eScreenStatus.Adding);

    if(result.refreshProducts)
      this.getAllProducts();
  }

  async showDialogProduct(eScreenStatus: eScreenStatus, id?: number):Promise<any> {
    const dialogProduct = this.dialog.open(ProductDialogComponent, {
      data: { 
        eScreenStatus,
        id
      },
      disableClose: true
    });

    return await lastValueFrom(dialogProduct.afterClosed()).then(result => {
      return Promise.resolve(result);
    });
  }

}
