import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Article } from '../../core';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlePreviewComponent implements OnInit {
  //@Input() abc: first;
  @Input() article: Article;
  imgData: any;

  constructor(private sanitizer: DomSanitizer) {}

  trackByFn(index, item) {
    return index;
  }

  onToggleFavorite(favorited: boolean) {
    this.article['favorited'] = favorited;

    if (favorited) {
      this.article['favoritesCount']++;
    } else {
      this.article['favoritesCount']--;
    }
  }

  ngOnInit() {
   this.imgData = this.article.photo;
  }


}
