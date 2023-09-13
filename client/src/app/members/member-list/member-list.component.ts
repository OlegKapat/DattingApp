import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { UserParams } from 'src/app/_modules/userParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  public members: Member[] = [];
  userParams: UserParams;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]; 
  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
   }


  ngOnInit(): void { 
    this.getMembers();
  }
  getMembers() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    })
  }
  resetFilters() {                                                                  // resets filters of our gender types
    //this.userParams = new UserParams(this.user);
    this.userParams = this.memberService.resetUserParams();
    this.getMembers();
  }
  
}
