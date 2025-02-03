import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { of } from 'rxjs';

// Constantes
const listBook: Book[] = [
  { name: '',   author: '',   isbn: '',   price: 15,   amount: 2 },
  { name: '',   author: '',   isbn: '',   price: 20,   amount: 1 },
  { name: '',   author: '',   isbn: '',   price: 8,    amount: 7 },
];
const bookServiceMock = {
  getBooks: () => of( listBook )
};

@Pipe({ name: 'reduceText' })                   // Pq hay un Pipe.
class ReducePipeMock implements PipeTransform {
  transform(): string {
    return '';
  }
}

describe( 'Home component', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: BookService;

  beforeEach( () => {     // Se ejecuta antes de cada test.
    TestBed.configureTestingModule({
      imports: [          // Modules.
        HttpClientTestingModule
      ],
      declarations: [     // Components
        HomeComponent,
        ReducePipeMock    // Pq hay un Pipe.
      ],
      providers: [        // Services.
        // BookService
        { provide: BookService,  useValue: bookServiceMock  }
        // No usará el original sino el mockeado (mirar const arriba).
        // Si necesita el servicio de 'provide' usará el especificado en 'useValue'.
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });


  beforeEach( () => {     // Instanciamos componente.
    fixture = TestBed.createComponent( HomeComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get( BookService) ;
    // jest.spyOn( service, 'getBooksFromCart' ).mockImplementation( () => listBook );
  });


  it( 'should create', () => {
    expect( component ).toBeTruthy();           // Componente creado correctamente.
  });

  it( 'getBooks from subscription', () => {     // Con Observable.
    const bookService = fixture.debugElement.injector.get( BookService );
    // const spy1 = jest.spyOn( bookService, 'getBooks' ).mockReturnValueOnce( of( listBook ));
    component.getBooks();
    // expect( spy1 ).toHaveBeenCalledTimes( 1 );
    expect( component.listBook.length ).toBe( 3 );
    expect( component.listBook ).toEqual( listBook );
  });
});
