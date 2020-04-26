import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() arrLen:number;
  @Output() arrLenChange:EventEmitter<number> = new EventEmitter<number>();
  @Input() sortSpeed:number;
  @Output() sortSpeedChange:EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  changeSortSpeed(value){
    this.sortSpeed = value;
    this.sortSpeedChange.emit(this.sortSpeed);
  }

  changeArrLen(value){
    this.arrLen = value;
    this.arrLenChange.emit(this.arrLen);
  }

}
