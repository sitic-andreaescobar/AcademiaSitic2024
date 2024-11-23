import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { ScreenStatus } from 'src/app/shared/interfaces/comun/enums.interface';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { MatTableDataSource } from '@angular/material/table';

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
      if (resp.error) {
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
    this.showDialogProduct(ScreenStatus.ViewDetail, item.id);
  }

  async onClickModify(item: Product){
    let result = await this.showDialogProduct(ScreenStatus.Updating, item.id);

    if(result.refreshProducts)
      this.getAllProducts();
  }

  async onClickAdd() {
    let result = await this.showDialogProduct(ScreenStatus.Adding);

    if(result.refreshProducts)
      this.getAllProducts();
  }

  async showDialogProduct(screenStatus: ScreenStatus, id?: number):Promise<any> {
    const dialogProduct = this.dialog.open(ProductDialogComponent, {
      data: { 
        screenStatus,
        id
      },
      disableClose: true
    });

    return await lastValueFrom(dialogProduct.afterClosed()).then(result => {
      return Promise.resolve(result);
    });
  }

}
