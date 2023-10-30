import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const adminGuard = () => {
  const acountService = inject(AccountService);
      const toastr = inject(ToastrService);
      return acountService.currentUser$.pipe(map(user => { 
              if (user.roles.includes('Admin') || user.roles.includes('Moderator')) return true;
             else{
                 toastr.error('You cannot enter this area');
           }
             
            }))
};




