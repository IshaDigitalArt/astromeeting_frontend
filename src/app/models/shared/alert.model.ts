//Define un namespace AlertModel que contiene varias clases, enums y variables relacionadas con alertas.
export namespace AlertModel {
  /**
    @param open: boolean;
    @param singleMessage: string;
    @param severity: string;
  */
 //Define una clase AlertaClass que representa una alerta
  export class AlertaClass {
    open: boolean;
    singleMessage: string;
    severity: string;
    //Un booleano que indica si la alerta está abierta o no.
    //Un mensaje de alerta único.
    //La severidad de la alerta (error o éxito).
    constructor( //Define el constructor de la clase AlertaClass
      openp: boolean, singleMessagep: string,
      severityp = AlertSeverity.ERROR
      //El valor inicial de open.
      //El valor inicial de singleMessage.
      //El valor inicial de severity, que por defecto es ERROR.
    ) {
      this.open = openp;
      this.singleMessage = singleMessagep;
      this.severity = severityp;
    }
  }
  //Define un enum AlertSeverity que contiene dos valores
  export enum AlertSeverity {
    ERROR = 'error', //La severidad de error.
    SUCCESS = 'success' //La severidad de éxito.
  }
  //Define un enum AlertMessage que contiene dos valores
  export enum AlertMessage {
    ERROR = 'Error',
    SUCCESS = 'Éxito'
  }

  //Define un enum AlertType que contiene un valor
  export enum AlertType {
    TOAST = 'TOAST' //El tipo de alerta toast.
  }

}
