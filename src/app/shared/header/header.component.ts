import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '@mean/models';
import { AuthService, ApiService } from '@mean/services';
import { SessionStorageConstants, UriConstants } from '@mean/utils';
//Importa el decorador Component desde el módulo @angular/core. Importa el servicio Router desde el módulo @angular/router.
//Importa el modelo AuthModel desde el módulo @mean/models. Importa el servicio AuthService desde el módulo @mean/services.
//Importa las constantes SessionStorageConstants desde el módulo @mean/utils.

//Define el componente HeaderComponent.
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  //El selector del componente, que se utiliza para identificar el componente en el HTML.
  //La URL del archivo HTML que contiene la plantilla del componente.
  //La URL del archivo SCSS que contiene los estilos del componente.
})

//Define la clase HeaderComponent.
export class HeaderComponent {
  logo = '../../../assets/logo.png';
  showMenuLogin = true;
  userRol=2; //Para que puedan acceder los admin
  userData: AuthModel.User;
  //Define una propiedad logo que contiene la URL del logo de la aplicación.
  //Define una propiedad showMenuLogin que indica si se debe mostrar el menú de login o no.

  //Define el constructor del componente que recibe dos parámetros
  constructor(
    private router: Router,
    private readonly auth: AuthService,
    protected readonly api: ApiService,
    //El servicio Router que se utiliza para navegar entre rutas.
    //El servicio AuthService que se utiliza para autenticar usuarios.
  ) {
    this.showMenuLogin = this.auth.readFromSesion(SessionStorageConstants.USER_TOKEN).user.id===0; //Verifica si el usuario está autenticado y actualiza la propiedad showMenuLogin en consecuencia.
    this.userData = this.auth.readFromSesion(SessionStorageConstants.USER_TOKEN).user;
  }
  ngOnInit(): void {
    this.getUserData(this.userData.id); //Este método llama a la función getUserData() que se encarga de obtener los datos del usuario desde la API. En este caso, se supone que getUserData() hace una solicitud HTTP GET a la API para obtener los datos del usuario autenticado y los almacena en la propiedad userData.
  }

  // Para que puedan acceder los admin
  getUserData(id:number) {
    this.api.getById({ url: `${UriConstants.USERS}/getById?id=${id}` }).subscribe((response: any) => {
      this.userRol = response.response[0].roleId;
    });
  }

  //Define un método que se llama cuando el usuario hace clic en el botón de logout
  logout() {
    sessionStorage.clear(); //Limpia el almacenamiento de sesión.
    this.router.navigate(['/login']); //Navega a la ruta de login.
  }

}
