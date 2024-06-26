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
  tap,
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
  readonly isLoading = signal(true);

  readonly characters$ = this.http
    .get<Character[]>('public/characters?limit=100')
    .pipe(
      tap(() => this.isLoading.set(true)),
      filter(Boolean),
      map((data: any) => {
        return data.data.results as Character[];
      }),
      concatAll(),
      filter((char) => !char.thumbnail.path.includes('image_not_available')),
      toArray(),
      take(50),
      shareReplay(1),
      map((data: Character[]) => {
        this.isLoading.set(false);
        return { data: data } as Result<Character[]>;
      })
    );

  private charactersResult = toSignal(this.characters$, {
    initialValue: { data: [] } as Result<Character[]>,
  });

  characters = computed(() => this.charactersResult().data);
  charactersError = computed(() => this.charactersResult()?.error);

  private characterResult$ = toObservable(this.characterSelectedId).pipe(
    filter(Boolean),
    switchMap((id) => {
      return this.http.get<Character>('public/characters/' + id).pipe(
        tap(() => this.isLoading.set(true)),
        filter(Boolean),
        map((data: any) => {
          return data.data.results as Character[];
        }),
        shareReplay(1),
        map((data: Character[]) => {
          this.isLoading.set(false);
          return { data: data[0] } as Result<Character>;
        }),
        catchError((err) =>
          of({
            data: undefined,
            error: err,
          } as Result<Character>)
        )
      );
    })
  );

  private characterResult = toSignal(this.characterResult$);

  character = computed(() => this.characterResult()?.data);
  characterError = computed(() => this.characterResult()?.error);

  selectCharacter(selectedCharacterId: number): void {
    this.characterSelectedId.set(selectedCharacterId);
  }
}
