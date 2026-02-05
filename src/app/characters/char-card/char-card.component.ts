import { Component, computed, inject, input, signal } from '@angular/core';
import { Character } from '../../types/characters';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Router, RouterLink } from '@angular/router';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-char-card',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './char-card.component.html',
  styleUrl: './char-card.component.css',
})
export class CharCardComponent {
  public character = input.required<Character>();

  private characterService = inject(CharactersService);
  private router = inject(Router);

  public imgError = signal<boolean>(false);
  public imgUrl = computed<string>(() => {
    if (this.imgError()) {
      return `${this.character().thumbnail.path}/standard_fantastic.${this.character().thumbnail.extension}`;
    } else {
      return 'assets/img/characters/placeholder.webp';
    }
  });

  public onClickViewDetail(characterId: number) {
    this.characterService.selectCharacter(characterId);
    this.router.navigate(['/character/' + characterId]);
  }

  public onImgError() {
    this.imgError.set(true);
  }
}
