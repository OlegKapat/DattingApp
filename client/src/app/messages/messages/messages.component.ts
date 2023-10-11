import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { Pagination } from 'src/app/_models/pagination';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination: Pagination;
  container = 'Unread';                                                    // we can alter this from Unread, to Inbox/Outbox
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessages();
  }
  getMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;

    })
  }
  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.getMessages();
  }
  deleteMessage(id: number) {
    // this.confirmService.confirm('Confirm delete message', 'This cannot be undone').subscribe(result =>{
    //   if (result) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    })
  }
  // this.messageService.deleteMessage(id).subscribe(() => {
  //   this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
  //
  //}
}
