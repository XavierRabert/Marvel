import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../common/loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [AsyncPipe, LoaderComponent, RouterLink],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetailComponent {
  private characterService = inject(CharactersService);
  isLoading = this.characterService.isLoading;

  characterDetail = this.characterService.character;
}
