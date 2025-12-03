import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/pages/search/search').then(m => m.Search),
    title: 'AnimeWatch Tracker — Buscar'
  },
  {
    path: 'anime/:id',
    loadComponent: () =>
      import('./features/pages/detail/detail').then(m => m.Detail),
    title: 'AnimeWatch Tracker — Detalle'
  },
  {
    path: 'mi-lista',
    loadComponent: () =>
      import('./features/pages/my-list/my-list').then(m => m.MyList),
    title: 'AnimeWatch Tracker — Mi Lista'
  },
  { path: '**', redirectTo: '' }
];
