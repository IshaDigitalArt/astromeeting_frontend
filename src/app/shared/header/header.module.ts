import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RouterModule } from '@angular/router';
//Importa el decorador NgModule desde el módulo @angular/core.  Importa el módulo CommonModule desde el módulo @angular/common.
//Importa el componente HeaderComponent desde el archivo header.component.ts.  Importa el módulo FormsModule desde el módulo @angular/forms.
//Importa el módulo AutoCompleteModule desde la biblioteca primeng. Importa el módulo RouterModule desde el módulo @angular/router.

//Define el módulo SharedHeaderModule
@NgModule({
  declarations: [ //Declara el componente HeaderComponent como parte de este módulo.
    HeaderComponent
  ],
  imports: [ //Importa los módulos necesarios para que estén disponibles en este módulo.
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    RouterModule
  ],
  exports: [ // Exporta el componente HeaderComponent para que esté disponible en otros módulos que importen este módulo.
    HeaderComponent
  ]
})

//Define la clase SharedHeaderModule, que es un módulo que contiene el componente HeaderComponent y lo exporta para que esté disponible en otros módulos.
export class SharedHeaderModule { }
