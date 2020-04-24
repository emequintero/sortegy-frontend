import { NgModule } from '@angular/core';
import { MdcButtonModule } from '@angular-mdc/web/button';
import { MdcCardModule } from '@angular-mdc/web/card';
import { MdcListModule } from '@angular-mdc/web/list';
import { MdcSelectModule } from '@angular-mdc/web/select';
import { MdcIconModule } from '@angular-mdc/web/icon';
import { MdcSnackbarModule } from '@angular-mdc/web/snackbar';

@NgModule({
  exports: [
    MdcButtonModule,
    MdcCardModule,
    MdcListModule,
    MdcSelectModule,
    MdcIconModule,
    MdcSnackbarModule
  ]
})
export class MaterialModule { }