import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor(private http: HttpClient) { }

  sort(algorithm: string, unsortedArr: number[]): Observable<any> {
    return this.http.post(BASE_URL + "/" + algorithm, unsortedArr);
  }

}
