import { Component, inject } from '@angular/core';
import { SeriesService } from '../services/series.service';
import { LoaderComponent } from '../common/loader/loader.component';
import { SerieCardComponent } from './serie-card/serie-card.component';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [LoaderComponent, SerieCardComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css',
})
export class SeriesComponent {
  private seriesService = inject(SeriesService);
  isLoading = this.seriesService.isLoading;

  series = this.seriesService.series;
  seriesError = this.seriesService.seriesError;
}
