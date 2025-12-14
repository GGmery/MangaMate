import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Anime,
  AnimeSearchResponse,
  EpisodesResponse,
  ReviewsResponse
} from '../models/anime.interface';

@Injectable({
  providedIn: 'root',
})
export class JikanService {
  private readonly baseUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) {}

  searchAnime(query: string, page: number = 1): Observable<AnimeSearchResponse> {
    let params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('limit', '20');

    return this.http.get<AnimeSearchResponse>(`${this.baseUrl}/anime`, { params });
  }

  searchAnimeAdvanced(filters: {
    q?: string;
    type?: string;
    status?: string;
    rating?: string;
    order_by?: string;
    sort?: string;
    page?: number;
  }): Observable<AnimeSearchResponse> {
    let params = new HttpParams().set('limit', '20');

    if (filters.q) params = params.set('q', filters.q);
    if (filters.type) params = params.set('type', filters.type);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.rating) params = params.set('rating', filters.rating);
    if (filters.order_by) params = params.set('order_by', filters.order_by);
    if (filters.sort) params = params.set('sort', filters.sort);
    if (filters.page) params = params.set('page', filters.page.toString());

    return this.http.get<AnimeSearchResponse>(`${this.baseUrl}/anime`, { params });
  }

  getAnimeById(id: number): Observable<{ data: Anime }> {
    return this.http.get<{ data: Anime }>(`${this.baseUrl}/anime/${id}`);
  }

  getAnimeEpisodes(id: number, page: number = 1): Observable<EpisodesResponse> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<EpisodesResponse>(`${this.baseUrl}/anime/${id}/episodes`, { params });
  }

  getAnimeReviews(id: number, page: number = 1): Observable<ReviewsResponse> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<ReviewsResponse>(`${this.baseUrl}/anime/${id}/reviews`, { params });
  }

  getRandomAnime(): Observable<{ data: Anime }> {
    return this.http.get<{ data: Anime }>(`${this.baseUrl}/random/anime`);
  }

  getTopAnimes(limit: number = 25): Observable<AnimeSearchResponse> {
    const params = new HttpParams()
      .set('order_by', 'score')
      .set('sort', 'desc')
      .set('limit', limit.toString());
    return this.http.get<AnimeSearchResponse>(`${this.baseUrl}/anime`, { params });
  }

  getCurrentSeasonAnimes(limit: number = 25): Observable<AnimeSearchResponse> {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    let season = 'winter';
    
    if (month >= 3 && month <= 5) season = 'spring';
    else if (month >= 6 && month <= 8) season = 'summer';
    else if (month >= 9 && month <= 11) season = 'fall';
    
    const params = new HttpParams()
      .set('year', year.toString())
      .set('season', season)
      .set('status', 'airing')
      .set('limit', limit.toString())
      .set('order_by', 'popularity')
      .set('sort', 'desc');
    
    return this.http.get<AnimeSearchResponse>(`${this.baseUrl}/anime`, { params });
  }

  getUpcomingAnimes(limit: number = 25): Observable<AnimeSearchResponse> {
    const params = new HttpParams()
      .set('status', 'upcoming')
      .set('limit', limit.toString())
      .set('order_by', 'popularity')
      .set('sort', 'desc');
    
    return this.http.get<AnimeSearchResponse>(`${this.baseUrl}/anime`, { params });
  }
}