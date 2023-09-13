import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberCardComponent {
  @Input() member: Member;
  constructor(private memberService: MembersService, private toastr: ToastrService, public presence: PresenceService) { }

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs);                      // any errors picked up by interceptor
    }
    )
  }
}
