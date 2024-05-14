import { Component } from '@angular/core';
//Importa el decorador Component desde el módulo @angular/core.

//Decorador. Define el componente FooterComponent
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
  //El selector del componente, que se utiliza para identificar el componente en el HTML.
  //La URL del archivo HTML que contiene la plantilla del componente.
  //La URL del archivo SCSS que contiene los estilos del componente.
})

//Define la clase FooterComponent.
export class FooterComponent {
  year = new Date().getFullYear(); //Define una propiedad year que contiene el año actual, obtenido mediante el objeto Date.
}
