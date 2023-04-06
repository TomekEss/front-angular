import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game, GameListConfig } from '../models';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private ApiService: ApiService,
  ){}

  query(config: GameListConfig): Observable<{game: Game[], gameCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
      .forEach((key) => {
        params[key] = config.filters[key];
      });

    return this.ApiService
    .get(
      '/games' + ((config.type === 'feed') ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  get(slug): Observable<Game> {
    return this.ApiService.get('/games/' + slug)
      .pipe(map(data => data.game));
  }

  destroy(slug) {
    return this.ApiService.delete('/games/' + slug);
  }

  save(game): Observable<Game> {
    if (game.slug) {
      return this.ApiService.put('/games/' + game.slug, {game: game})
        .pipe(map(data => data.game));

       // Otherwise, create a new article
    } else {
    return this.ApiService.post('/games', {game: game})
      .pipe(map(data => data.game));
  }
}
}
