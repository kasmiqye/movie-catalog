import { Routes } from '@angular/router';
import { MovieList } from './movie-list/movie-list';
import { MovieDetail } from './movie-detail/movie-detail';

export const routes: Routes = [
    {path: "", component: MovieList},
    {path: "movies/:id", component: MovieDetail}
];
