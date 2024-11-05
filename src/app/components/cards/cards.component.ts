import { Component, OnInit, Input, Output } from '@angular/core';
import { Book } from '../../models/book';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
 
  // Comunicación entre componentes  
  @Input() bookListPadre!: Book[];
  @Output() eliminarLibro = new EventEmitter<Book>();

  constructor() { 
    
  }

  ngOnInit(): void {

  }

  //* Funionalidad para seleccionar el formato y el precio del libro
  seleccionaFormato(format: string, book: Book): void {
    book.selected = parseInt(format);
  }

  mostrarPrecio(book: Book): number {
    return book.price[book.selected];
  }

//* Funcionalidad para eliminar un libro (comunicación hijo-padre) 
  eliminar(book: Book): void {
    this.eliminarLibro.emit(book);
  }
}
