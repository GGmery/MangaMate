import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MyListService } from '../../services/my-list';
import { MyAnimeListItem, AnimeStatus } from '../../models/anime.interface';
import { AnimeCard } from '../anime-card/anime-card';

@Component({
  selector: 'app-my-list',
  imports: [CommonModule, RouterLink, AnimeCard],
  templateUrl: './my-list.html',
  styleUrl: './my-list.css',
})
export class MyList implements OnInit {
  allItems: MyAnimeListItem[] = [];
  filteredItems: MyAnimeListItem[] = [];
  activeTab: AnimeStatus | 'Favoritos' | 'Todos' = 'Todos';
  loading = false;

  constructor(private myListService: MyListService) {}

  ngOnInit(): void {
    this.loadList();
    this.myListService.myList$.subscribe(() => {
      this.loadList();
    });
  }

  loadList(): void {
    this.loading = true;
    this.allItems = this.myListService.getList();
    this.filterList();
    this.loading = false;
  }

  filterList(): void {
    if (this.activeTab === 'Todos') {
      this.filteredItems = this.allItems;
    } else {
      this.filteredItems = this.myListService.getListByStatus(this.activeTab);
    }
  }

  setActiveTab(tab: AnimeStatus | 'Favoritos' | 'Todos'): void {
    this.activeTab = tab;
    this.filterList();
  }

  removeAnime(animeId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este anime de tu lista?')) {
      this.myListService.removeAnime(animeId);
    }
  }

  toggleFavorite(animeId: number): void {
    this.myListService.toggleFavorite(animeId);
  }

  getTabCount(tab: AnimeStatus | 'Favoritos'): number {
    if (tab === 'Favoritos') {
      return this.myListService.getListByStatus('Favoritos').length;
    }
    return this.myListService.getListByStatus(tab).length;
  }

  getTotalCount(): number {
    return this.allItems.length;
  }
}