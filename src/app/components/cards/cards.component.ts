import { Component, OnInit, Input, Output } from '@angular/core';
import { Book } from '../../models/book';
import { EventEmitter } from '@angular/core';
import { BooksService} from '../../shared/books.service'


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
 
  // Comunicación entre componentes  

  @Input() bookListPadre!: Book[];
  @Input() addedBook!: Book;
  @Output() eliminarLibro = new EventEmitter<Book>();

  constructor(public booksService: BooksService) { 

  }

  ngOnInit(): void {
    this.bookListPadre.forEach(book => {
      if (book.selected === undefined || book.selected === null) {
        book.selected = 0; // Establece un valor predeterminado para selected
      }
    });
  }

  //* Funionalidad para seleccionar el formato y el precio del libro
  seleccionaFormato(format: string, book: Book): void {
    book.selected = parseInt(format);
  }

  mostrarPrecio(book: Book): number {
    if (book.selected !== undefined && book.price && book.price.length > book.selected) {
      return book.price[book.selected];
    }
    return 0; 
  }

//* Funcionalidad para eliminar un libro (comunicación hijo-padre) 
  eliminar(book: Book): void {
    this.eliminarLibro.emit(book);
  }
}
