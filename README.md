
#### 3 tipos generales de tests
^ +líneas de código se prueban.
- E2E: Pruebas que realizaría un usuario al utilizar la aplicación (Pej.: click en un botón) 
- Integration Tests: Han uno de otras clases pero estas no son simuladas.
- Unit Tests: Pruebas que testean métodos dentro de clases, si se necesita acceso a otras clase se simula.

# Test Unitarios
Comprueba un fragmento de código. Este conjunto de pruebas garantiza el funcionamiento de la app.

## PROS
- Aseguran que código nuevo no haga que deje de funcionar el resto.
- Aseguramos subir a producciñon software que funciona.
- Útiles si usamos CI en el proyecto.
- Permiten probar partes del proyecto si que otras estén listas aún.
- Código +complejo == + difícil de probar.

## Funcionamiento.
En la clase_1 hay que simular la clase_2, de modo que cuando se llame al método_11 de clase_1 no llamará al método_21 del que depende, sino que llamará a un objeto interno dentro del test que tiene un método_21 y devolverá lo que queramos que devuelva. De esta forma aunque la clase_2 cambie o falle, nuestro test segirá funcionando.

Si conseguimos que todos los test estén aislados por clases localizaremos rápido los errores, ya que sabremos que clase y método concreto falla.

## Mejor momento para hacer los test.
Mejor de los casos: proyecto bien definido que no cambiará. Se podría hacer el código y acto seguido las pruebas. También se podría hacer TDD, una técnica que consiste en primero realizar los test. 

Por ejemplo, en vez de primero crear un método y después hacerle un test unitario a ese método, sería al contrario. Primero el test unitario y luego el método. De esta forma nos aseguramos que todo nuestro código esté probado. Aunque es difícil encontrar un proyecto en el que se pueda hacer esto, debería ser uno en el que el código no cambie o lo haga muy poco.

En la mayoría de casos lo recomendable es centrarse en el código y hacer los tests unitarios más adelante.

## Covertura
Es una medida (%) que mide el grado en el que el código fuente de un programa ha sido probado (Pej.: 80% de cobertura == 80 porciento de la aplicación testeada). Este porcentaje sale en función a la cantidad de líneas totales respecto a las líneas probadas. 

Podemos ver la cobertura tanto a nivel de una clase como en general del proyecto. No es necesario que exista un 100% de cobertura en un proyecto, ya que hay partes de código que no merecen la pena probarse, ya sea porque son muy difíciles de probar o por otro motivo. 

RECOMENDADO: 60%-80%, dependiendo de la aplicación. Preferible + calidad de los test que + test.

# Jest
Jest es un marco de prueba JavaScript que tiene muchas funcionalidades que nos permiten hacer diferentes tipos de pruebas.

Por defecto no es el que viene en Angular (por defecto está Yasmín). Sin embargo, esto no quiere decir que sea inferior. Simplemente es otro marco de prueba diferente.

```ts
it( 'should create', () => {
    expect( component ).toBeTruthy();
});
```
Este test unitario sería el más sencillo de todos. Vemos 'it' que comprueba que el componente está instanciado correctamente.

- Para que los tests se ejecuten constantemente:
```bash
jest --watchAll
```
- Para crear carpeta coverage:
```bash
jest --coverage
```

## Mock de un servicio

Para no tener que crear un espía cada vez que tengamos que mockear porque tenemos un componente que llama a muchos métodos de un mismo servicio.

## Etiquetas y otros útiles
- xit / xdescribe: que no se haga el test / conjunto de test (skipped).
- fit | it.only / fdescribe (no muy útil): solo se hará ese test (el resto -> skipped). Probar test más rápido si cargar el resto.

###

- beforeAll():  antes de todos los test de la suite.
- afterAll():   después de todos los test de la suite.
- beforeEach(): antes de cada test. 
- afterEach():  después de cada test.

## Tests en dialogs

### [CART (modificación)] 
dialog tiene un método 'open()' y devuelve dialogRef, que tiene un método 'afterClosed()' que devuelve un observable, que al subscribirnos, devuelve un booleano, que si es "true" ejecuta '_clearListCartBook()'. Se deberá crear un monk con esto.
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


### [confirmation-dialog.component.spec.ts]
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




