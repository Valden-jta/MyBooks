import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BooksService } from '../../shared/books.service';
import { ApiAnswer } from 'src/app/models/api-answer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {

  //* Filtro
  public bookList: Book[] = [];


  constructor(public booksService: BooksService, private toastr: ToastrService) {
    this.booksService.books = null;
  }

  ngOnInit(): void {
      this.reset();
  }

  scroll(sectionId: string): void {
    let element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //* Comunicación hijo-padre
  borrarLibro(book: Book) {
    this.booksService.delete(book.id_book).subscribe((res: ApiAnswer) => {
      if(!res.error) {
        this.booksService.books = res.data;
        this.reset();
        this.toastr.success(res.message,'', {timeOut: 2000, positionClass: 'toast-top-right'});
      } else {
        this.toastr.error(res.message,'',{timeOut: 2000, positionClass: 'toast-top-right'});
      }
    });
  }

  //* Filtro
  filtrar(id: number): void {
    this.booksService.getOne(id).subscribe((res:ApiAnswer) =>{
      if (!res.error) {
        this.bookList = res.data;
        console.log(this.bookList);
      } else {
        this.toastr.error(res.message,'',{timeOut: 2000, positionClass: 'toast-top-right'});
      }
    });

  }

  reset(): void {
    this.booksService.getAll().subscribe((res: ApiAnswer)=> {
      if(!res.error) {
        this.booksService.books = res.data;
        this.bookList = this.booksService.books
        console.log('lista importada correctamente');
      } else {
        this.toastr.error(res.message,'',{timeOut: 2000, positionClass: 'toast-top-right'});
      }
     });
  }
}
