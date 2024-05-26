import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from '@mean/models';
import { ApiService, AuthService } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { SessionStorageConstants, UriConstants } from '@mean/utils';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent extends BaseComponent {
  userImg: File | null = null;
  userId: number; // Agregué esta propiedad para almacenar el ID del usuario
  userData: AuthModel.User;
  errorMessage?: string;
  firstNameTouched = false;
  lastNameTouched = false;
  // currentPasswordTouched = false;
  // newPasswordTouched = false;
  fechaNacimientoTouched = false;
  descripcionTouched = false;
  //Estas variables se utilizarán para rastrear si el campo ha perdido el foco o no. Y pasarle true en los campos cuando el usuario no los rellene correctamente o los abandone

  //Define el constructor del componente. Inicializa las propiedades y crea el formulario con los campos necesarios para el nuevo registro.
  constructor(
    protected readonly api: ApiService,
    protected readonly fb: FormBuilder,
    protected readonly router: Router,
    private readonly auth: AuthService //para contar con la sesion del usuario
  ) {
    super(api);
    this.userId = 0;
    this.userData = this.auth.readFromSesion(SessionStorageConstants.USER_TOKEN).user;
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(50)]],
      // currentPassword: ['', [Validators.required, this.isCorrectPassword()]],
      // newPassword: ['', [Validators.required, this.passwordValidator()]],
      fecha_nacimiento: ['', [Validators.required, this.ageValidator()]],
      descripcion: ['', Validators.maxLength(250)]
    });
  }
  // es un método de ciclo de vida de Angular que se llama cuando el componente se inicializa. En este caso, estamos utilizando este método para inicializar el formulario con los datos del usuario
  ngOnInit(): void {
    this.getUserData(this.userData.id); //Este método llama a la función getUserData() que se encarga de obtener los datos del usuario desde la API. En este caso, se supone que getUserData() hace una solicitud HTTP GET a la API para obtener los datos del usuario autenticado y los almacena en la propiedad userData.
  }

  // //Que sea la contraseña que el usuario tenia
  // // En tu archivo perfil.component.ts
  // isCorrectPassword(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const enteredPassword = control.value;

  //     // Aquí haces una solicitud a tu backend para verificar la contraseña
  //     this.api.verifyPassword(enteredPassword).subscribe({
  //       next: (response) => {
  //         if (!response.isCorrect) {
  //           control.setErrors({ incorrectPassword: true });
  //         }
  //       },
  //       error: error => {
  //         console.log(error);
  //       }
  //     });

  //     return null;
  //   };
  // }

  // //valida la contraseña según las especificaciones sugeridas
  // passwordValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const password = control.value;
  //     const hasMinLength = password.length >= 6;
  //     const hasNumber = /\d/.test(password);
  //     const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  //     if (!hasMinLength) {
  //       return { minLength: true };
  //     }

  //     if (!hasNumber) {
  //       return { hasNumber: true };
  //     }

  //     if (!hasSpecialChar) {
  //       return { hasSpecialChar: true };
  //     }

  //     return null;
  //   };
  // }

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

  // Agregué este método para obtener el ID del usuario
  getUserData(id: number) {
    this.api.getById({ url: `${UriConstants.USERS}/getById?id=${id}` }).subscribe((response: any) => {
      this.userId = response.response[0].id;
      this.userData = response.response[0];// Initialize userData with the response data
      const ano = new Date(this.userData.fecha_nacimiento).getUTCFullYear();
      const mes = new Date(this.userData.fecha_nacimiento).getMonth() + 1;
      const dia = new Date(this.userData.fecha_nacimiento).getDate();
      console.log(ano + '-' + mes + '-' + dia);
      this.formGroup.patchValue(this.userData);
    });
  }

  returnFechaNacimiento() {
    const ano = new Date(this.userData.fecha_nacimiento).getUTCFullYear();
    const mes = new Date(this.userData.fecha_nacimiento).getMonth() + 1;
    const dia = new Date(this.userData.fecha_nacimiento).getDate();
    return (dia + '-' + mes + '-' + ano)
  }

  // Modifiqué este método para que actualice el perfil del usuario
  handleUpdate() {
    if (this.isFormValid()) {
      this.loading = true;
      const formData = new FormData();
      const { firstName, lastName, fecha_nacimiento, descripcion } = this.formGroup.value;

      const id = "" + this.userData.id
      formData.append('id', id)
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('fecha_nacimiento', fecha_nacimiento);
      formData.append('descripcion', descripcion);
      if (this.userImg) formData.append('img', this.userImg);

      this.api.patchService({ url: `${UriConstants.USERS}/update`, data: formData }).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          setTimeout(() => {
            sessionStorage.clear(); //Limpia el almacenamiento de sesión.
            this.router.navigate(['']);
          }, 2000);
          this.alertConfiguration('SUCCESS', 'Perfil actualizado con éxito');
          this.openAlert();
        },
        error: error => {
          this.alertConfiguration('ERROR', error);
          this.openAlert();
          this.loading = false;
        }
      });
    }
  }


  // Agregué este método para eliminar la cuenta del usuario
  handleDeleteAccount() {
    if (confirm('¿Estás seguro de eliminar tu cuenta?')) {
      this.api.deleteService({ url: `${UriConstants.USERS}/delete?id=${this.userId}` }).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          setTimeout(() => {
            sessionStorage.clear(); //Limpia el almacenamiento de sesión.
            this.router.navigate(['/login']);
          }, 2000);
          this.alertConfiguration('SUCCESS', 'Cuenta eliminada con éxito');
          this.openAlert();

        },
        error: error => {
          this.alertConfiguration('ERROR', error);
          this.openAlert();
        }
      });
    }
  }

  //Del boton que vuelve al chat
  comeBack() {
    this.router.navigate(['']);
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
