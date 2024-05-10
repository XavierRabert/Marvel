import { Component, Input } from '@angular/core';
import { Serie } from '../../types/series';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-serie-card',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './serie-card.component.html',
  styleUrl: './serie-card.component.css',
})
export class SerieCardComponent {
  @Input() serie!: Serie;
}
