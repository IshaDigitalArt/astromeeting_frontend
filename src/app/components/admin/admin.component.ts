import { Component } from '@angular/core';
import { AuthModel } from '@mean/models';
import { ApiService, AuthService } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { SessionStorageConstants, UriConstants } from '@mean/utils';


//Decorador. Define el componente HomeComponent con un selector app-home, una plantilla HTML (./home.component.html), y un archivo de estilos (./home.component.scss).
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
//Define la clase HomeComponent que extiende la clase BaseComponent con el tipo Message.
export class AdminComponent extends BaseComponent {
  userData: AuthModel.User;
  users: Array< AuthModel.User>;
  //Define el constructor del componente que recibe varios parámetros
  searchterm!: string; // Agregamos una variable para almacenar el término de búsqueda

  constructor(
    protected readonly api: ApiService,
    private readonly auth: AuthService,

  ) {
    super(api);
    this.userData = this.auth.readFromSesion(SessionStorageConstants.USER_TOKEN).user;
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  // Agregué este método para obtener usuarios
  getUsers() {
    this.api.getService({ url: `${UriConstants.USERS}` }).subscribe((response: any) => {
      this.users = response.response.filter((user: any) => user.roleId !== 1);
      if (this.searchterm) { // Si hay un término de búsqueda, filtramos los usuarios
        this.users = this.users.filter(user => {
          const fullName = `${user.firstName} ${user.lastName}`;
          return fullName.toLowerCase().includes(this.searchterm.toLowerCase());
        });
      }
    });
  }
  // Agregué este método para eliminar la cuenta del usuario
  handleDeleteUser(userId: number) {
    console.log(userId)
    if (confirm('¿Estás seguro de eliminar el usuario?')) {
      this.api.deleteService({ url: `${UriConstants.USERS}/delete?id=${userId}` }).subscribe({
        next: (response) => {
          this.alertConfiguration('SUCCESS', 'Cuenta eliminada con éxito');
          this.openAlert();
          this.getUsers();
        },
        error: error => {
          this.alertConfiguration('ERROR', error);
          this.openAlert();
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
