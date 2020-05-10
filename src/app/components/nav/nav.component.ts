import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Animation } from '../../models/animation';
import { SortingService } from '../../services/sorting.service';
import { DependenciesService } from '../../services/dependencies.service';
import { Bar } from 'src/app/models/bar';
import { MDCSnackbar } from '@material/snackbar';

const RAND_MAX = 470;
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
  algorithms: string[] = ["Quick Sort", "Merge Sort", "Heap Sort", "Insertion Sort", "Bubble Sort"];
  selectedAlgo: string = "";
  alert: MDCSnackbar;
  optionsOpen:boolean = false;
  algoDescription:string = "Please select an algorithm.";
  constructor(private sortingService: SortingService, private dependenciesService:DependenciesService) { }

  ngOnInit(): void {
    this.alert = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
  }

  createRandomArray() {
    this.array = Array(this.arrLen);
    for (let i = 0; i < this.arrLen; i++) {
      this.array[i] = new Bar("default", Math.floor(((Math.random() * RAND_MAX) + RAND_MIN ) / 
                                          this.dependenciesService.getBarHeight()));
    }
    this.arrayChange.emit(this.array);
    this.dependenciesService.setBackupArray(this.array);
  }

  beginSorting() {
    if(this.selectedAlgo.length !== 0){
      if (typeof this.array !== "undefined") {
        let unsortedArray: number[] = this.array.map(bar => bar.value);
        let algo:string = this.selectedAlgo.toLowerCase().replace(" sort","");
        this.sortingService.sort(algo, unsortedArray).subscribe(sortResponse => {
          let temp: Animation[] = sortResponse["animations"];
          for (let i = 0; i < temp.length; i++) {
            temp[i] = new Animation(sortResponse["animations"][i].state,
            sortResponse["animations"][i].values);
          }
          this.animations = temp;
          this.animationsChange.emit(this.animations);
        });
        this.alert.labelText = `Executing ${this.selectedAlgo.toLowerCase()} on the array!`;
        this.alert.open();
      }
      else {
        this.alert.labelText = "Please create an array before sorting."
        this.alert.open();
      }
    }
    else{
      this.alert.labelText = "Please select an algorithm before sorting."
      this.alert.open();
    }
  }

  setAlgorithm(algo: string) {
    this.selectedAlgo = algo.trim();
    switch(this.selectedAlgo){
      case "Quick Sort":{
        this.algoDescription = `<strong>Quick Sort</strong> uses recursion and <em><strong>partions & pivots
        </strong></em> to sort. <a href="https://en.wikipedia.org/wiki/Quicksort" target="_blank">
        Learn more.</a>`;
        break;
      }
      case "Merge Sort":{
        this.algoDescription = `<strong>Merge Sort</strong> uses recursion and <em><strong>divide & conquer
        </strong></em> to sort. <a href="https://en.wikipedia.org/wiki/Merge_sort" target="_blank">
        Learn more.</a>`;
        break;
      }
      case "Heap Sort":{
        this.algoDescription = `<strong>Heap Sort</strong> stores the array as a <em><strong>max heap</strong>
        </em> then polls it to sort. <a href="https://en.wikipedia.org/wiki/Heapsort" target="_blank">
        Learn more.</a>`;
        break;
      }
      case "Insertion Sort":{
        this.algoDescription = `<strong>Insertion Sort</strong> finds the <em><strong>largest value</strong>
        </em> and puts it in the end of the array. <a href="https://en.wikipedia.org/wiki/Insertion_sort" 
        target="_blank"> Learn more.</a>`;
        break;
      }
      case "Bubble Sort":{
        this.algoDescription = `<strong>Bubble Sort</strong> swaps <em><strong>adjacent elements</strong></em>
         that are out of order until the array is sorted. <a href="https://en.wikipedia.org/wiki/Bubble_sort" 
         target="_blank"> Learn more.</a>`;
        break;
      }
    }
  }
}