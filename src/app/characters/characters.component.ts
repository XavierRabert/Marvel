import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters!: any;
  subCharacters!: Subscription;

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.subCharacters = this.charactersService
      .getCharacters()
      .pipe(tap((characters) => console.log(characters)))
      .subscribe((characters) => (this.characters = characters));
  }

  ngOnDestroy(): void {}
}
