import { Component, inject } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { EMPTY, catchError, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent {
  errorMessage = '';

  private characterService = inject(CharactersService);

  readonly characterDetail$ = this.characterService.character$.pipe(
    tap((char) => console.log('Character Detail:', char)),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
}
