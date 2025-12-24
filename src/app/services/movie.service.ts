import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:3000';

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
}

  getMovieById(id: number): Observable<Movie | null> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`)
  }
}