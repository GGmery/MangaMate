import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JikanService } from '../../services/jikan';
import { MyListService } from '../../services/my-list';
import { Anime, Episode, Review, AnimeStatus, MyAnimeListItem } from '../../models/anime.interface';

@Component({
  selector: 'app-anime-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './anime-detail.html',
  styleUrl: './anime-detail.css',
})
export class AnimeDetail implements OnInit {
  anime: Anime | null = null;
  episodes: Episode[] = [];
  reviews: Review[] = [];
  loading = false;
  loadingEpisodes = false;
  loadingReviews = false;
  error: string | null = null;
  animeId: number = 0;
  myAnimeItem: MyAnimeListItem | null = null;
  showEpisodes = false;
  showReviews = false;
  selectedStatus: AnimeStatus = 'Pendiente';
  personalScore: number = 0;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private jikanService: JikanService,
    private myListService: MyListService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.animeId = +params['id'];
      this.loadAnime();
      this.checkMyList();
    });

    this.myListService.myList$.subscribe(() => {
      this.checkMyList();
    });
  }

  loadAnime(): void {
    this.loading = true;
    this.error = null;

    this.jikanService.getAnimeById(this.animeId).subscribe({
      next: (response) => {
        this.anime = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading anime:', err);
        this.error = 'Error al cargar el anime. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  checkMyList(): void {
    this.myAnimeItem = this.myListService.getAnimeStatus(this.animeId);
    if (this.myAnimeItem) {
      this.selectedStatus = this.myAnimeItem.status;
      this.personalScore = this.myAnimeItem.personalScore || 0;
      this.isFavorite = this.myAnimeItem.isFavorite;
    } else {
      this.selectedStatus = 'Pendiente';
      this.personalScore = 0;
      this.isFavorite = false;
    }
  }

  loadEpisodes(): void {
    if (this.episodes.length > 0) {
      this.showEpisodes = !this.showEpisodes;
      return;
    }

    this.loadingEpisodes = true;
    this.jikanService.getAnimeEpisodes(this.animeId, 1).subscribe({
      next: (response) => {
        this.episodes = response.data;
        this.showEpisodes = true;
        this.loadingEpisodes = false;
      },
      error: (err) => {
        console.error('Error loading episodes:', err);
        this.loadingEpisodes = false;
      }
    });
  }

  loadReviews(): void {
    if (this.reviews.length > 0) {
      this.showReviews = !this.showReviews;
      return;
    }

    this.loadingReviews = true;
    this.jikanService.getAnimeReviews(this.animeId, 1).subscribe({
      next: (response) => {
        this.reviews = response.data;
        this.showReviews = true;
        this.loadingReviews = false;
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.loadingReviews = false;
      }
    });
  }

  addToMyList(): void {
    if (!this.anime) return;

    if (this.myAnimeItem) {
      this.myListService.updateAnimeStatus(this.animeId, this.selectedStatus);
    } else {
      this.myListService.addAnime(this.anime, this.selectedStatus);
    }

    if (this.personalScore > 0) {
      this.myListService.updatePersonalScore(this.animeId, this.personalScore);
    }
  }

  removeFromMyList(): void {
    this.myListService.removeAnime(this.animeId);
    this.selectedStatus = 'Pendiente';
    this.personalScore = 0;
    this.isFavorite = false;
  }

  toggleFavorite(): void {
    if (!this.myAnimeItem) {
      if (this.anime) {
        this.myListService.addAnime(this.anime, this.selectedStatus);
      }
    }
    this.myListService.toggleFavorite(this.animeId);
  }

  updatePersonalScore(score: number): void {
    this.personalScore = score;
    if (this.myAnimeItem) {
      this.myListService.updatePersonalScore(this.animeId, score);
    }
  }

  getImageUrl(): string {
    return this.anime?.images?.jpg?.large_image_url || this.anime?.images?.jpg?.image_url || '';
  }

  getScore(): string {
    return this.anime?.score ? this.anime.score.toFixed(1) : 'N/A';
  }

  getStatusClass(): string {
    switch (this.anime?.status?.toLowerCase()) {
      case 'currently airing':
      case 'airing':
        return 'status-airing';
      case 'finished airing':
      case 'complete':
        return 'status-complete';
      case 'not yet aired':
      case 'upcoming':
        return 'status-upcoming';
      default:
        return '';
    }
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES');
  }

  getStudios(): string {
    if (!this.anime?.studios || this.anime.studios.length === 0) return 'N/A';
    return this.anime.studios.map(s => s.name).join(', ');
  }

  getProducers(): string {
    if (!this.anime?.producers || this.anime.producers.length === 0) return 'N/A';
    return this.anime.producers.map(p => p.name).join(', ');
  }

  getGenres(): string {
    if (!this.anime?.genres || this.anime.genres.length === 0) return 'N/A';
    return this.anime.genres.map(g => g.name).join(', ');
  }
}