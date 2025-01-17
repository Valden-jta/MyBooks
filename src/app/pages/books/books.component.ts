import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BooksService } from '../../shared/books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {

  public books: Book[];

  //* Filtro
  public bookList: Book[];


  constructor(public booksService: BooksService, private toastr: ToastrService) {
    this.books = this.booksService.getAll();
    this.bookList = this.books;
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
    this.booksService.delete(book.id_book);
  }

  //* Filtro
  filtrar(id: number): void {
    let filteredBook = this.booksService.getOne(id);
    this.bookList = filteredBook ? [filteredBook] : this.bookList;
    if (!filteredBook) {
      this.toastr.error('El libro que buscas no está.','Busca de nuevo!',);
    }
  }

  reset(): void {
    this.bookList = this.books;
  }
}
