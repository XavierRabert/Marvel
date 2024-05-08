import { Component, inject, signal } from '@angular/core';
import { CharactersService } from '../services/characters.service';

import { RouterModule } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { CharCardComponent } from './char-card/char-card.component';
import { LoaderComponent } from '../common/loader/loader.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    RouterModule,
    CharacterComponent,
    CharCardComponent,
    LoaderComponent,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent {
  private charactersService = inject(CharactersService);

  characters = this.charactersService.characters;
  isLoading = this.charactersService.isLoading;

  onSelected(characterId: number) {
    this.charactersService.characterSelected(characterId);
  }
}
