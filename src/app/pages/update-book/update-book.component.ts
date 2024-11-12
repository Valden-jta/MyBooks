import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  public books: Book[] = [];
  public formBook!: FormGroup;
  public types: { type: string; price: number }[] = [
    { type: 'ebook', price: 0 },
    { type: 'tapa blanda', price: 0 },
    { type: 'tapa dura', price: 0 },
  ];

  constructor(
    private formBuilder: FormBuilder,
    public booksService: BooksService,
    private router: Router
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.formBook = this.formBuilder.group({
      usuario: ['', Validators.required],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      genero: ['', Validators.required],
      imagen: ['', Validators.required],
      referencia: ['', Validators.required],
      formato: this.formBuilder.array(
        this.types.map((type) => new FormControl(false))
      ),
      precio: this.formBuilder.array(
        this.types.map(
          () =>
            new FormControl({ value: '', disabled: true }, Validators.required)
        )
      ),
    });
  }

  ngOnInit(): void {
    this.booksService.getAll();
  }

  get formato(): FormArray {
    return this.formBook.get('formato') as FormArray;
  }

  get precio(): FormArray {
    return this.formBook.get('precio') as FormArray;
  }

  togglePriceControl(index: number): void {
    const formatoControl = this.formato.at(index);
    const precioControl = this.precio.at(index);
    if (formatoControl.value) {
      precioControl.enable();
    } else {
      precioControl.disable();
    }
  }

  editarLibro(): void {
    let usuario = this.formBook.get('usuario')?.value;
    let titulo = this.formBook.get('titulo')?.value;
    let autor = this.formBook.get('autor')?.value;
    let genero = this.formBook.get('genero')?.value;
    let imagen = this.formBook.get('imagen')?.value;
    let referencia = this.formBook.get('referencia')?.value;
    let format = this.formato.controls
      .map((control, i) => (control.value ? this.types[i].type : ''))
      .filter((value) => value !== null);
    let price = this.precio.controls
      .map((control, i) => (this.formato.at(i).value ? control.value : ''))
      .filter((value) => value !== null);

    let updatedBook: Book = new Book(
      parseInt(referencia),
      parseInt(usuario),
      titulo,
      format,
      genero,
      autor,
      price,
      imagen,
      0
    );

    if(this.booksService.edit(updatedBook)) { 
      this.targetBook(referencia);
    }
  }

  targetBook(id: number): void {
    this.router.navigate(['/books']).then(() => {
      setTimeout(() => {
        let card = document.querySelector('#card_' + id);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    });
  }
}
