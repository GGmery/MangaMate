import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBar } from '../search-bar/search-bar';
import { AnimeCard } from '../anime-card/anime-card';
import { AdvancedSearch } from '../advanced-search/advanced-search';
import { JikanService } from '../../services/jikan';
import { Anime, AnimeSearchResponse } from '../../models/anime.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SearchBar, AnimeCard, AdvancedSearch],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  animes: Anime[] = [];
  topAnimes: Anime[] = [];
  currentSeasonAnimes: Anime[] = [];
  upcomingAnimes: Anime[] = [];
  
  loading = false;
  loadingTop = false;
  loadingCurrentSeason = false;
  loadingUpcoming = false;
  
  error: string | null = null;
  showAdvancedSearch = false;
  currentPage = 1;
  hasNextPage = false;
  searchQuery = '';

  constructor(private jikanService: JikanService) {}

  ngOnInit(): void {
    this.loadTopAnimes();
    this.loadCurrentSeasonAnimes();
    this.loadUpcomingAnimes();
  }

  loadTopAnimes(): void {
    this.loadingTop = true;
    this.jikanService.getTopAnimes(25).subscribe({
      next: (response) => {
        this.topAnimes = response.data;
        this.loadingTop = false;
      },
      error: (err) => {
        console.error('Error loading top animes:', err);
        this.loadingTop = false;
      }
    });
  }

  loadCurrentSeasonAnimes(): void {
    this.loadingCurrentSeason = true;
    this.jikanService.getCurrentSeasonAnimes(25).subscribe({
      next: (response) => {
        this.currentSeasonAnimes = response.data;
        this.loadingCurrentSeason = false;
      },
      error: (err) => {
        console.error('Error loading current season animes:', err);
        this.loadingCurrentSeason = false;
      }
    });
  }

  loadUpcomingAnimes(): void {
    this.loadingUpcoming = true;
    this.jikanService.getUpcomingAnimes(25).subscribe({
      next: (response) => {
        this.upcomingAnimes = response.data;
        this.loadingUpcoming = false;
      },
      error: (err) => {
        console.error('Error loading upcoming animes:', err);
        this.loadingUpcoming = false;
      }
    });
  }

  scrollCarousel(elementId: string, direction: 'left' | 'right'): void {
    const carousel = document.getElementById(elementId);
    if (carousel) {
      const scrollAmount = 400;
      const scrollTo = direction === 'left' 
        ? carousel.scrollLeft - scrollAmount 
        : carousel.scrollLeft + scrollAmount;
      carousel.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }

  getAnimeYear(anime: Anime): string {
    if (anime.year) return anime.year.toString();
    if (anime.aired?.from) {
      const year = new Date(anime.aired.from).getFullYear();
      if (!isNaN(year)) return year.toString();
    }
    return '?';
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1;
    this.loadAnimes(query);
  }

  loadAnimes(query: string, page: number = 1): void {
    if (!query.trim()) return;

    this.loading = true;
    this.error = null;

    this.jikanService.searchAnime(query, page).subscribe({
      next: (response: AnimeSearchResponse) => {
        if (page === 1) {
          this.animes = response.data;
        } else {
          this.animes = [...this.animes, ...response.data];
        }
        this.hasNextPage = response.pagination.has_next_page;
        this.currentPage = page;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error searching animes:', err);
        this.error = 'Error al buscar animes. Por favor, intenta de nuevo.';
        this.loading = false;
        this.animes = [];
      }
    });
  }

  onAdvancedSearch(filters: any): void {
    this.loading = true;
    this.error = null;
    this.currentPage = 1;

    this.jikanService.searchAnimeAdvanced({ ...filters, page: 1 }).subscribe({
      next: (response: AnimeSearchResponse) => {
        this.animes = response.data;
        this.hasNextPage = response.pagination.has_next_page;
        this.currentPage = 1;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error in advanced search:', err);
        this.error = 'Error al buscar animes. Por favor, intenta de nuevo.';
        this.loading = false;
        this.animes = [];
      }
    });
  }

  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
    if (this.showAdvancedSearch && this.animes.length === 0) {
      this.animes = [];
    }
  }

  loadMore(): void {
    if (this.hasNextPage && !this.loading) {
      this.loadAnimes(this.searchQuery, this.currentPage + 1);
    }
  }
}