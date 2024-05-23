import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, AuthService } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { UriConstants, SessionStorageConstants } from '@mean/utils';
//Importa el decorador @Component desde el módulo @angular/core. Importa los elementos FormBuilder, Validators, y FormGroup desde el módulo @angular/forms.
//Importa el servicio Router desde el módulo @angular/router. Importa los servicios ApiService y AuthService desde el módulo @mean/services.
//Importa el componente BaseComponent desde el módulo @mean/shared. Importa las constantes UriConstants y SessionStorageConstants desde el módulo @mean/utils.


type Get = {} //Define un tipo Get que es un objeto vacío.
type Post = { //Define un tipo Post que es un objeto con dos propiedades: token y refresh, que son cadenas.
  token: string;
  refresh: string
}

//Define el componente LoginComponent con un selector app-login y una plantilla HTML (./login.component.html).
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

//Define la clase LoginComponent que extiende la clase BaseComponent con los tipos Get y Post.
export class LoginComponent extends BaseComponent<Get, Post> {
  emailTouched = false;
  passwordTouched = false;

  constructor( //Define el constructor del componente que recibe varios parámetros
    protected readonly api: ApiService<Get, Post>,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
    //El servicio ApiService que se utiliza para realizar peticiones HTTP.
    //El servicio FormBuilder que se utiliza para crear formularios.
    //El servicio Router que se utiliza para navegar entre rutas.
    //El servicio AuthService que se utiliza para autenticar usuarios.

  ) {
    super(api);
    this.formGroup = this.fb.group({ //La propiedad formGroup que es un formulario que se utiliza para recopilar los datos de inicio de sesión.
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  //El método handleLogin que se llama cuando se hace clic en el botón de inicio de sesión
  handleLogin() {
    if (this.isFormValid()) {
      const { email, password } = this.formGroup.value;
      this.createService({ url: `${UriConstants.USERS}/login`, data: { email, password } })
        .subscribe({
          next: data => {
            const { token, refresh } = data.response;
            this.authService.saveToSession(SessionStorageConstants.USER_TOKEN, token);
            this.authService.saveToSession(SessionStorageConstants.USER_REFRESH_TOKEN, refresh);
            this.router.navigate(['']);
          },
          error: error => {
            // console.error(error);
            this.alertConfiguration('ERROR', error);
            this.openAlert();
            this.loading = false;
          }
        });
      //Verifica si el formulario es válido utilizando el método isFormValid.
      //Si el formulario es válido, crea una petición POST a la API con los datos de inicio de sesión.
      //Si la petición es exitosa, guarda el token y el token de refresh en la sesión utilizando el servicio AuthService.
      //Navega a la ruta raíz utilizando el servicio Router.
      //Si la petición falla, muestra una alerta de error utilizando el método alertConfiguration.
    }
  }
}
