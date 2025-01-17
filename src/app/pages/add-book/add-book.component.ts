import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  public books: Book[] = [];
  public book!: Book;
  public addedBook!: Book;
  public ref:number;

  public formBook!: FormGroup;
  public types: { type: string; price: number }[] = [
    { type: 'ebook', price: 0 },
    { type: 'tapa blanda', price: 0 },
    { type: 'tapa dura', price: 0 },
  ];

  constructor(private formBuilder: FormBuilder,
              public booksService: BooksService,
              private router: Router,
              private toastr:ToastrService) {
   this.buildForm();
   this.ref = this.setReference(); 
  }

  private buildForm() {
    this.formBook = this.formBuilder.group({
      usuario: ['', Validators.required],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      genero: ['', Validators.required],
      imagen: ['', Validators.required],
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
    this.books = this.booksService.getAll();
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

  setReference(): number {
    return this.booksService.getAll().length + 1;
    
     
  }

  anyadirLibro() {
    let usuario = this.formBook.get('usuario')?.value;
    let titulo = this.formBook.get('titulo')?.value;
    let autor = this.formBook.get('autor')?.value;
    let genero = this.formBook.get('genero')?.value;
    let imagen = this.formBook.get('imagen')?.value;
    let referencia = this.setReference(); // Obtén el próximo ID de referencia de manera automática
    let format = this.formato.controls
      .map((control, i) => (control.value ? this.types[i].type : ''))
      .filter((value) => value !== null);
    let price = this.precio.controls
      .map((control, i) => (this.formato.at(i).value ? control.value : ''))
      .filter((value) => value !== null);

    let newBook = new Book (
      referencia,
      parseInt(usuario),
      titulo,
      format.filter((valor) => valor !== ''),
      genero,
      autor,
      price.filter((valor) => valor !== '').map(Number), // Asegúrate de que price es un array de números
      imagen,
      0
    );

    this.booksService.add(newBook);
    this.addedBook = newBook; // Mantén una referencia al último libro añadido
    this.toastr.success(`Libro añadido: ${titulo}`, '¡Exito!'); // notificación toastr
    this.books = this.booksService.getAll(); // Actualiza la lista de libros
    this.ref = this.setReference(); // Actualiza la referencia después de añadir un libro
  }

  eliminarLibro(book: Book): void {
    const index = this.books.indexOf(book);
    if (index > -1) {
      this.books.splice(index, 1);
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