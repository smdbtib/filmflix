import { MovieTvBase } from './../../models/movie-tv-base';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';

type ApiResponse = { page: number; results: MovieTvBase[] };

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  // VARIABLES
  baseUrl = 'https://api.themoviedb.org/3';
  options = { api_key: 'e21bebb8f8d5aa3fcde964b43ef45d9e', language: 'pt-BR' };

  //CONSTRUCTOR
  constructor(private http: HttpClient) {}

  //METHODS
  trending(): Observable<MovieTvBase[]> {
    return this.http
      .get<ApiResponse>(`${this.baseUrl}/trending/all/week`, {
        params: this.options,
      })
      .pipe(map((data) => data.results));
  }

  search(query: string): Observable<MovieTvBase[]> {
    return this.http
    .get<ApiResponse>(`${this.baseUrl}/search/multi`, {
      params: {
        ...this.options,
        include_adult: false,
        query,
      },
    }).pipe(map((data) => data.results));
  }

  getDetailById( id: number, type: 'movie' | 'tv'): Observable<MovieTvBase>{
    return this.http.get<MovieTvBase>(`${this.baseUrl}/${type}/${id}`, {
      params: this.options,
    });
  }
}
