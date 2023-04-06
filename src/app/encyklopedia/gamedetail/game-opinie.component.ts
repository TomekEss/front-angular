import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Opinie, User, UserService } from '../../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-opinie',
  templateUrl: './game-opinie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOpinieComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  private subscription: Subscription;

  @Input() opinie: Opinie;
  @Output() deleteOpinie = new EventEmitter<boolean>();

  canModify: boolean;

  ngOnInit() {
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.opinie.author.username || userData.username === "admin");
        this.cd.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteOpinie.emit(true);
  }


}
