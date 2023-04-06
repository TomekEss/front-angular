import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Game, GameService, UserService } from '../../core';
import { catchError ,  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditableGameResolver implements Resolve<Game> {
  constructor(
    private gameService: GameService,
    private router: Router,
    private userService: UserService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.gameService.get(route.params['slug'])
      .pipe(
        map(
          game => {
            if (this.userService.getCurrentUser().username === game.author.username) {
              return game;
            } else {
              this.router.navigateByUrl('/');
            }
          }
        ),
        catchError((err) => this.router.navigateByUrl('/'))
      );
  }
}
