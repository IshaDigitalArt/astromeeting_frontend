import { Component } from '@angular/core';
//Importa el decorador Component desde el módulo @angular/core.

//Define el componente AppComponent
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //El selector del componente, que se utiliza para identificar el componente en el HTML.
  // La URL del archivo HTML que contiene la plantilla del componente.
})

//Define la clase AppComponent.
export class AppComponent {
  title = 'ecommerce'; //Define una propiedad title que contiene el título de la aplicación, que es "ecommerce" en este caso.
}
