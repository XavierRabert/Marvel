import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  concatAll,
  filter,
  map,
  shareReplay,
  toArray,
} from 'rxjs';
import { Character } from '../types/characters';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  private characterSelectedSubject = new BehaviorSubject<Number | undefined>(
    undefined
  );

  readonly characterSelected$ = this.characterSelectedSubject.asObservable();

  readonly characters$ = this.http
    .get<Character[]>('public/characters?limit=50')
    .pipe(
      filter(Boolean),
      map((data: any) => {
        return data.data.results as Character[];
      }),
      concatAll(),
      filter((char) => !char.thumbnail.path.includes('image_not_available')),
      toArray(),
      shareReplay(1)
    );

  readonly character$ = combineLatest([
    this.characters$,
    this.characterSelected$,
  ]).pipe(
    map(([characters, selectedCharacterId]) =>
      characters.find((char: Character) => char.id === selectedCharacterId)
    )
  );

  characterSelected(selectedCharacterId: number): void {
    this.characterSelectedSubject.next(selectedCharacterId);
  }

  //  characterId$
  // getCharacters(): Observable<any> {
  //   return this.http.get('public/characters?limit=50').pipe(
  //     tap((data) => console.log('Http.get getCharacters', data)),
  //     map((data: any) => {
  //       if (data) return data.data.results;
  //       return data;
  //     })
  //   );
  // }

  // getCharDetails(id: string) {
  //   return this.http.get('public/characters/' + id).pipe(
  //     tap((data) => console.log('Http.get getCharacter.id', data)),
  //     map((data: any) => {
  //       if (data) return data.data.results;
  //       return data;
  //     })
  //   );
  // }
}
