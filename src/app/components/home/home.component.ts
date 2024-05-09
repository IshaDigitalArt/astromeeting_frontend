import { Component,ViewChild, ElementRef } from '@angular/core';
import { AuthModel } from '@mean/models';
import { ApiService, AuthService, ChatService, Message } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { SessionStorageConstants, UriConstants } from '@mean/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent<Message> {
  showTyping = false;
  messages: Message[] = [];
  userData: AuthModel.User;
  inputValue = ''
  counter = 0;

  @ViewChild('scrolles') scrollesElement!: ElementRef;

  constructor(
    protected readonly api: ApiService<Message>,
    private readonly chatService: ChatService,
    private readonly auth: AuthService
  ) {
    super(api);
    this.userData = this.auth.readFromSesion(SessionStorageConstants.USER_TOKEN).user;
    this.getMessages();
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

  private async getMessages() {
    this.messages = (await this.searchArrAsync({ url: UriConstants.MESSAGES })).response;
  }
  saveMessage() {
    if (this.inputValue) {
      const payload = { userId: this.userData.id, content: this.inputValue };
      this.create({ url: `${UriConstants.MESSAGES}/create`, data: payload })
      this.inputValue = '';
      this.stopTyping();
      this.updateScroll(); // <--- Llamar al método updateScroll()
    }
  }
  deleteMessage(id: number) {
    this.delete({ url: `${UriConstants.MESSAGES}/${id}` });
  }
  startTyping() {
    this.counter++;
    if (this.counter === 1) this.chatService.sendTyping(this.userData);
  }
  stopTyping() {
    this.counter = 0;
    this.chatService.sendTyping(false);
  }
  updateScroll() {
    this.scrollesElement.nativeElement.scrollTop = this.scrollesElement.nativeElement.scrollHeight;
  }

}
