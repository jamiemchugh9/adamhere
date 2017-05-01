import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';



import 'rxjs/Rx';


@Injectable()
export class BmiService {
// private BASE_URL = "http://590573aecc0e550011dced8d.mockapi.io/user" // jamies one
private BASE_URL = "http://59066cd7c5fe4f0011201b5c.mockapi.io/user"; 



  constructor(private http: Http) { }

  getOneInfo(term){
    return this.http.get(this.BASE_URL+"/"+term).map((res: Response) => res.json());
  }  


}
