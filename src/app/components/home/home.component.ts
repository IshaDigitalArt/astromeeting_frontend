import { Component,ViewChild, ElementRef } from '@angular/core';
import { AuthModel } from '@mean/models';
import { ApiService, AuthService, ChatService, Message } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { SessionStorageConstants, UriConstants } from '@mean/utils';
//Importa los elementos Component, ViewChild, y ElementRef desde el módulo @angular/core. Importa el modelo AuthModel desde el módulo @mean/models.
//Importa los servicios ApiService, AuthService, ChatService, y el modelo Message desde el módulo @mean/services.
//Importa el componente BaseComponent desde el módulo @mean/shared. Importa las constantes SessionStorageConstants y UriConstants desde el módulo @mean/utils.

//Decorador. Define el componente HomeComponent con un selector app-home, una plantilla HTML (./home.component.html), y un archivo de estilos (./home.component.scss).
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
//Define la clase HomeComponent que extiende la clase BaseComponent con el tipo Message.
export class HomeComponent extends BaseComponent<Message> {
  showTyping = false;
  messages: Message[] = [];
  userData: AuthModel.User;
  inputValue = '';
  counter = 0;
  descripcionCompatibilidad?: string;
  //La propiedad showTyping que indica si se está mostrando un mensaje de "escribiendo...".
  //La propiedad messages que es un array de mensajes.
  //La propiedad userData que es un objeto que contiene información del usuario autenticado.
  //La propiedad inputValue que es un string que contiene el valor del input de texto.
  //La propiedad counter que es un número que se utiliza para contar el número de veces que se ha presionado la tecla de "escribir...".

  //La propiedad scrollesElement que es un elemento HTML que se utiliza para scrollear el contenido.
  @ViewChild('scrolles') scrollesElement!: ElementRef;

  //Define el constructor del componente que recibe varios parámetros
  constructor(
    protected readonly api: ApiService<Message>,
    private readonly chatService: ChatService,
    private readonly auth: AuthService
    //El servicio ApiService que se utiliza para realizar peticiones HTTP.
    //El servicio ChatService que se utiliza para manejar los mensajes.
    //El servicio AuthService que se utiliza para autenticar usuarios.

  ) {
    super(api);
    this.userData = this.auth.readFromSesion(SessionStorageConstants.USER_TOKEN).user;
    this.getMessages(this.userData.id_compatibilidad);
    this.chatService.getMessage().subscribe(val => {
      this.messages = val;
      setTimeout(() => this.updateScroll(), 0);
    });

    this.chatService.userListening().subscribe(val => {
      if (typeof val === 'boolean') {
        this.showTyping = false;
      } else {
        this.showTyping = this.userData.id !== val.id;
      }
    })
  }
  ngOnInit() {
    this.returnCompatibilidad();
  }
  //El método getMessages que se utiliza para obtener los mensajes desde la API.
  private async getMessages(compatibilidad:number) {
    this.messages = (await this.searchArrAsync({ url: UriConstants.MESSAGES, params:{compatibilidad:compatibilidad} })).response;
  }
  //El método saveMessage que se utiliza para guardar un nuevo mensaje en la API.
  saveMessage() {
    if (this.inputValue) {
      const payload = { userId: this.userData.id, content: this.inputValue, compatibilidad: this.userData.id_compatibilidad};
      this.create({ url: `${UriConstants.MESSAGES}/create`, data: payload })
      this.inputValue = '';
      this.stopTyping();
      this.updateScroll(); // <--- Llamar al método updateScroll()
    }
  }
  //El método deleteMessage que se utiliza para eliminar un mensaje desde la API.
  deleteMessage(id: number) {
    const reqParams = {
      url: `${UriConstants.MESSAGES}/${id}`,
      params: { compatibilidad: this.userData.id_compatibilidad }
    };
    this.api.deleteService(reqParams).subscribe(() => {
      this.getMessages(this.userData.id_compatibilidad);
    });
  }


  //El método startTyping que se utiliza para indicar que el usuario ha comenzado a escribir un mensaje.
  startTyping() {
    this.counter++;
    if (this.counter === 1) this.chatService.sendTyping(this.userData);
  }
  //El método stopTyping que se utiliza para indicar que el usuario ha dejado de escribir un mensaje.
  stopTyping() {
    this.counter = 0;
    this.chatService.sendTyping(false);
  }
  //Saca la compatibilidad entre los usuarios
  returnCompatibilidad() {
    const id_compatibilidad = this.userData.id_compatibilidad; // Obtén el id_compatibilidad del usuario logueado
    this.api.getByCompatibilidad({ url: `${UriConstants.USERS}/getByCompatibilidad?id=${id_compatibilidad}` }).subscribe((response: any) => {
      if (response.response && response.response[0]) {
        this.descripcionCompatibilidad = response.response[0].descripcion; // Almacena la descripción de la compatibilidad
      } else {
        console.log('Respuesta del servidor:', response);
      }
    }, error => {
      console.error(error);
    });
  }
  //El método updateScroll que se utiliza para scrollear el contenido hacia abajo.
  updateScroll() {
    this.scrollesElement.nativeElement.scrollTop = this.scrollesElement.nativeElement.scrollHeight;
  }

}
