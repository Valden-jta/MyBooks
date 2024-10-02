import { Component, OnInit } from '@angular/core';
import { BooksComponent } from '../../pages/books/books.component'
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent implements OnInit{

    constructor() {
  
    }

    ngOnInit(): void {
        
    }

    // TODO: la funcionalidad la hago más adelante

  // Filtrar libros por autor/genero/formato
}


