import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Animation } from '../../models/animation';
import { SortingService } from '../../services/sorting.service';
import { Bar } from 'src/app/models/bar';
import {MDCSnackbar} from '@material/snackbar';

const ARR_LEN = 50;
const RAND_MAX = 500;
const RAND_MIN = 1;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input('array') array: Bar[];
  @Output() arrayChange: EventEmitter<Bar[]> = new EventEmitter<Bar[]>();
  @Input('animations') animations: Animation[];
  @Output() animationsChange: EventEmitter<Animation[]> = new EventEmitter<Animation[]>();
  algorithms:string[] = ["QuickSort","BubbleSort","MergeSort"];
  selectedAlgo:string = "QuickSort";
  alert:MDCSnackbar;
  constructor(private sortingService:SortingService) { }

  ngOnInit(): void {
    this.alert = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
  }

  createRandomArray() {
    this.array = Array(ARR_LEN);
    for (let i = 0; i < ARR_LEN; i++) {
      this.array[i] = new Bar("default",Math.floor(Math.random() * RAND_MAX) + RAND_MIN);
    }
    this.arrayChange.emit(this.array);
  }

  beginSorting(){
    if(typeof this.array !== "undefined"){
      switch(this.selectedAlgo){
        case "QuickSort":{
          this.quickSort();
          break;
        }
      }
    }
    else{
      this.alert.open();
    }
  }

  quickSort() {
    let unsortedArray:number[] = this.array.map(bar=>bar.value);
    this.sortingService.quickSort(unsortedArray).subscribe(sortResponse=>{
      let temp:Animation[] = sortResponse["animations"];
      for(let i = 0; i < temp.length; i++){
        temp[i] = new Animation(sortResponse["animations"][i].state, 
                                          sortResponse["animations"][i].values);
      }
      this.animations = temp;
      this.animationsChange.emit(this.animations);
    });
  }

  setAlgorithm(algo){
    this.selectedAlgo = algo;
  }
}