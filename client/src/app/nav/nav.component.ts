import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  model: any = {};
  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        console.log(response);
        
        this.router.navigateByUrl('/members');
      },  error => {                                                                                              
      console.log(error);
      this.toastr.error(error.error);                                                                            
    }
    );
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
