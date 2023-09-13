import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Member } from "src/app/_models/member";
import { MembersService } from "src/app/_services/members.service";

export const addDetailsMemberResolver: ResolveFn<Member> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(MembersService).getMember(route.paramMap.get('username'));
    };