import { Opinie } from './../models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpinieService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug, payload): Observable<Opinie> {
    return this.apiService
    .post(
      `/games/${slug}/opinie`,
      { opinie: { body: payload } }
    ).pipe(map(data => data.opinie));
  }

  getAll(slug): Observable<Opinie[]> {
    return this.apiService.get(`/games/${slug}/opinie`)
      .pipe(map(data => data.opinie));
  }

  destroy(opinieId, gameSlug) {
    console.log("tutaj");
    return this.apiService
           .delete(`/games/${gameSlug}/opinie/${opinieId}`);
  }

}
