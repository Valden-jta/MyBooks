import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css']
})
export class FormBookComponent implements OnInit {
  public usuario: string = '';
  public titulo: string = '';
  public autor: string = '';
  public genero: string = '';
  public imagen: string = '';
  public referencia: string = '';
  public format: string[] = [];
  public price: number[] = [];

    // Formulario
    public formBook!: FormGroup;
    public types:{ type: string, price: number }[] = [
      {type:'ebook', price: 0},
      {type:'tapa blanda', price: 0},
      {type:'tapa dura', price: 0}
    ];
    
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }  

  private buildForm()
    {
      this.formBook = this.formBuilder.group({
        usuario: ['', Validators.required],
        titulo: ['', Validators.required],
        autor: ['', Validators.required],
        genero: ['', Validators.required],
        imagen: ['', Validators.required],
        referencia: ['', Validators.required],
        formato: this.formBuilder.array(this.types.map(type => new FormControl(false))),
        precio: this.formBuilder.array(this.types.map(() => new FormControl('', Validators.required)))
      });
    }
    

  ngOnInit(): void {}

  get formato(): FormArray {
    return this.formBook.get('formato') as FormArray;
  }

  get precio(): FormArray {
    return this.formBook.get('precio') as FormArray;
  }

  anyadirLibro(usuario:string, titulo: string, autor: string, genero: string, imagen: string, referencia: string, format: string[], price: any){
usuario = this.formBook.get('user')?.value;
titulo = this.formBook.get('titulo')?.value;
autor = this.formBook.get('autor')?.value;
genero = this.formBook.get('genero')?.value;
imagen = this.formBook.get('imagen')?.value;
referencia = this.formBook.get('referencia')?.value;
format = this.formato.controls.map((control, i) => control.value ? this.types[i].type : '').filter(value => value !== null);
price = this.precio.controls.map(control => control.value);
    console.log(usuario);
    console.log(titulo);
    console.log(autor);
    console.log(genero);
    console.log(imagen);
    console.log(referencia);
    console.log(format);
    console.log(price); 
  }

}
