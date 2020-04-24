import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BASE_URL} from '../../environments/environment';
import { Bar } from '../models/bar';
 
@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor(private http: HttpClient) { }

  quickSort(unsortedArr: number[]):Observable<any>{
    return this.http.post(BASE_URL, unsortedArr);
  }

}
