import { Component, inject } from '@angular/core';
import { ComicsService } from '../services/comics.service';
import { ComicCardComponent } from './comic-card/comic-card.component';
import { LoaderComponent } from '../common/loader/loader.component';

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [ComicCardComponent, LoaderComponent],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.css',
})
export class ComicsComponent {
  private comicsService = inject(ComicsService);
  isLoading = this.comicsService.isLoading;

  comics = this.comicsService.comics;
  comicsError = this.comicsService.comicsError;
}
