import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { User } from '../../models/user';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css'],
})
export class FormBookComponent implements OnInit {

  public formBook!: FormGroup;
  public types: { type: string; price: number }[] = [
    { type: 'ebook', price: 0 },
    { type: 'tapa blanda', price: 0 },
    { type: 'tapa dura', price: 0 },
  ];

  //? Clase Book
  // newBook.id_book = newBook_id_book;
  // newBook.id_user = newBook_id_user;
  // newBook.title = newBook_title;
  // newBook.type = newBook_type;
  // newBook.genre = newBook_genre;
  // newBook.author = newBook_author;
  // newBook.price = newBook_price;
  // newBook.photo = newBook_picture;
  // this.books.push(newBook);

  public newBook: Book = new Book(0, 0, '', [], '', '', [], '', 0);

  constructor(private formBuilder: FormBuilder) {
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

  ngOnInit(): void {}

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

  anyadirLibro() {
    // asignar los valores del formulario
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

    // asignar los valores al objeto book
    this.newBook.id_book = parseInt(referencia);
    this.newBook.id_user = parseInt(usuario);
    this.newBook.title = titulo;
    this.newBook.type = format.filter((valor) => valor !== '');
    this.newBook.genre = genero;
    this.newBook.author = autor;
    this.newBook.price = price.filter((valor) => valor !== '');
    this.newBook.photo = imagen;

    // Importar el libro al array books
    console.log(this.newBook);
  }

  importarLibro(arrayBooks: Book[], newBook: Book) {
    arrayBooks.push(this.newBook);
  }
}
