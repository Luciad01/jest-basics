Project for the unit test course

# BookListApp

## Mock de un servicio

Para no tener que crear un espía cada vez que tengamos que mockear porque tenemos un componente que llama a muchos métodos de un mismo servicio.

## Etiquetas
- xit / xdescribe: que no se haga el test / conjunto de test (skipped).
- fit | it.only / fdescribe (no muy útil): solo se hará ese test (el resto -> skipped). Probar test más rápido si cargar el resto.

##

- beforeAll():  antes de todos los test de la suite.
- afterAll():   después de todos los test de la suite.
- beforeEach(): antes de cada test. 
- afterEach():  después de cada test.

## Tests en dialogs

* [CART] dialog tiene un método 'open()' y devuelve dialogRef, que tiene un método 'afterClosed()' que devuelve un observable, que al subscribirnos, devuelve un booleano, que si es "true" ejecuta '_clearListCartBook()'. Se deberá crear un monk con esto.
- Constantes iniciales:
```ts
const MatDialoMock = {
  open() {
    return {
      afterClosed: () => of(true)
    }
  }
}
```

- En providers:
```ts
{
  provide: MatDialog, useValue: MatDialogMock
}
```


* [confirmation-dialog.component.spec.ts]
```ts
const MatDialogMock = {
  close() => null
};

describe( 'Confirn dialog component', () => {

  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach( () => {    
    TestBed.configureTestingModule({
      imports: [         
        HttpClientTestingModule
      ],
      declarations: [     
        ConfirmDialogComponent
      ],
      providers: [        
        // MatDialogRef,        // Mockear porq da error extraño.
        // MAT_DIALOG_DATA
        {   // Cuando testeemos los metodos de confirmar/cancelar no será {(vacío)}. el objeto mock tendrá un método 'close()'.
          provide: MatDialogRef, useValue: MatDialogMock
        }
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  beforEach( () => {
    fixture = TestBed.createComponent( CartComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it( 'should create', () => {
    expect( component ).toBeTruthy();    
  });

  // public onConfirm(): void {
  //   this.dialogRef.close(true);  // Crear spy para ver si se llama ok a 'close()'.
  // }
  it( 'onCorfirm send true', () => {
    // const service = fixture.debugElement.injector.get(MatDialogRef);
    const service = TestBed.inject( MatDialogRef );   // +limpio.
    const spy = jest.spyOn( service, 'close' );
    component.onConfirm();
    expect( spy ).toBeHaveBeenCalledWith( true );    
  });

  // public onDismiss(): void {
  //   this.dialogRef.close(false);
  // }
  it( 'onDismiss send false', () => {
    const service = TestBed.inject( MatDialogRef );   
    const spy = jest.spyOn( service, 'close' );
    component.onDismiss();
    expect( spy ).toBeHaveBeenCalledWith(false);    
  });
});
```




