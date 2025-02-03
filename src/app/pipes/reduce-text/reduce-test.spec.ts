import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReduceTextPipe } from './reduce-text.pipe';

// Constantes

describe( 'ReduceTextPipe', () => {

  let pipe: ReduceTextPipe;

  beforeEach( () => {
    pipe = new ReduceTextPipe();
  });

  it( 'should create', () => {
    expect( pipe ).toBeTruthy();     // Componente creado correctamente.
  });

  it( 'transform works ok', () => {
    const text = 'Hello this is a test to check the pipe';
    const newText = pipe.transform( text, 5 );
    expect( newText.length ).toBe( 5 );
  });
});
