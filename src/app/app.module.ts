import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VisualizerComponent } from './components/visualizer/visualizer.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SortegyComponent } from './components/sortegy/sortegy.component';
import { MdcDialogModule } from '@angular-mdc/web/dialog';
import { TutorialDialogComponent } from './components/tutorial-dialog/tutorial-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualizerComponent,
    NavComponent,
    SidenavComponent,
    SortegyComponent,
    TutorialDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    MdcDialogModule
  ],
  entryComponents: [
    TutorialDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
