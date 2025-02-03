import { CartComponent } from './cart.component';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/models/book.model';

// Constantes
const listBook: Book[] = [
  { name: '',   author: '',   isbn: '',   price: 15,   amount: 2 },
  { name: '',   author: '',   isbn: '',   price: 20,   amount: 1 },
  { name: '',   author: '',   isbn: '',   price: 8,    amount: 7 },
];

describe( 'Cart component', () => {

  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;

  beforeEach( () => {     // Se ejecuta antes de cada test.
    TestBed.configureTestingModule({
      imports: [          // Modules.
        HttpClientTestingModule
      ],
      declarations: [     // Components
        CartComponent
      ],
      providers: [        // Services.
        BookService,
        // CartComponent  // forma 2
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });


  beforeEach( () => {         // Instanciamos componente.
    fixture = TestBed.createComponent( CartComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get( BookService) ;
    jest.spyOn( service, 'getBooksFromCart' ).mockImplementation( () => listBook );
  });

  afterEach( () => {
    fixture.destroy();
    jest.resetAllMocks();
  })


  it( 'should create', () => {
    expect( component ).toBeTruthy();     // Componente creado correctamente.
  });

  // it( 'should create', inject([ CartComponent ], ( component2: CartComponent ) => {    // forma 2
  //     expect( component2 ).toBeTruthy();
  // }));



  it( 'getTotalPrice returns amount', () => {
    const totalPrice = component.getTotalPrice( listBook );
    expect( totalPrice ).toBeGreaterThan( 0 );
    expect( totalPrice ).not.toBe( 0 );
    expect( totalPrice ).not.toBeNull();
  });

  it( 'onInputNumberChange increments ok', () => {        // SPY - Tests con llamadas a métodos de servicios.
    const action = 'plus';
    const book: Book = { name: '',   author: '',   isbn: '',   price: 15,   amount: 2 }
    const spy1 = jest.spyOn( service, 'updateAmountBook' ).mockImplementation( () => null );
    const spy2 = jest.spyOn( component, 'getTotalPrice' ).mockImplementation( () => null );

    expect( book.amount ).toBe( 2 )
    component.onInputNumberChange( action, book );
    expect( book.amount ).toBe( 3 )

    expect( spy1 ).toHaveBeenCalledTimes( 1 );
    expect( spy2 ).toHaveBeenCalledTimes( 1 );
  });

  it( 'onInputNumberChange decrements ok', () => {
    const action = 'minus';
    const book: Book = { name: '',   author: '',   isbn: '',   price: 15,   amount: 2 }
    const spy1 = jest.spyOn( service, 'updateAmountBook' ).mockImplementation( () => null );
    const spy2 = jest.spyOn( component, 'getTotalPrice' ).mockImplementation( () => null );

    expect( book.amount ).toBe( 2 )
    component.onInputNumberChange( action, book );
    expect( book.amount ).toBe( 1 )     // SAME expect( book.amount == 1 ).toBe( true )

    expect( spy1 ).toHaveBeenCalledTimes( 1 );
    expect( spy2 ).toHaveBeenCalledTimes( 1 );
  });

  it( 'onClearBooks works ok', () => {        // AS ANY - método privado a través de uno público.
    const spy1 = jest.spyOn( service, 'removeBooksFromCart' ).mockImplementation( () => null )
    const spy2 = jest.spyOn( component as any, '_clearListCartBook' );
    component.listCartBook = listBook;
    component.onClearBooks();
    expect( component.listCartBook.length ).toBe( 0 );
    expect( spy1 ).toHaveBeenCalledTimes( 1 );
    expect( spy2 ).toHaveBeenCalledTimes( 1 );
  });

  it( '_clearListCartBook works ok', () => {        // Método privado.
    const spy1 = jest.spyOn( service, 'removeBooksFromCart' ).mockImplementation( () => null )
    component.listCartBook = listBook;
    component[ "_clearListCartBook" ]();
    expect( component.listCartBook.length ).toBe( 0 );
    expect( spy1 ).toHaveBeenCalledTimes( 1 );
  });
});
