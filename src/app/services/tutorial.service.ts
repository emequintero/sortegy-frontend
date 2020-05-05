import { Injectable } from '@angular/core';
import { Step } from '../models/step';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private steps: Step[] = [];
  private stepPointer: number = 0;
  constructor() {
    this.steps.push(new Step("Welcome to Sortegy!",
      "This brief guide takes you through all of this application's features.",
      `If you'd rather get started now, hit the <em><strong>"Skip Tutorial"</strong></em> 
                    button below. 
                    To continue with the tutorial click <em><strong>"Next!"</strong></em>`,
      "Logo.png"));
    this.steps.push(new Step("What is a sorting algorithm?",
      `A Sorting Algorithm is used to order the elements of a given sequence 
                    or list based on a comparison operator.`,
      `An <em><strong>array</strong></em> will be used to represent the elements in this 
                    application.`,
      "Sorting.png"));
    this.steps.push(new Step("Choosing an algorithm",
      `Select an algorithm from the "Algorithms" drop-down menu.`,
      `Make sure to try them all! Each one varies in efficiency depending on the size of the input
                     array.`,
      "Menu.PNG"));
    this.steps.push(new Step("Which can you choose from?",
      `No such thing as an ideal algorithm`,
      `
                    <strong>Quick Sort</strong>, recursive and uses <em><strong>partions & pivots</strong></em>
                     to sort.<br>
                    <strong>Merge Sort</strong>, recursive and uses <em><strong>divide & conquer</strong></em>
                     to sort.<br>
                    <strong>Heap Sort</strong>, stores the array as a <em><strong>max heap</strong></em> then
                     polls it to sort.<br>
                    <strong>Insertion Sort</strong>, finds the <em><strong>largest value</strong></em> and puts
                     it in the end of the array.<br> 
                    <strong>Bubble Sort</strong>, swaps <em><strong>adjacent elements</strong></em> that are out
                     of order until the array is sorted.`,
      "Algorithms.png"));
    this.steps.push(new Step("Where to begin?",
      `Make some elements to sort`,
      `Click the <em><strong>"CREATE ARRAY"</strong></em> button to randomly generate some elements
                     for you to sort, select your algorithm and click <em><strong>"BEGIN SORTING!"</strong></em>`,
      "Sorted.PNG"));
    this.steps.push(new Step("Can I change any settings?",
      `Visualization configuration`,
      `Use the sliders in the side nav to change the the <em><strong>speed</strong></em> of the
                     visualization or the <em><strong>length</strong></em> of the randomly 
                    generated array. You're also able to toggle between <em><strong>bar/box</strong></em>
                     representations of the array elements.`,
      "Options.PNG"));
    this.steps.push(new Step("Have fun!",
      `I know that you'll have lots of fun using this visualization tool!`,
      `If you're curious, the code for this application is publicly available on my 
                    <a href="https://github.com/matthiasquintero/sortegy-frontend" target="_blank">Github</a>.`,
      "Begin.png"));
  }

  getSteps(): Step[] {
    return this.steps;
  }

  setSteps(steps: Step[]) {
    this.steps = steps;
  }

  peek(): Step {
    return this.steps[this.stepPointer];
  }

  next(): Step {
    let step: Step = null;
    //check if the pointer is out of max bound
    if (this.stepPointer >= this.steps.length - 1) {
      //set pointer back to the end if it was out of bounds
      this.stepPointer = this.steps.length - 1;
      //don't increase the pointer
      step = this.steps[this.stepPointer];
    }
    else {
      step = this.steps[++this.stepPointer];
    }
    return step;
  }

  previous(): Step {
    let step: Step = null;
    //check if the pointer is out of min bound
    if (this.stepPointer <= 0) {
      //set pointer back to 0 if it was out of bounds
      this.stepPointer = 0;
      //don't increase the pointer
      step = this.steps[this.stepPointer];
    }
    else {
      step = this.steps[--this.stepPointer];
    }
    return step;
  }

  getPagination(): Pagination {
    return new Pagination(this.stepPointer+1, this.steps.length);
  }
}
