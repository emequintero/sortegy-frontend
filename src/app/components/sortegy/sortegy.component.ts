import { Component, OnInit } from '@angular/core';
import { Animation } from 'src/app/models/animation';
import { Bar } from '../../models/bar';
import { MdcDialog } from "@angular-mdc/web";
import { TutorialDialogComponent, DialogData } from '../tutorial-dialog/tutorial-dialog.component';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Step } from '../../models/step';
import { Pagination } from 'src/app/models/pagination';

/**
 * MAIN DISPLAY
 */
@Component({
  selector: 'app-sortegy',
  templateUrl: './sortegy.component.html',
  styleUrls: ['./sortegy.component.css']
})
export class SortegyComponent implements OnInit {
  title = 'sortegy';
  array: Bar[] = [];
  animations: Animation[] = [];
  arrLen: number = 25;
  sortSpeed: number = 10;
  view: string = "bars";
  constructor(private dialogService: MdcDialog, private tutorialService: TutorialService) { }

  ngOnInit(): void {
    let currentStep:Step = this.tutorialService.peek();
    let pagination:Pagination = this.tutorialService.getPagination();
    this.dialogService.open(TutorialDialogComponent, {
      data: {
        title: currentStep.title,
        subtitle: currentStep.subtitle,
        content: currentStep.content,
        image: currentStep.image,
        pagination: {
          current: pagination.current,
          length: pagination.length
        }
      } as DialogData,
      clickOutsideToClose: false,
      autoFocus: false
    });
  }

}
