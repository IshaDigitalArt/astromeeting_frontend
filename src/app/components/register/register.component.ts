import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { UriConstants } from '@mean/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends BaseComponent {
  userImg: File | null = null;
  errorEmailExists = false;
  errorMessage?: string;
  // errorMessage: string =''; es lo mismo

  constructor(
    protected readonly api: ApiService,
    protected readonly fb: FormBuilder,
    protected readonly router: Router
  ) {
    super(api);
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, this.emailValidator()]],
      password: ['', [Validators.required, this.passwordValidator()]],
      fecha_nacimiento: ['', [Validators.required, this.ageValidator()]],
      descripcion: ['', Validators.maxLength(250)]
    });
  }

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

  onUpload({ files }: { files: FileList }) {
    this.userImg = files[0];
  }

  removeFile() {
    this.userImg = null;
  }

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

      this.createService({ url: `${UriConstants.USERS}/create`, data: formData })
        .subscribe({
          next: () => {
            this.alertConfiguration('SUCCESS', 'Usuario registrado con éxito'); //mensaje de exito configurado en base component
            this.openAlert();
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000); // 3000ms = 3 segundos de espera para ver el mensaje de exito y redirigir al usuario al login
          },
          error: error => {
            if (error.status === 409) {
              this.errorEmailExists = true;
              this.errorMessage = error.error.response; // Muestra un mensaje específico de error
            } else {
              this.alertConfiguration('ERROR', 'Email ya existente');
            }
            this.openAlert();
            this.loading = false;
          }
        });
    }
  }

  public override alertConfiguration(severity: 'ERROR' | 'SUCCESS', message: string): void {
    super.alertConfiguration(severity, message);
  }

  public override openAlert(): void {
    super.openAlert();
  }
}
