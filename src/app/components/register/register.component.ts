import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { UriConstants } from '@mean/utils';

//Este archivo se encarga de manejar el registro de usuarios
//Importamos decoradores para definir componentes de Angular, elementos de formularios, navegar entre rutas, peticiones HTTP a API
//compartir funcionalidades entre componentes, constrantes para rutas de URI

//conectar la pantilla HTML asociada (register.component.html)
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

//Define la clase RegisterComponent que extiende de BaseComponent. Esta clase contiene la lógica del componente.
export class RegisterComponent extends BaseComponent {
  userImg: File | null = null;
  errorEmailExists = false;
  errorMessage?: string;// errorMessage: string =''; es lo mismo
  //Define una propiedad userImg que almacena la imagen del usuario. Inicialmente, está vacía.
  //Define una propiedad errorEmailExists que indica si el correo electrónico ya existe. Inicialmente, está en false.
  //Define una propiedad errorMessage que almacena el mensaje de error. Es opcional.
  firstNameTouched = false;
  lastNameTouched = false;
  emailTouched = false;
  passwordTouched = false;
  fechaNacimientoTouched = false;
  descripcionTouched = false;
  //Estas variables se utilizarán para rastrear si el campo ha perdido el foco o no. Y pasarle true en los campos cuando el usuario no los rellene correctamente o los abandone


  //Define el constructor del componente. Inicializa las propiedades y crea el formulario con los campos necesarios para el registro.
  constructor(
    protected readonly api: ApiService,
    protected readonly fb: FormBuilder,
    protected readonly router: Router
  ) {
    super(api);
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*'), Validators.minLength(2), Validators.maxLength(50)]], //que admita alfabeto español, tildes, ñ
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*'), Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, this.emailValidator()]],
      password: ['', [Validators.required, this.passwordValidator()]],
      fecha_nacimiento: ['', [Validators.required, this.ageValidator()]],
      descripcion: ['', Validators.maxLength(250)]
    });
  }

  //valida que cumple un formato email correcto
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      const isAnEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      if (!isAnEmail) {
        return { isAnEmail: true };
      }

      return null;
    };
  }

  //valida la contraseña según las especificaciones sugeridas
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      const hasMinLength = password.length >= 6;
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

      if (!hasMinLength) {
        return { minLength: true };
      }

      if (!hasNumber) {
        return { hasNumber: true };
      }

      if (!hasSpecialChar) {
        return { hasSpecialChar: true };
      }

      return null;
    };
  }

  //valida la edad en +18
  ageValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fechaNacimiento = control.value;
      const today = new Date();
      const birthDate = new Date(fechaNacimiento);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        return { underage: true };
      }

      return null;
    };
  }

  //guarda la imagen del usuario
  onUpload({ files }: { files: FileList }) {
    this.userImg = files[0];
  }

  //elimina la imagen si no completa el registro
  removeFile() {
    this.userImg = null;
  }

  //recoger los datos del usuario al pulsar submit
  public handleregister() {
    if (this.isFormValid()) {
      this.loading = true;
      const formData = new FormData();
      const { firstName, lastName, email, password, fecha_nacimiento, descripcion } = this.formGroup.value;

      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('fecha_nacimiento', fecha_nacimiento);
      formData.append('descripcion', descripcion);
      formData.append('active', '1');
      formData.append('roleId', '2');
      if (this.userImg) formData.append('img', this.userImg);

      //se encarga de crear un nuevo usuario en la API y manejar la respuesta
      this.createService({ url: `${UriConstants.USERS}/create`, data: formData })
        .subscribe({ //Suscribe al observable devuelto por el servicio createService. Un observable es una forma de manejar asincronía en JavaScript.
          next: () => { //Se ejecuta cuando el observable emite un valor (en este caso, cuando la petición HTTP es exitosa).
            this.alertConfiguration('SUCCESS', 'Usuario registrado con éxito'); //mensaje de exito configurado en base component
            this.openAlert(); //Abre la alerta configurada.
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000); // 3000ms = 3 segundos de espera para ver el mensaje de exito y redirigir al usuario al login
          },
          error: error => { //Se ejecuta cuando el observable emite un error (en este caso, cuando la petición HTTP falla).
            // Muestra un mensaje específico de error
            this.alertConfiguration('ERROR', error)
            this.openAlert();
            this.loading = false; //Establece la propiedad loading en false, lo que indica que la petición HTTP ha finalizado.
          }
        });
    }
  }

  //Estos dos métodos adicionales en el RegisterComponent son overrides de los métodos alertConfiguration y openAlert del BaseComponent.
  //Este método overridea el método alertConfiguration del BaseComponent. Se utiliza para configurar una alerta con una severidad y mensaje específicos.
  public override alertConfiguration(severity: 'ERROR' | 'SUCCESS', message: string): void {
    super.alertConfiguration(severity, message); //Llama al método alertConfiguration del BaseComponent con los parámetros proporcionados, lo que permite configurar la alerta de manera genérica.
  }

  //Este método overridea el método openAlert del BaseComponent. Se utiliza para abrir la alerta configurada.
  public override openAlert(): void {
    super.openAlert(); //Llama al método openAlert del BaseComponent, lo que permite abrir la alerta de manera genérica.
  }
}
