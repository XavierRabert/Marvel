import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { concatAll, filter, map, shareReplay, take, tap, toArray } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Comic } from '../types/comics';
import { Result } from '../types/generic';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  constructor(private http: HttpClient) {}

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
}
