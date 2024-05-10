import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Serie } from '../types/series';
import { concatAll, filter, map, shareReplay, take, tap, toArray } from 'rxjs';
import { Result } from '../types/generic';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  constructor(private http: HttpClient) {}

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
}
