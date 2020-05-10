import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bar } from '../models/bar';

@Injectable({
  providedIn: 'root'
})
export class DependenciesService {
  array:Bar[] = [];
  barHeight:number;
  barSubject: BehaviorSubject<Bar[]> = new BehaviorSubject([new Bar("",0)]);
  constructor() { }
  setResponsiveBars(barHeight: number) {
    this.barSubject.next(this.array.map((bar)=>{return new Bar(bar.color,Math.floor(bar.value/barHeight));}));
    this.barHeight = barHeight;
  }
  subscribeToBarHeight() {
    return this.barSubject.asObservable();
  }
  getBarHeight() {
    return this.barHeight;
  }
  setBackupArray(array: Bar[]) {
    this.array = array;
  }
}
