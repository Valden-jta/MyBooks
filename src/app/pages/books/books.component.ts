import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  //Select
  public books: Book[];
  public selectedFormat: number;
  public selectedPrice: number;
  public selectedBook: number;

  //* Filtro
  public bookList: Book[];
  public authorSet: string[];
  public selectAuthor: string;
  public genreSet: string[];
  public selectGenre: string;
  public formatSet: string[];
  public selectFormat: string;
  // -------------


  constructor(private formBuilder: FormBuilder) {
    this.selectedBook = 0;
    this.selectedFormat = 0;
    this.selectedPrice = 0;

    //*  Filtro
    this.bookList = this.books;
    this.authorSet = [
      'Todos',
      ...new Set(this.books.map((book) => book.author)),
    ];
    this.selectAuthor = 'Todos';
    this.genreSet = ['Todos', ...new Set(this.books.map((book) => book.genre))];
    this.selectGenre = 'Todos';
    this.formatSet = ['Todos', 'ebook', 'tapa blanda', 'tapa dura'];
    this.selectFormat = 'Todos';
  }


  ngOnInit(): void {}


  scroll(sectionId: string): void {
    let element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //* Comunicación hijo-padre
  borrarLibro(book: Book) {
    let singleBook = this.books.indexOf(book);
    this.books.splice(singleBook, 1);
  } 

  //* Filtro
  filtrar(author: string, genre: string, type: string): Book[] {
    this.bookList = this.books;
    return (this.bookList = this.books.filter(
      (book: Book) =>
        (book.author == author || author == 'Todos' || author == '') &&
        (book.genre == genre || genre == 'Todos' || genre == '') &&
        (book.type.includes(type) || type == 'Todos' || type == '')
    ));
  }

  reset(): void {
    this.bookList = this.books;
  }
  // -------------
}
