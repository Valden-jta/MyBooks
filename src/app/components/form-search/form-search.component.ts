import { Component, OnInit } from '@angular/core';
import { BooksComponent } from '../../pages/books/books.component';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css'],
})
export class FormSearchComponent implements OnInit {
  // public authorSet: string[];
  // public selectAuthor: string;
  // public genreSet: string[];
  // public SelectGenre: string;
  // public formatSet: string[];
  // public SelectFormat: string;

  constructor() {
    // this.authorSet = ['Todos',
    //   ...new Set(this.books.map((book: Book) => book.author)),
    // ];
    // this.selectAuthor = 'Todos';
    // this.genreSet = ['Todos', ...new Set(this.books.map((book) => book.genre))];
    // this.SelectGenre = 'Todos';
    // this.formatSet = ['Todos', 'ebook', 'tapa blanda', 'tapa dura'];
    // this.SelectFormat = 'Todos';
  }

  ngOnInit(): void {}

  // filtrar(author: string, genre: string, type: string) {
  //   console.log(author);
  //   console.log(genre);
  //   console.log(type);
  // }
  // Filtrar libros por autor/genero/formato
}
