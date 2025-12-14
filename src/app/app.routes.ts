import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.Home)
  },
  {
    path: 'match',
    loadComponent: () => import('./components/match/match').then(m => m.Match)
  },
  {
    path: 'anime/:id',
    loadComponent: () => import('./components/anime-detail/anime-detail').then(m => m.AnimeDetail)
  },
  {
    path: 'mi-lista',
    loadComponent: () => import('./components/my-list/my-list').then(m => m.MyList)
  },
  {
    path: '**',
    redirectTo: ''
  }
];