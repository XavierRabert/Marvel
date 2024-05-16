import { Component, Input, inject } from '@angular/core';
import { Character } from '../../types/characters';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Router, RouterLink } from '@angular/router';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-char-card',
  standalone: true,
  imports: [TruncatePipe, RouterLink],
  templateUrl: './char-card.component.html',
  styleUrl: './char-card.component.css',
})
export class CharCardComponent {
  @Input() character!: Character;

  private characterService = inject(CharactersService);
  private router = inject(Router);

  onClickViewDetail(characterId: number) {
    this.characterService.selectCharacter(characterId);
    this.router.navigate(['/character/' + characterId]);
  }
}
