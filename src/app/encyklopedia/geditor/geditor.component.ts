import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, GameService } from '../../core';

@Component({
  selector: 'app-geditor',
  templateUrl: './geditor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class GeditorComponent implements OnInit {
  selectedFile: File = null;
  imageBase64: string = null;
  game: Game = {} as Game;
  gameForm: FormGroup;
  kategorieField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);

    this.changeFile(this.selectedFile).then((base64: string): any => {
    this.imageBase64 = base64;
  });}

  changeFile(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private GameService: GameService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.gameForm = this.fb.group({
      name: '',
      typ: '',
      link: '',
      opis: '',
      body: '',
      premiera: '',
      ram: '',
      procesorintel: '',
      procesoramd: '',
      grafikanvidia: '',
      grafikaamd: '',
    })
    this.game.image = null;
    this.game.kategorieList = [];
   }

  ngOnInit(): void {
    this.route.data.subscribe((data: { game: Game }) => {
      if (data.game) {
        this.game = data.game;
        this.gameForm.patchValue(data.game);
        this.cd.markForCheck();
      }
    });
  }

  trackByFn(index, item) {
    return index;
  }

  addKategorie() {
    // retrieve kategorie control
    const kategorie = this.kategorieField.value;
    // only add kategorie if it does not exist yet
    if (this.game.kategorieList.indexOf(kategorie) < 0) {
      this.game.kategorieList.push(kategorie);
    }
    // clear the input
    this.kategorieField.reset('');
  }

  removeKategorie(kategorieName: string) {
    this.game.kategorieList = this.game.kategorieList.filter(kategorie => kategorie !== kategorieName);
  }

  submitForm() {
    this.isSubmitting = true;

    //update the model
    this.updateGame(this.gameForm.value);

    //post the change
    console.log('próba wysłania');
    this.GameService.save(this.game).subscribe(
      game => {
        this.router.navigateByUrl('/game/' + game.slug);
        this.cd.markForCheck();
      },
      err => {
        console.log(err);
        this.errors = err;
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }

  updateGame(values: Object) {
    this.game.image = this.imageBase64;
    Object.assign(this.game, values);
  }

}
