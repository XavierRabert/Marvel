import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import {
  BehaviorSubject,
  EMPTY,
  Subscription,
  catchError,
  combineLatest,
  tap,
} from 'rxjs';
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
  errorMessage = '';

  private charactersService = inject(CharactersService);

  readonly characters$ = this.charactersService.characters$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  onSelected(characterId: number) {
    console.log('Selected ID:', characterId);
    this.charactersService.characterSelected(characterId);
  }
}
