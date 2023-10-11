import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
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
  pagination: Pagination;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }


  ngOnInit(): void {
    this.getMembers();
  }
  getMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }
  resetFilters() {                                                                  // resets filters of our gender types
    this.userParams = this.memberService.resetUserParams();
    this.getMembers();
  }
  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.getMembers();
  }
}
