import { Vote } from './../models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug, payload): Observable<Vote> {
    return this.apiService
    .post(
      `/games/${slug}/vote`,
      { rating: payload }
      //{ vote: { vote: payload } }
    ).pipe(map(data => data.vote));

  }

  getAll(slug): Observable<Vote[]> {
    return this.apiService.get(`/games/${slug}/vote`)
      .pipe(map(data => data.vote));
  }

  destroy(voteId, gameSlug) {
    console.log("tutaj");
    return this.apiService
           .delete(`/games/${gameSlug}/vote/${voteId}`);
  }

}
