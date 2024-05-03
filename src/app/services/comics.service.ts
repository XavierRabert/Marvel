import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  constructor(private http: HttpClient) {}

  getComics(): Observable<any> {
    return this.http.get('public/comics?limit=50').pipe(
      tap((data) => console.log('Http.get getComics', data)),
      map((data: any) => {
        if (data) return data.data.results;
        return data;
      })
    );
  }
}
