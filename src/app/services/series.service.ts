import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Serie } from '../types/series';
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
import { Result } from '../types/generic';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  constructor(private http: HttpClient) {}

  readonly serieSelectedId = signal(0);
  readonly isLoading = signal(true);

  readonly series$ = this.http.get<Serie[]>('public/series?limit=100').pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    map((data: any) => {
      return data.data.results as Serie[];
    }),
    concatAll(),
    filter((serie) => !serie.thumbnail.path.includes('image_not_available')),
    toArray(),
    take(50),
    shareReplay(1),
    map((data: Serie[]) => {
      this.isLoading.set(false);
      return { data: data } as Result<Serie[]>;
    })
  );

  private seriesResult = toSignal(this.series$, {
    initialValue: { data: [] } as Result<Serie[]>,
  });

  series = computed(() => this.seriesResult().data);
  seriesError = computed(() => this.seriesResult().error);

  private serieResult$ = toObservable(this.serieSelectedId).pipe(
    filter(Boolean),
    switchMap((id) => {
      return this.http.get<Serie>('public/series/' + id).pipe(
        tap(() => this.isLoading.set(true)),
        filter(Boolean),
        map((data: any) => {
          return data.data.results as Serie[];
        }),
        shareReplay(1),
        map((data: Serie[]) => {
          this.isLoading.set(false);
          return { data: data[0] } as Result<Serie>;
        }),
        catchError((err) =>
          of({
            data: undefined,
            error: err,
          } as Result<Serie>)
        )
      );
    })
  );

  private serieResult = toSignal(this.serieResult$);

  serie = computed(() => this.serieResult()?.data);
  serieError = computed(() => this.serieResult()?.error);

  selectSerie(selectedSerieId: number): void {
    this.serieSelectedId.set(selectedSerieId);
  }
}
