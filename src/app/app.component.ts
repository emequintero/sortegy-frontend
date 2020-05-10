import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { DependenciesService } from './services/dependencies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  mediaSubscription:Subscription;
  unitClass:string;
  constructor(public mediaObserver:MediaObserver, private dependenciesService:DependenciesService){}
  ngOnInit(){
    this.mediaSubscription = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      switch(result.mqAlias){
        case "lg":{
          this.dependenciesService.setResponsiveBars(1);
          break;
        }
        case "md":{
          this.dependenciesService.setResponsiveBars(1.25);
          break;
        }
        case "sm":{
          this.dependenciesService.setResponsiveBars(1.7);
          break;
        }
        case "xs":{
          this.dependenciesService.setResponsiveBars(1.7);
          break;
        }
      }
    });
  }
  ngOnDestroy(){
    this.mediaSubscription.unsubscribe();
  }
 }
