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

  //* Formulario
  public formBook!: FormGroup;
  public types: { type: string; price: number }[] = [
    { type: 'ebook', price: 0 },
    { type: 'tapa blanda', price: 0 },
    { type: 'tapa dura', price: 0 },
  ];
  public newBook: Book = new Book(0, 0, '', [], '', '', [], '', 0);
  // -------------

  /*
  TODO: Cuando separe los componentes, el constructor debe quedar así
constructor() {
    this.selectedBook = 0;
    this.selectedFormat = 0;
    this.selectedPrice = 0;

    this.books = [..]
  */

  constructor(private formBuilder: FormBuilder) {
    this.selectedBook = 0;
    this.selectedFormat = 0;
    this.selectedPrice = 0;
    this.books = [
      new Book(
        1,
        1,
        'Fundación',
        ['ebook', 'tapa dura'],
        'ciencia ficción',
        'Isaac Asimov',
        [15.99, 25.99],
        'https://www.baobablibros.es/imagenes_grandes/9788497/978849759924.GIF'
      ),
      new Book(
        2,
        1,
        'Yo, Robot',
        ['ebook', 'tapa blanda'],
        'ciencia ficción',
        'Isaac Asimov',
        [12.99, 22.99],
        'https://m.media-amazon.com/images/I/71DquplUL-L._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        3,
        1,
        'Los propios dioses',
        ['ebook', 'tapa dura'],
        'ciencia ficción',
        'Isaac Asimov',
        [14.99, 24.99],
        'https://m.media-amazon.com/images/I/71GGALG6zjL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        4,
        1,
        'Las bóvedas de acero',
        ['ebook', 'tapa blanda'],
        'ciencia ficción',
        'Isaac Asimov',
        [13.99, 23.99],
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ce17JycrBv3wB_fPBFSvJTzf28NSrHJ2tQ&s'
      ),
      new Book(
        5,
        1,
        'El sol desnudo',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'ciencia ficción',
        'Isaac Asimov',
        [13.99, 19.99, 23.99],
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKSgv5kuuYF42D_6G6JwBXGF_FoWLflDRkbg&s'
      ),
      new Book(
        6,
        2,
        'Reina Roja',
        ['ebook', 'tapa dura'],
        'policiaco',
        'Juan Gómez-Jurado',
        [19.99, 29.99],
        'https://m.media-amazon.com/images/I/71GC9IBeQjL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        7,
        2,
        'Loba Negra',
        ['ebook', 'tapa blanda'],
        'policiaco',
        'Juan Gómez-Jurado',
        [18.99, 28.99],
        'https://imagessl7.casadellibro.com/a/l/s5/97/9788466666497.webp'
      ),
      new Book(
        8,
        2,
        'Rey Blanco',
        ['ebook', 'tapa dura'],
        'policiaco',
        'Juan Gómez-Jurado',
        [20.99, 30.99],
        'https://imagessl5.casadellibro.com/a/l/s5/45/9788466668545.webp'
      ),
      new Book(
        9,
        2,
        'Cicatriz',
        ['ebook', 'tapa blanda'],
        'policiaco',
        'Juan Gómez-Jurado',
        [17.99, 27.99],
        'https://m.media-amazon.com/images/I/718JlYPHi9L._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        10,
        2,
        'El Paciente',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'policiaco',
        'Juan Gómez-Jurado',
        [16.99, 22.99, 26.99],
        'https://m.media-amazon.com/images/I/61E4a1a-HlL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        11,
        3,
        'El Hobbit',
        ['ebook', 'tapa dura'],
        'fantasía',
        'J.R.R. Tolkien',
        [14.99, 24.99],
        'https://m.media-amazon.com/images/I/81aYpbH9opS._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        12,
        3,
        'La Comunidad del Anillo',
        ['ebook', 'tapa dura'],
        'fantasía',
        'J.R.R. Tolkien',
        [15.99, 25.99],
        'https://quelibroleo.com/images/libros/libro_1322009582.jpg'
      ),
      new Book(
        13,
        3,
        'Las Dos Torres',
        ['ebook', 'tapa dura'],
        'fantasía',
        'J.R.R. Tolkien',
        [16.99, 26.99],
        'https://m.media-amazon.com/images/I/91sKjSJabqL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        14,
        3,
        'El Retorno del Rey',
        ['ebook', 'tapa dura'],
        'fantasía',
        'J.R.R. Tolkien',
        [17.99, 27.99],
        'https://m.media-amazon.com/images/I/91SI8FEoMuL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        15,
        3,
        'El Silmarillion',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'fantasía',
        'J.R.R. Tolkien',
        [18.99, 24.99, 28.99],
        'https://m.media-amazon.com/images/I/91j7JtU5SjL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        16,
        4,
        'Un mago de Terramar',
        ['ebook', 'tapa dura'],
        'fantasía',
        'Ursula K. Le Guin',
        [15.99, 25.99],
        'https://images.librotea.com/uploads/media/2024/02/29/historias-de-terramar-i.jpeg'
      ),
      new Book(
        17,
        4,
        'La mano izquierda de la oscuridad',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'ciencia ficción',
        'Ursula K. Le Guin',
        [16.99, 22.99, 26.99],
        'https://www.planetadelibros.com/usuaris/libros/fotos/320/original/portada_la-mano-izquierda-de-la-oscuridad_ursula-k-le-guin_202006041508.jpg'
      ),
      new Book(
        18,
        4,
        'Los desposeídos',
        ['ebook', 'tapa dura'],
        'ciencia ficción',
        'Ursula K. Le Guin',
        [17.99, 27.99],
        'https://www.planetadelibros.com/usuaris/libros/fotos/320/original/portada_los-desposeidos_ursula-k-le-guin_202007201548.jpg'
      ),
      new Book(
        19,
        4,
        'Las tumbas de Atuan',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'fantasía',
        'Ursula K. Le Guin',
        [15.99, 21.99, 25.99],
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnwAoie1-8RRslB3RCp5wm1yDTAB5eLr4FZ6aOcTVe7x8ILyQwMO__2bpVCUFMSy47xuOqU-OEmW-0eGUz0f6-UiHefevKxEOgX9amBdcgN3sEOuLdGHAUuB_4FC3k7dgfCMGlFbCc_oa-/s1600/las-tumbas-de-atuan.jpg'
      ),
      new Book(
        20,
        4,
        'La costa más lejana',
        ['ebook', 'tapa dura'],
        'fantasía',
        'Ursula K. Le Guin',
        [16.99, 26.99],
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgthffMOvId-qdAacHdwN_3hFSLAauZQyAOnYEIxh1euqMNPoM1DmHtj1XIbyyBHvRI_V_PlA4_mqsOYQWjWYq3H6tfmrMPewoG0N78zsmQLbMv6wrEMyCwBhmQd7yM3pYdf1txKYZnI_Th/s1600/la-costa-m%25C3%25A1s-lejana.jpg'
      ),
      new Book(
        21,
        5,
        'La llamada de Cthulhu',
        ['ebook', 'tapa dura'],
        'terror',
        'H.P. Lovecraft',
        [14.99, 24.99],
        'https://www.planetadelibros.com/usuaris/libros/fotos/292/original/portada_la-llamada-de-cthulhu_h-p-lovecraft_201904111457.jpg'
      ),
      new Book(
        22,
        5,
        'El color que cayó del cielo',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'terror',
        'H.P. Lovecraft',
        [15.99, 20.99, 24.99],
        'https://m.media-amazon.com/images/I/71yIBe3FaCL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        23,
        5,
        'El caso de Charles Dexter Ward',
        ['ebook', 'tapa dura'],
        'terror',
        'H.P. Lovecraft',
        [16.99, 26.99],
        'https://static.serlogal.com/imagenes_big/9788417/978841724476.JPG'
      ),
      new Book(
        24,
        5,
        'El horror de Dunwich',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'terror',
        'H.P. Lovecraft',
        [14.99, 19.99, 23.99],
        'https://m.media-amazon.com/images/I/81jQYca-OCL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        25,
        5,
        'La sombra sobre Innsmouth',
        ['ebook', 'tapa dura'],
        'terror',
        'H.P. Lovecraft',
        [15.99, 25.99],
        'https://www.planetadelibros.com/usuaris/libros/fotos/383/original/portada_la-sombra-sobre-innsmouth_h-p-lovecraft_202310311551.jpg'
      ),
      new Book(
        26,
        6,
        'Los pilares de la Tierra',
        ['ebook', 'tapa dura'],
        'ficción histórica',
        'Ken Follett',
        [18.99, 28.99],
        'https://m.media-amazon.com/images/I/91FU2wSBo5L._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        27,
        6,
        'La caída de los gigantes',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'ficción histórica',
        'Ken Follett',
        [19.99, 24.99, 29.99],
        'https://imagessl5.casadellibro.com/a/l/s5/35/9788401337635.webp'
      ),
      new Book(
        28,
        6,
        'El invierno del mundo',
        ['ebook', 'tapa dura'],
        'ficción histórica',
        'Ken Follett',
        [20.99, 30.99],
        'https://m.media-amazon.com/images/I/81xCjUmfUmL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        29,
        6,
        'El umbral de la eternidad',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'ficción histórica',
        'Ken Follett',
        [18.99, 23.99, 27.99],
        'https://m.media-amazon.com/images/I/91JbZJ+w0aS._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        30,
        6,
        'La armadura de la luz',
        ['ebook', 'tapa dura'],
        'ficción histórica',
        'Ken Follett',
        [21.99, 31.99],
        'https://m.media-amazon.com/images/I/817ylM6zHsL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        31,
        7,
        'La Tormenta',
        ['ebook', 'tapa dura'],
        'fantasía',
        'Brandon Sanderson',
        [17.99, 27.99],
        'https://www.planetadelibros.com/usuaris/libros/fotos/300/original/portada_la-rueda-del-tiempo-n-1214-la-tormenta_robert-jordan_202105261615.jpg'
      ),
      new Book(
        32,
        7,
        'Torres de Medianoche',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'fantasía',
        'Brandon Sanderson',
        [18.99, 23.99, 28.99],
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLTi6BkAcm10G-KkQ8WZSxwFAWtkZ4R3lQ1w&s'
      ),
      new Book(
        33,
        7,
        'Un recuerdo de Luz',
        ['ebook', 'tapa dura'],
        'fantasía',
        'Brandon Sanderson',
        [19.99, 29.99],
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1wpEztUFlbpFfzhAtmjv9dq-qP8DN7pAW5w&s'
      ),
      new Book(
        34,
        7,
        'El Ojo del Mundo',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'fantasía',
        'Brandon Sanderson',
        [17.99, 22.99, 26.99],
        'https://www.planetadelibros.com/usuaris/libros/fotos/300/original/portada_el-ojo-del-mundo-n-0114_robert-jordan_201910151031.jpg'
      ),
      new Book(
        35,
        7,
        'La Gran Cacería',
        ['ebook', 'tapa dura'],
        'fantasía',
        'Brandon Sanderson',
        [18.99, 28.99],
        'https://www.planetadelibros.com/usuaris/libros/fotos/300/original/portada_la-gran-caceria-n-0214_robert-jordan_201910151032.jpg'
      ),
      new Book(
        36,
        8,
        'Roma soy yo',
        ['ebook', 'tapa dura'],
        'ficción histórica',
        'Santiago Posteguillo',
        [19.99, 29.99],
        'https://m.media-amazon.com/images/I/719yqLXOmyL._AC_UF894,1000_QL80_.jpg'
      ),
      new Book(
        37,
        8,
        'Circo Máximo',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'ficción histórica',
        'Santiago Posteguillo',
        [18.99, 23.99, 27.99],
        'https://www.planetadelibros.com/usuaris/libros/fotos/94/original/circo-maximo_9788408117117.jpg'
      ),
      new Book(
        38,
        8,
        'Y Julia retó a los dioses',
        ['ebook', 'tapa dura'],
        'ficción histórica',
        'Santiago Posteguillo',
        [20.99, 30.99],
        'https://www.planetadelibros.com/usuaris/libros/fotos/311/original/portada_y-julia-reto-a-los-dioses_santiago-posteguillo_202001150940.jpg'
      ),
      new Book(
        39,
        8,
        'Los asesinos del emperador',
        ['ebook', 'tapa blanda', 'tapa dura'],
        'ficción histórica',
        'Santiago Posteguillo',
        [19.99, 24.99, 28.99],
        'https://www.santiagoposteguillo.es/wp-content/uploads/portada-asesinos.jpg'
      ),
      new Book(
        40,
        8,
        'Africanus',
        ['ebook', 'tapa dura'],
        'ficción histórica',
        'Santiago Posteguillo',
        [21.99, 31.99],
        'https://m.media-amazon.com/images/I/81NTQW75bIL._UF1000,1000_QL80_.jpg'
      ),
    ];

    //*  Formulario (eliminar al separar componentes)
    this.buildForm();
    // -----
    //*  Filtro (eliminar al separar componentes)
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

  //* Formulario
  private buildForm() {
    this.formBook = this.formBuilder.group({
      usuario: ['', Validators.required],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      genero: ['', Validators.required],
      imagen: ['', Validators.required],
      referencia: ['', Validators.required],
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

  ngOnInit(): void {}

  seleccionaFormato(format: string, book: Book): void {
    book.selected = parseInt(format);
  }

  mostrarPrecio(book: Book): number {
    return book.price[book.selected];
  }

  scroll(sectionId: string): void {
    let element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //* Formulario
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

  anyadirLibro() {
    // asignar los valores del formulario
    let usuario = this.formBook.get('usuario')?.value;
    let titulo = this.formBook.get('titulo')?.value;
    let autor = this.formBook.get('autor')?.value;
    let genero = this.formBook.get('genero')?.value;
    let imagen = this.formBook.get('imagen')?.value;
    let referencia = this.formBook.get('referencia')?.value;
    let format = this.formato.controls
      .map((control, i) => (control.value ? this.types[i].type : ''))
      .filter((value) => value !== null);
    let price = this.precio.controls
      .map((control, i) => (this.formato.at(i).value ? control.value : ''))
      .filter((value) => value !== null);

    // asignar los valores al objeto book
    this.newBook.id_book = parseInt(referencia);
    this.newBook.id_user = parseInt(usuario);
    this.newBook.title = titulo;
    this.newBook.type = format.filter((valor) => valor !== '');
    this.newBook.genre = genero;
    this.newBook.author = autor;
    this.newBook.price = price.filter((valor) => valor !== '');
    this.newBook.photo = imagen;

    // Importar el libro al array books
    this.importarLibro(this.books, this.newBook);
    console.log(this.newBook);
  }

  importarLibro(arrayBooks: Book[], newBook: Book) {
    arrayBooks.push(this.newBook);
  }
  // -------------

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
