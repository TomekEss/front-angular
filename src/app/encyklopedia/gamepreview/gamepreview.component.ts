import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Game } from '../../core';

@Component({
  selector: 'app-gamepreview',
  templateUrl: './gamepreview.component.html',
  styleUrls: ['./gamepreview.component.css']
})
export class GamePreviewComponent implements OnInit {
  @Input() game: Game;

  imgGame: any;

  constructor(private sanitizer: DomSanitizer) { }

  trackByFn(index, item) {
    return index;
  }

  ngOnInit(): void {
  this.imgGame = this.game.image;
  }

}
