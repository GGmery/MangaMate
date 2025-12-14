import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JikanService } from '../../services/jikan';
import { MyListService } from '../../services/my-list';
import { Anime } from '../../models/anime.interface';

@Component({
  selector: 'app-match',
  imports: [CommonModule, RouterLink],
  templateUrl: './match.html',
  styleUrl: './match.css',
})
export class Match implements OnInit {
  currentAnime: Anime | null = null;
  loading = false;
  error: string | null = null;
  
  swipeStartX = 0;
  swipeStartY = 0;
  swipeCurrentX = 0;
  swipeCurrentY = 0;
  isDragging = false;
  cardTransform = '';
  cardOpacity = 1;
  swipeDirection: 'left' | 'right' | null = null;

  likedCount = 0;
  passedCount = 0;

  constructor(
    private jikanService: JikanService,
    private myListService: MyListService
  ) {}

  ngOnInit(): void {
    this.loadRandomAnime();
  }

  loadRandomAnime(): void {
    this.loading = true;
    this.error = null;
    this.resetCard();

    this.jikanService.getRandomAnime().subscribe({
      next: (response) => {
        this.currentAnime = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading random anime:', err);
        this.error = 'Error al cargar anime. Intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  likeAnime(): void {
    if (!this.currentAnime) return;

    this.swipeDirection = 'right';
    this.cardTransform = 'translateX(150%) rotate(30deg)';
    this.cardOpacity = 0;

    this.myListService.addAnime(this.currentAnime, 'Pendiente');
    this.likedCount++;

    setTimeout(() => {
      this.loadRandomAnime();
    }, 300);
  }

  passAnime(): void {
    if (!this.currentAnime) return;

    this.swipeDirection = 'left';
    this.cardTransform = 'translateX(-150%) rotate(-30deg)';
    this.cardOpacity = 0;

    this.passedCount++;

    setTimeout(() => {
      this.loadRandomAnime();
    }, 300);
  }

  resetCard(): void {
    this.cardTransform = '';
    this.cardOpacity = 1;
    this.swipeDirection = null;
    this.isDragging = false;
    this.swipeStartX = 0;
    this.swipeStartY = 0;
    this.swipeCurrentX = 0;
    this.swipeCurrentY = 0;
  }

  onTouchStart(event: TouchEvent): void {
    if (!this.currentAnime || this.loading) return;
    this.isDragging = true;
    this.swipeStartX = event.touches[0].clientX;
    this.swipeStartY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging || !this.currentAnime) return;
    this.swipeCurrentX = event.touches[0].clientX;
    this.swipeCurrentY = event.touches[0].clientY;
    
    const deltaX = this.swipeCurrentX - this.swipeStartX;
    const deltaY = Math.abs(this.swipeCurrentY - this.swipeStartY);

    if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 10) {
      const rotation = deltaX * 0.1;
      this.cardTransform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
      this.cardOpacity = 1 - Math.abs(deltaX) / 300;
      
      if (deltaX > 50) {
        this.swipeDirection = 'right';
      } else if (deltaX < -50) {
        this.swipeDirection = 'left';
      } else {
        this.swipeDirection = null;
      }
    }
  }

  onTouchEnd(): void {
    if (!this.isDragging || !this.currentAnime) return;
    this.isDragging = false;

    const deltaX = this.swipeCurrentX - this.swipeStartX;
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.likeAnime();
      } else {
        this.passAnime();
      }
    } else {
      this.resetCard();
    }
  }

  onMouseDown(event: MouseEvent): void {
    if (!this.currentAnime || this.loading) return;
    this.isDragging = true;
    this.swipeStartX = event.clientX;
    this.swipeStartY = event.clientY;
    event.preventDefault();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging || !this.currentAnime) return;
    this.swipeCurrentX = event.clientX;
    this.swipeCurrentY = event.clientY;
    
    const deltaX = this.swipeCurrentX - this.swipeStartX;
    const deltaY = Math.abs(this.swipeCurrentY - this.swipeStartY);

    if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 10) {
      const rotation = deltaX * 0.1;
      this.cardTransform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
      this.cardOpacity = 1 - Math.abs(deltaX) / 300;
      
      if (deltaX > 50) {
        this.swipeDirection = 'right';
      } else if (deltaX < -50) {
        this.swipeDirection = 'left';
      } else {
        this.swipeDirection = null;
      }
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    if (!this.isDragging || !this.currentAnime) return;
    this.isDragging = false;

    const deltaX = this.swipeCurrentX - this.swipeStartX;
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.likeAnime();
      } else {
        this.passAnime();
      }
    } else {
      this.resetCard();
    }
  }

  getImageUrl(): string {
    return this.currentAnime?.images?.jpg?.large_image_url || this.currentAnime?.images?.jpg?.image_url || '';
  }

  getScore(): string {
    return this.currentAnime?.score ? this.currentAnime.score.toFixed(1) : 'N/A';
  }
}