import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScreenStatus } from 'src/app/shared/interfaces/comun/enums.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  id: number;
  product: Product;
  screenStatus: ScreenStatus;
  formProduct: FormGroup;
  loading: boolean = false;

  title: string = '';
  icon: string = 'mat:edit'

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sharedService: SharedService,
    private productsService: ProductsService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder) { 
      this.id = this.data.id;
      this.screenStatus = this.data.screenStatus;
    }

  async ngOnInit(): Promise<void> {
    let disableFields: boolean = this.screenStatus === ScreenStatus.ViewDetail;

    this.formProduct = this.fb.group({
      name: [{ value: '', disabled: disableFields }, Validators.required],
      description: [{ value: '', disabled: disableFields }, Validators.required],
      price: [
        { value: '', disabled: disableFields },
        [Validators.required, Validators.min(0.01)]
      ],
      currentStock: [
        { value: '', disabled: disableFields },
        [Validators.required, Validators.min(1)]
      ],
      maxStock: [
        { value: '', disabled: disableFields },
        [Validators.required, Validators.min(1)]
      ],
      minStock: [
        { value: '', disabled: disableFields },
        [Validators.required, Validators.min(1)]
      ]
    });

    switch(this.screenStatus) {
      case ScreenStatus.Adding:
        this.title = 'Agregar producto';
        this.icon = 'mat:edit';
        break;
      case ScreenStatus.Updating:
        this.title = `Modificar producto`;
        this.icon = 'mat:edit';
        break;
      case ScreenStatus.ViewDetail:
        this.title = `Detalle producto`;
        this.icon = 'mat:read_more';
        break;
    }

    if(this.screenStatus !== ScreenStatus.Adding) {
        await this.getById(this.id);
    } else {
      // Inicializa objeto
      this.product = {
        id: 0, 
        name: '',
        description: '',
        price: 0,
        currentStock: 0,
        minStock: 0,
        maxStock: 0,
        stockStatusId: 0,
        updatedAt: new Date(),
        createdAt: new Date()
      }
    }
  }

  async onSubmit() {
    if(this.screenStatus === ScreenStatus.ViewDetail)
      this.dialogRef.close({ ok: true, product: this.product});

    if(!await this.validateAllFields())
      return;

    if (this.screenStatus === ScreenStatus.Adding) {
      this.addProduct();
    } else if(this.screenStatus === ScreenStatus.Updating) {
      this.updateProduct();     
    }
  }

  async updateProduct() {
    this.loading = true;
    this.productsService.updateProduct(this.product).then((resp: ProductsResponse) => {
      this.loading = false;
      if (resp.error)
        return;

    this.dialogRef.close({ refreshProducts: true, product: this.product });

    }).catch((err) => {
        console.error(err);
    });
  }

  async addProduct() {
    this.loading = true;
    this.productsService.addProduct(this.product).then((resp: ProductsResponse) => {
      this.loading = false;
      if (resp.error)
        return;

      this.dialogRef.close({ refreshProducts: true, product: this.product });

    }).catch((err) => {
       console.error(err);
    });
  }

  async getById(id: number) {
    this.loading = true;
    await this.productsService.getById(id).then((resp: ProductsResponse) => {
      this.loading = false;
      if (resp.error) {
        return;
      }

      this.product = resp.product;

      // Seteamos data a nuestro formulario
      this.formProduct.get('name').setValue(this.product.name);
      this.formProduct.get('description').setValue(this.product.description);
      this.formProduct.get('price').setValue(this.product.price);
      this.formProduct.get('currentStock').setValue(this.product.currentStock);
      this.formProduct.get('maxStock').setValue(this.product.maxStock);
      this.formProduct.get('minStock').setValue(this.product.minStock);
    }).catch((err) => {
      this.loading = false;
      console.error(err);
    });
  }

  async validateAllFields(): Promise<boolean> {
    if (this.formProduct.invalid) {
      this.sharedService.showSnackBar(this.snackbar, 'Existen campos que aún no han sido llenados correctamente.');
      this.sharedService.markControlsAsTouched(this.formProduct);
      return false;
    }

    // Seteamos data a nuestro objeto
    this.product.name = this.formProduct.get('name')?.value;
    this.product.description = this.formProduct.get('description')?.value;
    this.product.price = this.formProduct.get('price')?.value;
    this.product.currentStock = this.formProduct.get('currentStock')?.value;
    this.product.maxStock = this.formProduct.get('maxStock')?.value;
    this.product.minStock = this.formProduct.get('minStock')?.value;

    return true;
  }

}
