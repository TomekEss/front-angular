import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game,
        GameService,
        Opinie,
        OpinieService,
        User,
        UserService,
        Vote,
        VoteService,
 } from '../../core';

@Component({
  selector: 'app-gamedetail',
  templateUrl: './gamedetail.component.html',
  styleUrls: ['./gamedetail.component.css']
})
export class GamedetailComponent implements OnInit {
  urllink: string;
  videoURL: any;
  game: Game;
  currentUser: User;
  canModify: boolean;
  opinie: Opinie[];
  vote: Vote[];
  opinieControl = new FormControl();
  voteForm: FormGroup;
  opinieFormErrors = {};
  voteFormErrors = {};
  isSubmitting = false;
  isVote = false;
  isDeleting = false;
  imgData: any;

  ratings = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" }
  ];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private opinieService: OpinieService,
    private voteService: VoteService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private fb:FormBuilder
  ) { }

  ngOnInit() {

    this.voteForm = this.fb.group({
      rating: [null]
    });

    this.route.data.subscribe(
      (data: { game: Game}) => {
        this.game = data.game;
        this.imgData = this.game.image;
        this.populateOpinie();
        this.cd.markForCheck();
      }
    );

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = ( this.currentUser.username === this.game.author.username );
        this.cd.markForCheck();
      }
    );

    this.urllink = this.game.link.replace("watch?v=", "embed/");
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.urllink);

  }

  trackByFn(index, item) {
    return index;
  }

  deleteGame() {
    this.isDeleting = true;

    this.gameService.destroy(this.game.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

  populateOpinie() {
    this.opinieService.getAll(this.game.slug)
      .subscribe(opinie => {
        this.opinie = opinie;
       this.cd.markForCheck();
      });
 }

  addOpinie() {
    this.isSubmitting = true;
    this.opinieFormErrors = {};

    const opinieBody = this.opinieControl.value;
    this.opinieService
      .add(this.game.slug, opinieBody)
      .subscribe(
        opinie => {
          this.opinie.unshift(opinie);
          this.opinieControl.reset('');
          this.isSubmitting = false;
          this.cd.markForCheck();
        },
        errors => {
          this.isSubmitting = false;
          this.opinieFormErrors = errors;
          this.cd.markForCheck();
        }
      );
  }

  onDeleteOpinie(opinie) {
    this.opinieService.destroy(opinie.id, this.game.slug)
      .subscribe(
        success => {
          this.opinie = this.opinie.filter((item) => item !== opinie);
          this.cd.markForCheck();
        }
      );
  }

  addVote() {
    this.isVote = true;
    //this.opinieFormErrors = {};

    // const voteBody = this.voteForm.value;

    this.voteService
      .add(this.game.slug, this.voteForm.value)
      .subscribe(
        vote => {
          this.vote.unshift(vote);
          this.voteForm.reset('');
          this.isVote = false;
          this.cd.markForCheck();
        },
        errors => {
          this.isVote = false;
          this.voteFormErrors = errors;
          this.cd.markForCheck();
        }
      );
  }
}
