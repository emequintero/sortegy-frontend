import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Animation } from '../../models/animation';
import { Bar } from 'src/app/models/bar';

const SWAP_COLOR = "#FF0266";
const DEFAULT_COLOR = "ghostwhite";
const PIVOT_COLOR = "#F9A825";
const SWAP_WAIT = 30;

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  @Input('array') array: Bar[];
  @Output() arrayChanges: EventEmitter<Bar[]> = new EventEmitter<Bar[]>();
  @Input('animations') animations: Animation[];
  @Input() sortSpeed:number;
  @Input() view:string;
  displayClass:string = "display";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (typeof changes["animations"] !== "undefined" && typeof changes["animations"].currentValue !== "undefined") {
      this.animate();
    }
    else if (typeof changes["view"] !== "undefined"){
      this.switchDisplay(this.view);
    }
  }

  swap(arr: any[], one: number, two: number) {
    let temp: number = arr[one].value;
    arr[one].value = arr[two].value;
    arr[two].value = temp;
    this.changeColor(arr, "default", [one, two]);
  }

  async animate() {
    //keep track of previous pivot to change it back to default color
    let prevPivot: number = 0;
    for (let i = 0; i < this.animations.length; i++) {
      let current: Animation = this.animations[i];
      //swap values in array shown in visualizer
      if (current.state === "swap") {
        this.changeColor(this.array, "swap", current.values);
        await this.wait(SWAP_WAIT);
        this.swap(this.array, current.values[0], current.values[1]);
        this.arrayChanges.emit(this.array);
      }
      else if (current.state === "pivot") {
        if (prevPivot != current.values[0]) this.changeColor(this.array, "default", [prevPivot]);
        this.changeColor(this.array, "pivot", [current.values[0]]);
        prevPivot = current.values[0];
      }
      else if (current.state === "overwrite") {
        this.changeColor(this.array, "swap", [current.values[0]]);
        this.array[current.values[0]].value = current.values[1];
        await this.wait(SWAP_WAIT);
        this.changeColor(this.array, "default", [current.values[0]]);
      }
      else if(current.state === "root"){
        let index:number = 0;
        if (prevPivot != current.values[0]) this.changeColor(this.array, "default", [prevPivot]);
        for(let i = 0; i < this.array.length; i++){
          if(this.array[i].value === current.values[0]){
            index = i;
            break;
          }
        }
        this.changeColor(this.array, "pivot", [index]);
        prevPivot = index;
      }
      await this.wait(this.sortSpeed);
    }
    //change final pivot to default color
    this.changeColor(this.array, "default", [prevPivot]);
    this.arrayChanges.emit(this.array);
  }

  arrayCopy(src, srcIndex, dest, destIndex, length) {
    dest.splice(destIndex, length, ...src.slice(srcIndex, srcIndex + length));
  }

  changeColor(arr: any[], state: string, indexes: number[]) {
    for (let i = 0; i < indexes.length; i++) {
      if (state === "swap") arr[indexes[i]].color = SWAP_COLOR;
      else if (state === "default") {
        arr[indexes[i]].color = this.view === "bars" ? DEFAULT_COLOR : "inherit";
      }
      else if (state === "pivot") arr[indexes[i]].color = PIVOT_COLOR;
    }
  }

  async wait(time: number) {
    return new Promise(resolve => { setTimeout(resolve, time) });
  }

  switchDisplay(value:string){
    if(value === "boxes"){
      this.displayClass = "display alt";
    }
    else{
      this.displayClass = "display";
    }
  }

}
