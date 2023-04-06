import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Article, ArticlesService } from '../core';
import { ReadVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
  fileBlob: Blob = null;
  selectedFile: File = null;
  imageBase64: string = null;
  article: Article = {} as Article;
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;
  sanitizer: any;

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);

    this.changeFile(this.selectedFile).then((base64: string): any => {
      this.imageBase64 = base64;
      // this.fileBlob = this.b64Blob([base64], type);
      // console.log(this.fileBlob)
  });
  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

  constructor(
    private http: HttpClient,
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: ''
    });

    // Initialized tagList as empty array
    this.article.tagList = [];
    this.article.image = null;
    // Optional: subscribe to value changes on the form
    // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  ngOnInit() {
    // If there's an article prefetched, load it
    this.route.data.subscribe((data: { article: Article }) => {
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
        this.cd.markForCheck();
      }
    });
  }

  trackByFn(index, item) {
    return index;
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
    // only add tag if it does not exist yet
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateArticle(this.articleForm.value);
    this.updateImage();

    // post the changes
    this.articlesService.save(this.article).subscribe(
      article => {
        this.router.navigateByUrl('/article/' + article.slug);
        this.cd.markForCheck();
      },
      err => {
        console.log('post w component');
        console.log(err);
        this.errors = err;
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    // this.articlesService.save(formData).subscribe(
    );
  }

  updateArticle(values: Object) {
    Object.assign(this.article, values);
  }

  updateImage() {
    this.article.image = this.imageBase64;
  }
}

