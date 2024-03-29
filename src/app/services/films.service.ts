import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from './../../environments/environment';
import { Movie, MoviesListingResponse } from '../interfaces/listingMovies-models';
import { Cast, CreditsResponse, MovieDetailsResponse } from '../interfaces/movieDetails-models';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private moviesListingPage = 1;
  public loading: boolean = false;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  get params() {
    return {
      api_key: environment.API_KEY,
      language: this.setLangParam(this.translate.currentLang),
      page: this.moviesListingPage.toString(),
    };
  }

  setLangParam(currentLang: string): string {
    switch (currentLang) {
      case 'en':
        return 'en-US';

      case 'es':
        return 'es-ES';

      default:
        return 'en-US';
    }
  }

  getMoviesListing(): Observable<Movie[]> {
    if (this.loading) {
      return of([]);
    }
    this.loading = true;
    //increment moviesListingPage in each get call (each time you scroll 1200px)
    return this.http
      .get<MoviesListingResponse>(`${this.baseUrl}/discover/movie`, { params: this.params })
      .pipe(
        map((response) => response.results),
        tap(() => {
          this.moviesListingPage += 1;
          this.loading = false;
        })
      );
  }

  searchFilms(text: string): Observable<Movie[]> {
    const params = { ...this.params, page: 1, query: text };

    return this.http
      .get<MoviesListingResponse>(`${this.baseUrl}/search/movie`, { params })
      .pipe(map((response) => response.results));
  }

  getFilmDetails(id: string): Observable<any> {
    return this.http
      .get<MovieDetailsResponse>(`${this.baseUrl}/movie/${id}`, { params: this.params })
      .pipe(catchError((err: any) => of(null)));
  }

  getFilmCasting(id: string): Observable<Cast[]> {
    return this.http
      .get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, { params: this.params })
      .pipe(
        map((response) => response.cast),
        catchError((err: any) => of([]))
      );
  }

  resetFirstPage() {
    this.moviesListingPage = 1;
  }
}
