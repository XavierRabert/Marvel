import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get('public/characters').pipe(
      tap((data) => console.log('Http.get getCharacters', data)),
      map((data: any) => {
        if (data) return data.data.results;
        return data;
      })
    );
  }
}
