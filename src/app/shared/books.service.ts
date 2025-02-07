import { Injectable, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { ApiAnswer } from '../models/api-answer';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService implements OnInit {

  public books: Book[] | null;
  private url = "http://localhost:3000/books"

  constructor(private toastr: ToastrService, private http: HttpClient) { 
    this.books = null;
  }

  getAll(): Observable<ApiAnswer> {
    return this.http.get<ApiAnswer>(this.url);
  }
  getOne(id:number): Observable<ApiAnswer> {
    return this.http.get<ApiAnswer>(`${this.url}?id=${id}`);
  }

  add(newBook: Book):Observable<ApiAnswer> {
    return this.http.post<ApiAnswer>(this.url, newBook);
  }

  edit(editedBook:Book): Observable<ApiAnswer> {
    console.log(editedBook);
    return this.http.put<ApiAnswer>(this.url, editedBook);
  }

  delete(id:number): Observable<ApiAnswer> {
    return this.http.delete<ApiAnswer>(`${this.url}?id=${id}`);;
  }

  ngOnInit(): void {
      
  }
}
