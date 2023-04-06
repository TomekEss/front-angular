import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Game, GameService, UserService } from '../../core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameResolver implements Resolve<Game> {
  constructor(
    private gamesService: GameService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.gamesService.get(route.params['slug'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
