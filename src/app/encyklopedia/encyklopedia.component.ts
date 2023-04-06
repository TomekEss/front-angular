import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GameListConfig, KategorieService, UserService } from '../core';

@Component({
  selector: 'app-encyklopedia',
  templateUrl: './encyklopedia.component.html',
  styleUrls: ['./encyklopedia.component.css']

})
export class EncyklopediaComponent implements OnInit {

  constructor(
    private router: Router,
    private kategorieService: KategorieService,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

    @Output() newSearchCriteria = new EventEmitter<string>();

  isAuthenticated: boolean;
  listConfig: GameListConfig = {
    type: 'all',
    filters: {}
  };
  kategorie: Array<string> = [];
  kategorieLoaded = false;
  searchCriteria: string;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('all');
        } else {
          this.setListTo('all');
        }
        this.cd.markForCheck();
      }
    );
      this.kategorieService.getAll()
      .subscribe(kategorie => {
      this.kategorie = kategorie;
      this.kategorieLoaded = true;
      this.cd.markForCheck();
    });


  }

  trackByFn(index, item) {
    return index;
  }

  setListTo(type: string = '', filters: Object = {}) {

    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
    console.log(this.listConfig);
  }

  search() {
    console.log('search for: ' + this.searchCriteria);
    this.newSearchCriteria.emit(this.searchCriteria);
  }

  searchCriteriaChanged(newValue) {
    this.searchCriteria = newValue;
  }
}
