import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Animation } from '../../models/animation';
import { Bar } from 'src/app/models/bar';

const SWAP_COLOR = "red";
const DEFAULT_COLOR = "lightpink";
const PIVOT_COLOR = "blue";
const SWAP_WAIT = 30;
const ANIMATION_WAIT = 10;

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  @Input('array') array: Bar[];
  @Output() arrayChanges: EventEmitter<Bar[]> = new EventEmitter<Bar[]>();
  @Input('animations') animations: Animation[];
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
    let prevPivot = 0;
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
      await this.wait(ANIMATION_WAIT);
    }
    //change final pivot to default color
    this.changeColor(this.array, "default", [prevPivot]);
    this.arrayChanges.emit(this.array);
  }

  changeColor(arr: Bar[], state: String, indexes: number[]) {
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
