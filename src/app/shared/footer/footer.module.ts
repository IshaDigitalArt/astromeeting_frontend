import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
//Importa el decorador NgModule desde el módulo @angular/core. Importa el módulo CommonModule desde el módulo @angular/common.
//Importa el componente FooterComponent desde el archivo footer.component.ts.

//Define el módulo SharedFooterModule
@NgModule({
  declarations: [ //Declara el componente FooterComponent como parte de este módulo.
    FooterComponent
  ],
  imports: [ //Importa el módulo CommonModule para que esté disponible en este módulo.
    CommonModule
  ],
  exports: [ // Exporta el componente FooterComponent para que esté disponible en otros módulos que importen este módulo.
    FooterComponent
  ]
})

//Define la clase SharedFooterModule, que es un módulo que contiene el componente FooterComponent.
export class SharedFooterModule { }
