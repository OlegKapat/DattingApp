import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.scss']
})
export class PhotoManagementComponent implements OnInit{

 constructor(private adminService: AdminService, private modalService: BsModalService) {}
 users: Partial<User[]>;
 ngOnInit(): void {
  this.getUsersWithRoles();
 }
 getUsersWithRoles() {
  this.adminService.getUsersWithRoles().subscribe(users => {
    this.users = users;
  })
}
}
