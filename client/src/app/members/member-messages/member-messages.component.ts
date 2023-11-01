import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() username: string;
  messageContent: string;
  loading = false;

  constructor(public messageService: MessageService) {}
  sendMessage() {
    this.loading = true;
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      //this.messageService.sendMessage(this.username, this.messageContent).subscribe(message =>{   // we don't subscribe because this is now a promise not an objservable
      // this.messages.push(message);      // removed after message refactor // we instead recieve this from SignalR hub
      this.messageForm.reset();
    }).finally(() => this.loading = false);
  }
  
}
