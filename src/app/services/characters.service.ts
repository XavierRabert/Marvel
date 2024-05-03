import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import {
  catchError,
  concatAll,
  filter,
  map,
  of,
  shareReplay,
  switchMap,
  take,
  toArray,
} from 'rxjs';
import { Character } from '../types/characters';
import { Result } from '../types/generic';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  readonly characterSelectedId = signal(0);

  readonly characters$ = this.http
    .get<Character[]>('public/characters?limit=100')
    .pipe(
      filter(Boolean),
      map((data: any) => {
        return data.data.results as Character[];
      }),
      concatAll(),
      filter((char) => !char.thumbnail.path.includes('image_not_available')),
      toArray(),
      take(50),
      shareReplay(1),
      map((data: Character[]) => ({ data: data } as Result<Character[]>))
    );

  private charactersResult = toSignal(this.characters$, {
    initialValue: { data: [] } as Result<Character[]>,
  });

  characters = computed(() => this.charactersResult().data);
  charactersError = computed(() => this.charactersResult().error);

  private characterResult$ = toObservable(this.characterSelectedId).pipe(
    filter(Boolean),
    switchMap((id) => {
      return this.http.get<Character>('public/comics/' + id).pipe(
        catchError((err) =>
          of({
            data: undefined,
            error: err,
          } as Result<Character>)
        )
      );
    }),
    map((data) => ({ data: data } as Result<Character>))
  );

  private characterResult = toSignal(this.characterResult$);

  character = computed(() => this.characterResult()?.data);
  characterError = computed(() => this.characterResult()?.error);

  characterSelected(selectedCharacterId: number): void {
    this.characterSelectedId.set(selectedCharacterId);
  }
}
