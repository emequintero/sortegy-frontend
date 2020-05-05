import { NgModule } from '@angular/core';
import { MdcButtonModule } from '@angular-mdc/web/button';
import { MdcCardModule } from '@angular-mdc/web/card';
import { MdcListModule } from '@angular-mdc/web/list';
import { MdcSelectModule } from '@angular-mdc/web/select';
import { MdcIconModule } from '@angular-mdc/web/icon';
import { MdcSnackbarModule } from '@angular-mdc/web/snackbar';
import { MdcSliderModule } from '@angular-mdc/web/slider';
import { MdcDrawerModule } from '@angular-mdc/web/drawer';
import { MdcElevationModule } from '@angular-mdc/web/elevation';
import { MdcIconButtonModule } from '@angular-mdc/web/icon-button';

@NgModule({
  exports: [
    MdcButtonModule,
    MdcCardModule,
    MdcListModule,
    MdcSelectModule,
    MdcIconModule,
    MdcSnackbarModule,
    MdcSliderModule,
    MdcDrawerModule,
    MdcElevationModule,
    MdcIconButtonModule
  ]
})
export class MaterialModule { }