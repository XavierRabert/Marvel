import { Component, inject } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ComicsService } from '../services/comics.service';
import { ComicCardComponent } from './comic-card/comic-card.component';

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [ComicCardComponent],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.css',
})
export class ComicsComponent {
  private comicsService = inject(ComicsService);

  comics = this.comicsService.comics;
  comicsError = this.comicsService.comicsError;
}
