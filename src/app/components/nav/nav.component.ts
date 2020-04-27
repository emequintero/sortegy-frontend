import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Animation } from '../../models/animation';
import { SortingService } from '../../services/sorting.service';
import { Bar } from 'src/app/models/bar';
import { MDCSnackbar } from '@material/snackbar';

const RAND_MAX = 490;
const RAND_MIN = 1;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() array: Bar[];
  @Output() arrayChange: EventEmitter<Bar[]> = new EventEmitter<Bar[]>();
  @Input() animations: Animation[];
  @Output() animationsChange: EventEmitter<Animation[]> = new EventEmitter<Animation[]>();
  @Input() arrLen:number;
  algorithms: string[] = ["QuickSort", "MergeSort", "HeapSort", "InsertionSort", "BubbleSort"];
  selectedAlgo: string = "QuickSort";
  alert: MDCSnackbar;
  alertMsg:string="Please create an array before clicking begin sorting.";
  optionsOpen:boolean = false;
  constructor(private sortingService: SortingService) { }

  ngOnInit(): void {
    this.alert = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
  }

  createRandomArray() {
    this.array = Array(this.arrLen);
    for (let i = 0; i < this.arrLen; i++) {
      this.array[i] = new Bar("default", Math.floor(Math.random() * RAND_MAX) + RAND_MIN);
    }
    this.arrayChange.emit(this.array);
  }

  beginSorting() {
    if (typeof this.array !== "undefined") {
      let unsortedArray: number[] = this.array.map(bar => bar.value);
      let algo:string = this.selectedAlgo.toLowerCase().replace("sort","");
      this.sortingService.sort(algo, unsortedArray).subscribe(sortResponse => {
        let temp: Animation[] = sortResponse["animations"];
        for (let i = 0; i < temp.length; i++) {
          temp[i] = new Animation(sortResponse["animations"][i].state,
          sortResponse["animations"][i].values);
        }
        this.animations = temp;
        this.animationsChange.emit(this.animations);
      });
    }
    else {
      this.alert.open();
    }
  }

  setAlgorithm(algo: string) {
    this.selectedAlgo = algo.trim();
  }

  sliderChange(event){
    this.arrLen = event.value;
  }
}