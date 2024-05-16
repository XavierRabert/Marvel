import { Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { SeriesComponent } from './series/series.component';
import { ComicsComponent } from './comics/comics.component';
import { CharacterDetailComponent } from './characters/character-detail/character-detail.component';

export const routes: Routes = [
  {
    path: 'characters',
    component: CharactersComponent,
  },
  {
    path: 'character/:id',
    component: CharacterDetailComponent,
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
