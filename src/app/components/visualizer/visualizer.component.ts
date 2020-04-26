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
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes["animations"] !== "undefined" && typeof changes["animations"].currentValue !== "undefined") {
      this.animate();
    }
  }

  swap(arr: Bar[], one: number, two: number) {
    let temp: number = arr[one].value;
    arr[one].value = arr[two].value;
    arr[two].value = temp;
    this.changeColor(arr, "default", [one, two]);
  }

  async animate() {
    //keep track of previous pivot to change it back to default color
    let prevPivot: number = 0;
    let lastIndex:number = 0;
    console.log(this.array.map(bar => bar.value));
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
        await this.wait(this.sortSpeed);
        this.changeColor(this.array, "default", [current.values[0]]);
      }
      await this.wait(this.sortSpeed);
    }
    console.log(this.array.map(bar => bar.value));
    //change final pivot to default color
    this.changeColor(this.array, "default", [prevPivot]);
    this.arrayChanges.emit(this.array);
  }

  arrayCopy(src, srcIndex, dest, destIndex, length) {
    dest.splice(destIndex, length, ...src.slice(srcIndex, srcIndex + length));
  }

  changeColor(arr: Bar[], state: string, indexes: number[]) {
    for (let i = 0; i < indexes.length; i++) {
      if (state === "swap") arr[indexes[i]].color = SWAP_COLOR;
      else if (state === "default") arr[indexes[i]].color = DEFAULT_COLOR;
      else if (state === "pivot") arr[indexes[i]].color = PIVOT_COLOR;
    }
  }

  async wait(time: number) {
    return new Promise(resolve => { setTimeout(resolve, time) });
  }

}
