import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/theme/theme';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  theme: 'light' | 'dark' = 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.theme = this.themeService.current;
    this.themeService.set(this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.themeService.set(this.theme);
  }
}
