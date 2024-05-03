import { Component, inject } from '@angular/core';
import { CharactersService } from '../services/characters.service';

import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { CharCardComponent } from './char-card/char-card.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [AsyncPipe, RouterModule, CharacterComponent, CharCardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent {
  private charactersService = inject(CharactersService);

  characters = this.charactersService.characters;

  onSelected(characterId: number) {
    this.charactersService.characterSelected(characterId);
  }
}
