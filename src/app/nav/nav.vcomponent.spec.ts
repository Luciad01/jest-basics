import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from '../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { of } from 'rxjs';
import { NavComponent } from './nav.component';
import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HomeComponent } from '../pages/home/home.component';
// import { CartComponent } from '../pages/cart/cart.component';

// class ComponentTestRute {}

const routerMock = {
  NAVIGATE() {}
}

describe( 'Home component', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach( () => {     // Se ejecuta antes de cada test.
    TestBed.configureTestingModule({
      imports: [          // Modules.
        // RouterTestingModule.withRoutes([
        //   { path: 'home', component: ComponentTestRute },
        //   { path: 'cart', component: ComponentTestRute }
        // ])
      ],
      declarations: [     // Components
        NavComponent
      ],
      providers: [
        {
          provide: Router, useValue: routerMock
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });


  beforeEach( () => {     // Instanciamos componente.
    fixture = TestBed.createComponent( NavComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it( 'should create', () => {
    expect( component ).toBeTruthy();           // Componente creado correctamente.
  });

  // it( 'should navigate', () => {
  //   const router = TestBed.inject( Router );
  //   const spy = jest.spyOn( router, 'navigate' );

  //   component.navTo( 'home' );
  //   expect( spy ).toHaveBeenCalledWith([ '/home' ]);
  //   // expect( spy ).toHaveBeenCalledWith([ '/cart' ]); //!error

  //   component.navTo( 'cart' );
  //   expect( spy ).toHaveBeenCalledWith([ '/cart' ]);
  // });

  it( 'should navigate', () => {
    const router = TestBed.inject( Router );
    const spy = jest.spyOn( router, 'navigate' );
    component.navTo('');
    expect( spy ).toHaveBeenCalled();
  });
});
