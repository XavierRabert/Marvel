import { Component, Input } from '@angular/core';
import { Comic } from '../../types/comics';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-comic-card',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './comic-card.component.html',
  styleUrl: './comic-card.component.css',
})
export class ComicCardComponent {
  @Input() comic!: Comic;
}
