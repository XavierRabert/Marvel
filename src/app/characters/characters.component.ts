import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CharactersService } from '../services/characters.service';

import { RouterModule } from '@angular/router';
import { CharCardComponent } from './char-card/char-card.component';
import { LoaderComponent } from '../common/loader/loader.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [RouterModule, CharCardComponent, LoaderComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent {
  private charactersService = inject(CharactersService);

  characters = this.charactersService.characters;
  isLoading = this.charactersService.isLoading;
}
