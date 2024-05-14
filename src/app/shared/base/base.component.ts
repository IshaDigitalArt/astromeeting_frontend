import { Component } from '@angular/core';
import { ApiService } from '@mean/services';
import { AlertModel, ApiModel } from '@mean/models';
import { lastValueFrom } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { UriConstants } from '@mean/utils';
//Importa el decorador @Component desde el módulo @angular/core. Importa el servicio ApiService desde el módulo @mean/services.
//Importa los modelos AlertModel y ApiModel desde el módulo @mean/models. Importa la función lastValueFrom desde la biblioteca rxjs.
//Importa la clase FormGroup desde el módulo @angular/forms. Importa las constantes de URI desde el módulo @mean/utils.

//Define una interfaz KeyParams que representa un objeto con clave-valor, donde la clave es una cadena y el valor es cualquier tipo.
interface KeyParams {
  [key: string]: any;
}

//Define el componente BaseComponent con una plantilla vacía.
@Component({
  template: '',
})

//Define la clase BaseComponent que puede ser genérica, es decir, puede tener tipos de parámetros GET, POST, PUT, PATCH y DELETE.
export class BaseComponent<GET = {}, POST = {}, PUT = {}, PATCH = {}, DELETE = {}> {
  /** Parámetros del servicio  */
  //Define una propiedad paramsValue que es un objeto vacío que se utiliza para almacenar parámetros.
  //Define una propiedad params que es un objeto con dos propiedades: get y post, que se inicializan con paramsValue.
  private paramsValue: KeyParams = {};
  params = {
    get: this.paramsValue,
    post: this.paramsValue,
  };
  // Define una propiedad loading que indica si la aplicación está cargando datos.
  loading = false;
  // Define una propiedad alertConfig que es un objeto AlertModel que se utiliza para configurar alertas.
  alertConfig = new AlertModel.AlertaClass(
    false,
    'Ha ocurrido un error',
    AlertModel.AlertSeverity.ERROR
  );

  //Define una propiedad formGroup que es un objeto FormGroup que se utiliza para manejar formularios.
  formGroup: FormGroup = new FormGroup({});
  // Define una propiedad host que es la URL base de la aplicación
  host = UriConstants.HOST;
  constructor(
    protected readonly apiService: ApiService<GET, POST, PUT, PATCH, DELETE>,
  ) {
  }

  //Un método que realiza una petición GET a la API con los parámetros proporcionados.
  public getService(payload: ApiModel.ReqParams) {
    this.loading = true;
    const params = {
      url: payload.url,
      data: payload.data ? payload.data : {},
    };
    return this.apiService.getService(params);
  }


  //Un método que realiza una petición POST a la API con los parámetros proporcionados y configura una alerta de éxito o error.
  public create(payload: ApiModel.ReqParams) {
    return this.createService(payload).subscribe({
      next: () => {
        this.alertConfiguration('SUCCESS', 'Registro exitoso');
        this.openAlert();
      },

      error: err => {
        this.alertConfiguration('ERROR', err);
        this.openAlert();
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  // Un método que realiza una petición POST a la API con los parámetros proporcionados.
  public createService(payload: ApiModel.ReqParams) {
    this.loading = true;
    const params = {
      url: payload.url,
      data: payload.data,
      params: payload.params,
    };
    return this.apiService.postService(params);
  }

  //Un método que realiza una petición GET a la API con los parámetros proporcionados.
  public read(payload: ApiModel.ReqParams) {
    return this.getService(payload).subscribe({
      next: () => {
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  //Un método que realiza una petición DELETE a la API con los parámetros proporcionados y configura una alerta de éxito o error.
  public delete(payload: ApiModel.ReqParams) {
    this.loading = true;
    const params = {
      url: payload.url,
      data: payload.data ? payload.data : {},
    };

    return this.apiService.deleteService(params).subscribe({
      next: () => {
        this.openAlert();
      },
      error: err => {
        this.alertConfiguration('ERROR', err);
        this.openAlert();
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }


  //Un método que realiza una petición GET a la API con los parámetros proporcionados y devuelve una promesa con el resultado.
  public async searchAsync(payload: ApiModel.ReqParams) {
    const request = {
      params: payload.params,
      url: payload.url,
    };
    return lastValueFrom(this.apiService.getService(request));
  }

  //Un método que realiza una petición GET a la API con los parámetros proporcionados y devuelve una promesa con el resultado.
  public async searchArrAsync(payload: ApiModel.ReqParams) {
    const request = {
      params: payload.params,
      url: payload.url,
    };
    return lastValueFrom(this.apiService.getListService(request));
  }


  //Un método que configura una alerta con la severidad y mensaje proporcionados.
  public alertConfiguration(severity: 'ERROR' | 'SUCCESS', msg: string) {
    this.alertConfig.severity = AlertModel.AlertSeverity[severity];
    this.alertConfig.singleMessage = msg;
  }

  //Un método que abre la alerta configurada.
  public openAlert() {
    this.alertConfig.open = true;
  }

  //Un método que cierra la alerta configurada.
  public closeAlert() {
    this.alertConfig.open = false;
  }

  //Un método que resetea el formulario.
  resetForm() {
    this.formGroup.reset();
  }

  //Un método que verifica si el formulario es válido.
  isFormValid(): boolean {
    if (this.formGroup.invalid) {
      for (const control in this.formGroup.controls) {
        this.formGroup.controls[control].markAsDirty();
        this.formGroup.controls[control].markAsTouched();
      }
      return false;
    }
    return true;
  }

  //Un método que devuelve un valor único para cada elemento en una lista.
  trackByFn(index: number) {
    return index;
  }

}
