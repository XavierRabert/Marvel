import { Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { SeriesComponent } from './series/series.component';
import { ComicsComponent } from './comics/comics.component';
import { CharacterComponent } from './characters/character/character.component';

export const routes: Routes = [
  {
    path: 'characters',
    component: CharactersComponent,
  },
  {
    path: 'character/:id',
    component: CharacterComponent,
  },
  {
    path: 'series',
    component: SeriesComponent,
  },
  {
    path: 'comics',
    component: ComicsComponent,
  },
];
