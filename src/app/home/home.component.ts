import { MovieTvBase } from './../core/models/movie-tv-base';
import { TmdbApiService } from './../core/services/tmdb-api/tmdb-api.service';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  // VARIABLES
  trending$!: Observable<MovieTvBase[]>; // Observável
  results$?: Observable<MovieTvBase[]>;

  @ViewChild('searchInput') searchInput!: ElementRef;

  // CONSTRUCTOR
  constructor(
    private tmdbApi: TmdbApiService,

  ) { }

  // METHODS
  ngOnInit(): void {
    this.trending$ = this.tmdbApi.trending();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      filter(Boolean), // Eliminar arquivos nulos, vazios valores falses (falsy value (0, vazio, undefined, null))
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
       const query = this.searchInput.nativeElement.value;
       if (query) {
        this.results$ = this.tmdbApi.search(query);
       } else {
        this.results$  = undefined;
       }
      })
    )
    .subscribe();
  }
}
