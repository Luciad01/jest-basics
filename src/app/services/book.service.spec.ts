import { BookService } from './book.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';
import swal from 'sweetalert2';

// Constantes
const listBook: Book[] = [
  { name: '',   author: '',   isbn: '',   price: 15,   amount: 2 },
  { name: '',   author: '',   isbn: '',   price: 20,   amount: 1 },
  { name: '',   author: '',   isbn: '',   price: 8,    amount: 7 },
];

describe( 'Cart component', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach( () => {     // Se ejecuta antes de cada test.
    TestBed.configureTestingModule({
      imports: [          // Modules.
        HttpClientTestingModule
      ],
      providers: [        // Services.
        BookService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach( () => {
    service = TestBed.inject( BookService );
    httpMock = TestBed.inject( HttpTestingController );
  });

  afterEach( () => {
    httpMock.verify();
    jest.resetAllMocks();
    localStorage.clear();
  });

  it( 'should create', () => {
    expect( service ).toBeTruthy();     // Componente creado correctamente.
  });

  it( 'getBooks returns list of books & get method', () => {                // Peticiones.
    service.getBooks().subscribe((resp: Book[] ) => {                       // Subscripción a un método.
      expect( resp ).toEqual( listBook );                                   // Debería: resp == listBook.
    })
    const req = httpMock.expectOne( environment.API_REST_URL + `/book`);
    expect( req.request.method ).toBe( 'GET' );
    req.flush( listBook );                                                  // Devolvemos un observable.
  });

  it( 'getBooksFromCart return [] if empty localStorage', () => {           // localStorage.
    const listBook = service.getBooksFromCart();
    expect( listBook.length ).toBe( 0 );
  });

  it( 'getBooksFromCart return [books] if exists in localStorage', () => {            // localStorage.
    localStorage.setItem( 'listCartBook', JSON.stringify( listBook ));                // Seteamos lista de libros del ejemplo.
    const newListBook = service.getBooksFromCart();
    expect( newListBook.length ).toBe( 3 );
  });

  it( 'addBookToCart ok if list doesnt exists in localStorage', () => {
    const book: Book = { name: '',   author: '',   isbn: '',   price: 15 };

    const toastMock = {                                                               // Toast tire metodo 'fire()'. Nos da igual lo que devuelva el fire.
      fire: () => null
    } as any;
    const spy1 = jest.spyOn( swal, 'mixin' ).mockImplementation( () => {
      return toastMock;
    });

    let newListBook = service.getBooksFromCart();     // 1
    expect( newListBook.length ).toBe( 0 );
    service.addBookToCart( book );
    newListBook = service.getBooksFromCart();         // 2
    expect( spy1 ).toHaveBeenCalledTimes( 1 );
    expect( newListBook.length ).toBe( 1 );
  });

  it( 'removeBooksFromCart in localStorage', () => {
    const book: Book = { name: '',   author: '',   isbn: '',   price: 15 };
    const toastMock = {                                                               // Toast tire metodo 'fire()'. Nos da igual lo que devuelva el fire.
      fire: () => null
    } as any;
    jest.spyOn( swal, 'mixin' ).mockImplementation( () => {
      return toastMock;
    });

    service.addBookToCart( book );
    let newListBook = service.getBooksFromCart();
    expect( newListBook.length ).toBe( 1 );
    service.removeBooksFromCart();
    newListBook = service.getBooksFromCart();
    expect( newListBook.length ).toBe( 0 );
  });


});
