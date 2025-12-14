import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Anime, MyAnimeListItem, AnimeStatus } from '../models/anime.interface';

@Injectable({
  providedIn: 'root',
})
export class MyListService {
  private readonly STORAGE_KEY = 'mangamate_my_list';
  private myListSubject = new BehaviorSubject<MyAnimeListItem[]>([]);
  public myList$: Observable<MyAnimeListItem[]> = this.myListSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const list = JSON.parse(stored);
        this.myListSubject.next(list);
      } catch (error) {
        console.error('Error loading list from storage:', error);
        this.myListSubject.next([]);
      }
    }
  }

  private saveToStorage(list: MyAnimeListItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    this.myListSubject.next(list);
  }

  addAnime(anime: Anime, status: AnimeStatus = 'Pendiente'): void {
    const currentList = this.myListSubject.value;
    
    // Verificar si el anime ya existe
    if (currentList.some(item => item.anime.mal_id === anime.mal_id)) {
      this.updateAnimeStatus(anime.mal_id, status);
      return;
    }

    const newItem: MyAnimeListItem = {
      anime,
      status,
      isFavorite: false,
      addedAt: new Date().toISOString()
    };

    const updatedList = [...currentList, newItem];
    this.saveToStorage(updatedList);
  }

  removeAnime(animeId: number): void {
    const currentList = this.myListSubject.value;
    const updatedList = currentList.filter(item => item.anime.mal_id !== animeId);
    this.saveToStorage(updatedList);
  }

  updateAnimeStatus(animeId: number, status: AnimeStatus): void {
    const currentList = this.myListSubject.value;
    const updatedList = currentList.map(item => 
      item.anime.mal_id === animeId ? { ...item, status } : item
    );
    this.saveToStorage(updatedList);
  }

  toggleFavorite(animeId: number): void {
    const currentList = this.myListSubject.value;
    const updatedList = currentList.map(item => 
      item.anime.mal_id === animeId ? { ...item, isFavorite: !item.isFavorite } : item
    );
    this.saveToStorage(updatedList);
  }

  updatePersonalScore(animeId: number, score: number): void {
    const currentList = this.myListSubject.value;
    const updatedList = currentList.map(item => 
      item.anime.mal_id === animeId ? { ...item, personalScore: score } : item
    );
    this.saveToStorage(updatedList);
  }

  getAnimeStatus(animeId: number): MyAnimeListItem | null {
    const currentList = this.myListSubject.value;
    return currentList.find(item => item.anime.mal_id === animeId) || null;
  }

  isInList(animeId: number): boolean {
    return this.getAnimeStatus(animeId) !== null;
  }

  getList(): MyAnimeListItem[] {
    return this.myListSubject.value;
  }

  getListByStatus(status: AnimeStatus | 'Favoritos'): MyAnimeListItem[] {
    const list = this.myListSubject.value;
    if (status === 'Favoritos') {
      return list.filter(item => item.isFavorite);
    }
    return list.filter(item => item.status === status);
  }

  clearList(): void {
    this.saveToStorage([]);
  }
}