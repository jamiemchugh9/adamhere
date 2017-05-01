import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { User, User2 } from '../-models/index';
import { UserService } from '../-services/index';

import 'rxjs/Rx';


@Injectable()
export class UserdataService {

  private currentUser: User;

  // private MOCKAPI_URL = "http://59025bef6fd058001126c2e6.mockapi.io/api/v2/user";  //internal server errors
  // private MOCKAPI_URL = "http://590573aecc0e550011dced8d.mockapi.io/user"; //jamies one
  private MOCKAPI_URL = "http://59066cd7c5fe4f0011201b5c.mockapi.io/user";


  //format "http://59025bef6fd058001126c2e6.mockapi.io/api/v2/user/${userId}/dailyIntake"  
  //format "http://59025bef6fd058001126c2e6.mockapi.io/api/v2/user/${userId}/journal/${userId}/FoodItems"
  //format "http://59025bef6fd058001126c2e6.mockapi.io/api/v2/user/${userId}/journal"


  constructor(private http: Http, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  addToUser(user2: User2) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let newUser = new User2(user2);
    let body = JSON.stringify(user2);
    // let journal = this.getTodaysJournalEntry();
    let url = `${this.MOCKAPI_URL}`;

    return this.http.post(url, body, options).map((res: Response) => res.json());
  }

  serviceUpdateUser(input:User){
    let body = JSON.stringify(input);
    let url = `${this.MOCKAPI_URL}/${this.currentUser.id}`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url,body,options).map(res => res.json());
  }


  getUser(input) {
    let url = `${this.MOCKAPI_URL}/${this.currentUser.id}`;
    return this.http.get(url).map(res => res.json());
  }
  
  deleteUser2() {
    return this.http.delete(`${this.MOCKAPI_URL}/${this.currentUser.id}`)
      .map((res: Response) => res.json());
  }

}
