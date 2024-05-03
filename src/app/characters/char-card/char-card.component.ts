import { Component, Input } from '@angular/core';
import { Character } from '../../types/characters';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-char-card',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './char-card.component.html',
  styleUrl: './char-card.component.css',
})
export class CharCardComponent {
  @Input() character!: Character;
}
