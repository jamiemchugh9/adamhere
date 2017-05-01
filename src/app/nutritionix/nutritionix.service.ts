import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Food, Journal } from './index';

import { User } from '../-models/index';
import { UserService } from '../-services/index';

import 'rxjs/Rx';

@Injectable()
export class NutritionixService {

  private BASE_URL = "http://api.nutritionix.com/v1_1/search/";
  private APP_ID = "7b43b860";
  private API_KEY = "65a509b92f1d44aa3d1fd800a5e151c5";
  private API_KEY2 = "c06a55b3110132ca20255014d9a7a681";
  private API_KEY3 = "12ab39dc2925ef32fd49e7c4b68ea986";
  private currentUser: User;

  // private MOCKAPI_URL = "http://59025bef6fd058001126c2e6.mockapi.io/api/v2/user";  //internal server errors
  // private MOCKAPI_URL = "http://590573aecc0e550011dced8d.mockapi.io/user"; //jamies using this
  private MOCKAPI_URL = "http://59066cd7c5fe4f0011201b5c.mockapi.io/user";
  private dailyExt = "dailyintake"
  private journalExt = "journal"
  private foodItemExt = "entries"
  // private journalId: number;
  private localStore;



  constructor( private http: Http, private userService: UserService)
  {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getSearchResults(_searchString) {
    // fields to get back from API based on documenation
    let fields = 'item_name,item_id,brand_name,nf_calories,nf_total_fat,nf_saturated_fat,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein';
    let params: URLSearchParams = new URLSearchParams();
    params.set('results', '0:10');
    params.set('appId', this.APP_ID);
    params.set('appKey', this.API_KEY);
    params.set('fields', fields);
    let url = this.BASE_URL + _searchString;
    return this.http.get(url, { search: params })
      .map(res => res.json().hits);
  }

  // setJournalId(input: number) {
  //   this.journalId = input;
  // }

  addToJournal(food:Food, input:number) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let newFood = new Food(food);
    let body = JSON.stringify(newFood);
    // let journal = this.getTodaysJournalEntry();
    let url = `${this.MOCKAPI_URL}/${this.currentUser.id}/${this.journalExt}/${input}/${this.foodItemExt}`;
    this.searchForDailyID2(food, input);
    return this.http.post(url, body, options).map((res: Response) => res.json());
  }

  searchForDailyID(input:number){
    let tempdate = new Date();
    let today: string = "JDATE:" + tempdate.getDate() + "/" + Number((tempdate.getMonth()) + 1) + "/" + tempdate.getFullYear();
    let url = `${this.MOCKAPI_URL}/${this.currentUser.id}/dailyintake?search=${today}`
    return this.http.get(url).map(res => res.json());
  }

  searchForDailyID2(food:Food, input:number){
    let tempdate = new Date();
    let today: string = "JDATE:" + tempdate.getDate() + "/" + Number((tempdate.getMonth()) + 1) + "/" + tempdate.getFullYear();
    let url = `${this.MOCKAPI_URL}/${this.currentUser.id}/dailyintake?search=${today}`
     this.http.get(url).map(res => res.json()).subscribe(
      data =>{
        console.log("before data localStore=" , data);
        this.localStore = data;
        console.log("after data localstore=", this.localStore);
        this.addToDaily(food, this.localStore, input)
      },
      err => {
        console.log("searchForDailyId Error:" ,err);
      }
     );
  }

  addToDaily(food:Food, localdata, input:number){   
    console.log("\n\n\nFood Data", food);
    let temp:number = Number(localdata.totalTotalFat + food.nf_total_fat);
    console.log("\n\n\nTemp Data", temp);

    // localdata.totalCalories = localdata.totalCalories + food.nf_calories;
    // localdata.totalTotalFat += food.nf_total_fat;
    // localdata.totalSaturatedFat += food.nf_saturated_fat;
    // localdata.totalSodium += food.nf_sodium;
    // localdata.totalCarbohydrates += food.nf_total_carbohydrate;
    // localdata.totalFiber += food.nf_dietary_fiber;
    // localdata.totalSugar += food.nf_sugars;
    // localdata.totalProtein += food.nf_protein;

    let url = `${this.MOCKAPI_URL}/${this.currentUser.id}/dailyintake/${input}`;
    let body = JSON.stringify(localdata);
    console.log("\n\n\nAdd to Daily JSON", body);
    this.http.put(url, body).map(res => res.json());

  }


  deleteFromJournal(foodid: number, input:number) {
    return this.http.delete(`${this.MOCKAPI_URL}/${this.currentUser.id}/${this.journalExt}/${input}/${this.foodItemExt}/${foodid}`)
      .map((res: Response) => res.json());
  }

  searchTodaysJournalEntry() {
    let tempdate = new Date();
    let today: string = "JDATE:" + tempdate.getDate() + "/" + Number((tempdate.getMonth()) + 1) + "/" + tempdate.getFullYear();
    let url = `${this.MOCKAPI_URL}/${this.currentUser.id}/journal?search=${today}`;
    return this.http.get(url).map(res => res.json());
  }

  getJournal(input) {
    let url = `${this.MOCKAPI_URL}/${this.currentUser.id}/${this.journalExt}/${input}`
    return this.http.get(url).map(res => res.json());
  }

  makeNewJournalEntry() {
    this.initialJournal();
    this.initialDaily();
  }

  initialDaily(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let tempdate = new Date();
    let today: string = "JDATE:" + tempdate.getDate() + "/" + Number((tempdate.getMonth()) + 1) + "/" + tempdate.getFullYear();    
    let body = {userId:this.currentUser.id, creationDate:today};
    let bodyjson = JSON.stringify(body)
    let url = `${this.MOCKAPI_URL}/${this.currentUser.id}/${this.dailyExt}`;
    return this.http.post(url,bodyjson, options).map(res => res.json());
  }

  initialJournal() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let tempdate = new Date();
    let today: string = "JDATE:" + tempdate.getDate() + "/" + Number((tempdate.getMonth()) + 1) + "/" + tempdate.getFullYear();    
    let body = {userId:this.currentUser.id, creationDate:today};
    let bodyjson = JSON.stringify(body)
    let url = `${this.MOCKAPI_URL}/${this.currentUser.id}/${this.journalExt}`;
    return this.http.post(url,bodyjson, options).map(res => res.json());
  }

}





