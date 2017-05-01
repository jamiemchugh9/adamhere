import { Component, OnInit } from '@angular/core';

import { User } from '../-models/index';
import { UserService, UserdataService } from '../-services/index';
import { BmiService } from '../bmi-calculator/index';




import { BmiCalculatorComponent } from 'app/bmi-calculator/bmi-calculator.component';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    show: boolean = false;
    username:string;
    firstName:string;
    lastName:string;
    weight:number;
    height:number;
    age:number;
    goalWeight:number;
    tempa;
    tempfn;
    templn;
    tempw;
    temph;
    tempg;

    constructor(private userService: UserService, private userDataService: UserdataService, private bmiService: BmiService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }



    ngOnInit() {
        this.loadAllUsers();
        this.getUserInfo(this.currentUser);
        this.tempa = this.currentUser.age;
        this.tempfn = this.currentUser.firstName;
        this.templn = this.currentUser.lastName;
        this.tempw = this.currentUser.weight;
        this.temph = this.currentUser.height;
        this.tempg = this.currentUser.goalWeight;
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
        this.delUser2();
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }


    delUser2() {
        {
            this.userDataService.deleteUser2().subscribe()
        }
    }

    getUserInfo(elephant){
    this.bmiService.getOneInfo(elephant.id).subscribe(
      data => {
          console.log('search results', data)
          this.username = data.username;
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.weight = data.weight;
          this.height = data.height;
          this.goalWeight = data.goalWeight;
          this.age = data.age;
    },    
      (err) => alert("Error getting user information:" + err)
    )
  }

    updateUser() {
        let tempUser = new User();

        tempUser.firstName = this.firstName;
        tempUser.lastName = this.lastName;
        tempUser.weight = this.weight;
        tempUser.height = this.height;
        tempUser.age = this.age;
        tempUser.goalWeight = this.goalWeight;

        tempUser.id = this.currentUser.id;
        tempUser.password = this.currentUser.password;
        tempUser.username = this.currentUser.username;
        // let body = JSON.stringify(tempUser);
        this.userDataService.serviceUpdateUser(tempUser).subscribe(
            data => {
                console.log("after put: ", data);
                this.userDataService.getUser(data.userId);
            }
        );

    }




}