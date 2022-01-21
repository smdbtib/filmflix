import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  baseUrl = 'https://api.themoviedb.org/3/';

  options = {
    api_key: 'e21bebb8f8d5aa3fcde964b43ef45d9e',
    language: 'pt-BR'
  }
  constructor() { }
}
