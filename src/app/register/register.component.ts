import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService , UserdataService} from '../-services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    userId: number;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private userDataService: UserdataService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                    this.userId = this.model.id;
                    this.addUsertoUser2(this.model);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
      addUsertoUser2(term) {
    this.userDataService.addToUser(term).subscribe(
      data => {
        this.userDataService.getUser(this.userId);        
        return true;
      },
      error => {
        console.log("Error adding food to Journal");
      }
    );
  }
}
