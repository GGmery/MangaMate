import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Anime } from '../../models/anime.interface';

@Component({
  selector: 'app-anime-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './anime-card.html',
  styleUrl: './anime-card.css',
})
export class AnimeCard {
  @Input() anime!: Anime;

  getImageUrl(): string {
    return this.anime?.images?.jpg?.large_image_url || this.anime?.images?.jpg?.image_url || '';
  }

  getScore(): string {
    return this.anime?.score ? this.anime.score.toFixed(2) : 'N/A';
  }

  getYear(): string {
    if (this.anime?.year) return this.anime.year.toString();
    if (this.anime?.aired?.from) {
      const year = new Date(this.anime.aired.from).getFullYear();
      if (!isNaN(year)) return year.toString();
    }
    return '?';
  }

  getType(): string {
    return this.anime?.type || 'TV';
  }
}