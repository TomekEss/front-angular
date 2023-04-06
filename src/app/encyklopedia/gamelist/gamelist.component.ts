import { Component, OnInit, ChangeDetectorRef, Input, SimpleChange } from '@angular/core';
import { Subject } from 'rxjs';
import { GameListConfig, Game, GameService } from '../../core';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css'],
})
export class GameListComponent {

  constructor(
    private GameService: GameService,
    private cd: ChangeDetectorRef
  ) {
  }

  @Input() limit: number;
  @Input()
  set config(config: GameListConfig){
    if(config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery(null);
    }
  }
  @Input() set newSearchCriteria(filter: string) {
    this.runQuery(filter);
  }


  query: GameListConfig;
  results: Game[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery(null);
  }

  trackByFn(index, item) {
    return index;
  }

  runQuery(filter: string | null) {
    this.loading = true;
    this.results = [];

    if (this.limit) {
      this.query.filters.limit = 999;
      this.query.filters.offset = 0;
    }

    this.GameService
      .query(this.query)
      .subscribe(data => {
        this.loading = false;

        // if (this.query.filters.kategorie) {
        //   data.game = data.game.filter((g) => { return g.name.includes(filter); });
        // }

        if (filter) {
          data.game = data.game.filter((g) => { return g.name.includes(filter); });
        }

        this.results = data.game.slice((this.currentPage - 1) * this.limit, this.currentPage * this.limit);

        this.totalPages = Array.from(new Array(Math.ceil((data.gameCount) / this.limit)), (val, index) => index + 1);
        this.cd.markForCheck();
    })

  }

}
