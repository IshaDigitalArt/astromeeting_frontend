import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { AlertComponent } from './alert.component';
// Importa el decorador @NgModule desde el módulo @angular/core. Importa el módulo ButtonModule desde la biblioteca primeng.
// Importa el módulo CommonModule desde el módulo @angular/common. Importa el módulo ConfirmDialogModule desde la biblioteca primeng.
// Importa el módulo ToastModule desde la biblioteca primeng. Importa los servicios ConfirmationService y MessageService desde la biblioteca primeng.
// Importa el módulo MessagesModule desde la biblioteca primeng. Importa el módulo DialogModule desde la biblioteca primeng. Importa el componente AlertComponent desde el mismo módulo.


// Define el módulo SharedAlertModule con varias propiedades
@NgModule({
  declarations: [ // Un array de componentes que se declaran en este módulo. En este caso, solo se declara el componente AlertComponent.
    AlertComponent
  ],
  imports: [ // Un array de módulos que se importan en este módulo. En este caso, se importan varios módulos de la biblioteca primeng, como ButtonModule, CommonModule, ConfirmDialogModule, ToastModule, MessagesModule, y DialogModule.
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    MessagesModule,
    DialogModule
  ],
  exports: [ // Un array de componentes que se exportan desde este módulo. En este caso, solo se exporta el componente AlertComponent.
    AlertComponent
  ],
  providers: [ // Un array de servicios que se proveen en este módulo. En este caso, se proveen los servicios ConfirmationService y MessageService desde la biblioteca primeng.
    ConfirmationService,
    MessageService
  ]
})
export class SharedAlertModule { }
// Es un módulo que se utiliza para agrupar componentes y servicios relacionados con alertas y mensajes. Este módulo importa varios módulos de la biblioteca primeng y declara el componente AlertComponent. También provee servicios como ConfirmationService y MessageService para que sean utilizados por otros componentes.
