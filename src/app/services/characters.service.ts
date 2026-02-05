import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import {
  catchError,
  concatAll,
  filter,
  map,
  Observable,
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
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private _generalService = inject(GeneralService);

  constructor(private http: HttpClient) {}

  readonly characterSelectedId = signal(0);
  readonly isLoading = signal(true);

  readonly characters$: Observable<Result<Character[]>> = this.http
    .get<any>('public/characters?limit=100')
    .pipe(
      tap(() => {
        this._generalService.setApiDeprecated(false);
        this.isLoading.set(true);
      }),
      catchError((error) => {
        console.warn('❌ Marvel API error:', error);
        console.warn('📁 Loading local data...');
        this._generalService.setApiDeprecated(true);
        return this.http.get<Character[]>('assets/mock/characters.json').pipe(
          catchError(() => {
            return of([] as Character[]);
          }),
        );
      }),
      map((data: any) => data.data.results as Character[]),
      concatAll(),
      toArray(),
      shareReplay(1),
      map((data: Character[]): Result<Character[]> => {
        this.isLoading.set(false);
        return { data };
      }),
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
          } as Result<Character>),
        ),
      );
    }),
  );

  private characterResult = toSignal(this.characterResult$);

  character = computed(() => this.characterResult()?.data);
  characterError = computed(() => this.characterResult()?.error);

  selectCharacter(selectedCharacterId: number): void {
    this.characterSelectedId.set(selectedCharacterId);
  }
}
