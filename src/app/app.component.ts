import { Component } from '@angular/core';
import {Animation} from 'src/app/models/animation';
import { Bar } from './models/bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sortegy';
  array:Bar[];
  animations:Animation[];
  arrLen:number = 25;
  sortSpeed:number = 10;
  view:string = "bars";
}
