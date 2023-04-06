import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';


import { Article, ArticleListConfig, ArticlesService } from '../../core';
@Component({
  selector: 'app-article-list',
  styleUrls: ['article-list.component.css'],
  templateUrl: './article-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {
  constructor (
    private articlesService: ArticlesService,
    private cd: ChangeDetectorRef
  ) {}
  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery(null);
    }
  }

  @Input() set newSearchCriteria(filter: string) {
    console.log(filter);
    this.runQuery(filter);
  }

  query: ArticleListConfig;
  results: Article[];
  loading = false;
  ike : any;
  ikee : any;
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

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = 999;//this.limit;
      this.query.filters.offset =  0;//(this.limit * (this.currentPage - 1));
    }

    this.articlesService.query(this.query)
    .subscribe(data => {
      this.loading = false;

      console.log(data.articles.filter((g) => { return g.titl.includes(filter); }));

      if (filter) {
        data.articles = data.articles.filter((g) => { return g.titl.includes(filter); });
      }

      this.results = data.articles.slice((this.currentPage - 1) * this.limit, this.currentPage * this.limit);


      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil((data.articlesCount) / this.limit)), (val, index) => index + 1);
      this.cd.markForCheck();
      this.ike = data.articlesCount;
      this.ikee = data.art;
    });
  }
}
