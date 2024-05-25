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
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Comic } from '../types/comics';
import { Result } from '../types/generic';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  constructor(private http: HttpClient) {}

  readonly comicSelectedId = signal(0);
  readonly isLoading = signal(true);

  readonly comics$ = this.http.get<Comic[]>('public/comics?limit=100').pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    map((data: any) => {
      return data.data.results as Comic[];
    }),
    concatAll(),
    filter((comic) => !comic.thumbnail.path.includes('image_not_available')),
    toArray(),
    take(50),
    shareReplay(1),
    map((data: Comic[]) => {
      this.isLoading.set(false);
      return { data: data } as Result<Comic[]>;
    })
  );

  private comicsResult = toSignal(this.comics$, {
    initialValue: { data: [] } as Result<Comic[]>,
  });

  comics = computed(() => this.comicsResult().data);
  comicsError = computed(() => this.comicsResult().error);

  private comicResult$ = toObservable(this.comicSelectedId).pipe(
    filter(Boolean),
    switchMap((id) => {
      return this.http.get<Comic>('public/comics/' + id).pipe(
        tap(() => this.isLoading.set(true)),
        filter(Boolean),
        map((data: any) => {
          return data.data.results as Comic[];
        }),
        shareReplay(1),
        map((data: Comic[]) => {
          this.isLoading.set(false);
          return { data: data[0] } as Result<Comic>;
        }),
        catchError((err) =>
          of({
            data: undefined,
            error: err,
          } as Result<Comic>)
        )
      );
    })
  );

  private comicResult = toSignal(this.comicResult$);

  comic = computed(() => this.comicResult()?.data);
  comicError = computed(() => this.comicResult()?.error);

  selectComic(selectedComicId: number): void {
    this.comicSelectedId.set(selectedComicId);
  }
}
