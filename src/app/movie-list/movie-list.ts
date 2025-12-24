import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../models/movie.model';
import { Observable, BehaviorSubject, combineLatest, map, catchError, of, tap } from 'rxjs';

type MovieListStatus = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})

export class MovieList implements OnInit {
  status: MovieListStatus = 'loading';
  filteredMovies$: Observable<Movie[] | null> | undefined;

  private  searchQuery$ = new BehaviorSubject<string>('');

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    const movies$ = this.movieService.getAllMovies().pipe(
      tap(() => {
        this.status = 'success'
      }),
      
      catchError(() => {
        this.status = 'error';
        return of([]);
      })
    )

    this.filteredMovies$ = combineLatest([
      movies$,
      this.searchQuery$
    ]).pipe(
      map(([movies, query]) => {
        if(!query) return movies;
      
        return movies.filter(movie =>
          movie.title.toLowerCase().includes(query)
        )
      })
    )
  }

  searchQueryChanged(value: string): void {
    this.searchQuery$.next(value.trim().toLowerCase().replace(/\s+/g, ' '));
  }
}