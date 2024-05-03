import { Component, inject } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent {
  private characterService = inject(CharactersService);
  characterDetail = this.characterService.character;
}
