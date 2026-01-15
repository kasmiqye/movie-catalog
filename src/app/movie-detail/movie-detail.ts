import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { Movie } from '../models/movie.model';
import { CommonModule } from '@angular/common';
import { catchError, map, Observable, of, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

type MovieDetailStatus = 'error' | 'success' | 'not-found' | 'loading';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css', 
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MovieDetail {
  movie$!: Observable<Movie | null>;
  status$ = new BehaviorSubject<MovieDetailStatus>('loading');

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const idFromUrl = Number(this.route.snapshot.paramMap.get('id'));
    
    this.movie$ = this.movieService.getMovieById(idFromUrl).pipe(
      map( movie => {
        if(!movie) {
          this.status$.next('not-found');
          return null;
        }
        this.status$.next('success');
        return movie;
      }),

      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.status$.next('not-found');
        } else {
          this.status$.next('error');
        }

        return of(null)
      })
    )
  }
  
  goBack() {
    this.router.navigate(['/']);
  }

}