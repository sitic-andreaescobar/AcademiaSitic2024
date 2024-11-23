import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor() {
        
    }

    showSnackBar(snackbar: MatSnackBar, mensaje: string, duration?: number) {
        snackbar.open(mensaje, 'Aceptar', {
          duration: duration ? duration : 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }).onAction().subscribe( () => {
          snackbar.dismiss();
        });
    }

    markControlsAsTouched(formGroup: FormGroup) {
        return Object.values( formGroup.controls ).forEach( control => {
          if ( control instanceof FormGroup ) {
            Object.values( control.controls ).forEach( control => {
              return control.markAsTouched();
            } );
          } else {
            control.markAsTouched();
          }
        });
    }

    validateNumber(event: KeyboardEvent) {
      const charCode = event.key.charCodeAt(0);
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    }

    getItemLocalStorage(item: string){
      return localStorage.getItem(item);
    }
  
    setItemLocalStorage(item: string, value: string){
      localStorage.removeItem(item);
      localStorage.setItem(item, value);
    }
  
    removeItemLocalStorage(item: string){
      localStorage.removeItem(item);
    }
}