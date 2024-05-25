import { Component, inject } from '@angular/core';
import { ComicsService } from '../../services/comics.service';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../common/loader/loader.component';

@Component({
  selector: 'app-comic-detail',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './comic-detail.component.html',
  styleUrl: './comic-detail.component.css',
})
export class ComicDetailComponent {
  private comicService = inject(ComicsService);

  comicDetail = this.comicService.comic;
  isLoading = this.comicService.isLoading;
}
