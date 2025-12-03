// src/app/core/theme.service.ts
import { Injectable } from '@angular/core';

const THEME_KEY = 'mangamate.theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  get current(): 'light' | 'dark' {
    return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light';
  }

  set(theme: 'light' | 'dark') {
    localStorage.setItem(THEME_KEY, theme);
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }
}
