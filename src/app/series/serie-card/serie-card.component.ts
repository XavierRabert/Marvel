import { Component, Input, inject } from '@angular/core';
import { Serie } from '../../types/series';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-serie-card',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './serie-card.component.html',
  styleUrl: './serie-card.component.css',
})
export class SerieCardComponent {
  @Input() serie!: Serie;

  private serieService = inject(SeriesService);
  private router = inject(Router);

  onClickViewDetail(serieId: number) {
    this.serieService.selectSerie(serieId);
    this.router.navigate(['/serie/' + serieId]);
  }
}
