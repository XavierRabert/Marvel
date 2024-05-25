import { Component, Input, inject } from '@angular/core';
import { Comic } from '../../types/comics';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { ComicsService } from '../../services/comics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic-card',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './comic-card.component.html',
  styleUrl: './comic-card.component.css',
})
export class ComicCardComponent {
  @Input() comic!: Comic;

  private comicService = inject(ComicsService);
  private router = inject(Router);

  onClickViewDetail(comicId: number) {
    this.comicService.selectComic(comicId);
    this.router.navigate(['/comic/' + comicId]);
  }
}
