import { Component } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ComicsService } from '../services/comics.service';

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.css',
})
export class ComicsComponent {
  comics!: any;
  subComics!: Subscription;

  constructor(private comicsService: ComicsService) {}

  ngOnInit(): void {
    this.subComics = this.comicsService
      .getComics()
      .subscribe((comics) => (this.comics = comics));
  }

  ngOnDestroy(): void {
    this.subComics.unsubscribe();
  }
}
