import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { AlertModel } from '@mean/models';
import { MessageService } from 'primeng/api';
// Importa varios elementos desde el módulo @angular/core, incluyendo el decorador @Component, los decoradores @Input y @Output, y las interfaces OnChanges y SimpleChanges.
// Importa el modelo AlertModel desde el módulo @mean/models.
// Importa el servicio MessageService desde la biblioteca primeng.

// Define el componente AlertComponent con un selector app-alert, una plantilla HTML (./alert.component.html), un archivo de estilos (./alert.component.scss), y un proveedor de servicios (MessageService).
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  providers: [MessageService]
})

export class AlertComponent implements OnChanges {
  @Input() singleMessage: string = '';
  @Input() severity: string = AlertModel.AlertSeverity.ERROR;
  @Input() open = false;
  @Output() eventCloseToast = new EventEmitter();
  // Define una propiedad singleMessage que es un string vacío por defecto, y que se utiliza para recibir un mensaje desde el componente padre.
  // Define una propiedad severity que es un string que indica la severidad del mensaje (error o éxito), y que se utiliza para recibir la severidad desde el componente padre.
  // Define una propiedad open que es un booleano que indica si la alerta está abierta o no, y que se utiliza para recibir el estado de la alerta desde el componente padre.
  // Define un evento eventCloseToast que se emite cuando la alerta se cierra.

  // Define el constructor del componente que recibe un servicio MessageService como parámetro.
  constructor(
    private messageService: MessageService,
  ) { }
  //Define un método ngOnChanges que se llama cuando cambian las propiedades del componente. Este método se utiliza para abrir la alerta cuando cambia la propiedad open o la propiedad singleMessage.
  ngOnChanges(changes: SimpleChanges): void {
    const openWhenMessageNotChanged = changes['open']?.currentValue && changes['singleMessage'] === undefined;
    const openWhenMessageChanged = changes['open']?.currentValue && (changes['singleMessage']?.currentValue !== changes['singleMessage']?.previousValue);
    if (openWhenMessageChanged  || openWhenMessageNotChanged) {
      this.openToast();
    }
  }

  //Define un método openToast que se utiliza para abrir la alerta. Este método utiliza el servicio MessageService para agregar un mensaje a la cola de mensajes.
  private openToast() {
      this.messageService.add(
        {
          severity: this.severity,
          summary: this.severity === AlertModel.AlertSeverity.ERROR ? AlertModel.AlertMessage.ERROR :  AlertModel.AlertMessage.SUCCESS,
          detail: this.singleMessage
        }
      );
  }

}
