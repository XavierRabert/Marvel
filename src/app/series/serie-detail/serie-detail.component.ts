import { Component, inject } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { LoaderComponent } from '../../common/loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-serie-detail',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './serie-detail.component.html',
  styleUrl: './serie-detail.component.css',
})
export class SerieDetailComponent {
  private serieService = inject(SeriesService);

  serieDetail = this.serieService.serie;
  isLoading = this.serieService.isLoading;
}
