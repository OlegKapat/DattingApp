import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export function authGuard(): CanActivateFn {
  return () => {
    const accountService = inject(AccountService);
    const toastr = inject(ToastrService);

    return accountService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        else {
          toastr.error('You shall not pass!');
          return false;
        }
      })
    );
  };
}
