import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 

import { Router } from '@angular/router';
import { Food, Journal } from './index';
import { User } from '../-models/index';
import { BmiService } from '../bmi-calculator/index';
import { UserService } from '../-services/index';
import { NutritionixService } from './nutritionix.service';

import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-nutritionix',
  templateUrl: './nutritionix.component.html',
  styleUrls: ['./nutritionix.component.css']
})
export class NutritionixComponent implements OnInit {
  //array of items found
  items = [];
  foodObj;
  resultArray;
  currentUser: User;
  show:boolean = false;
  jentries = [];
  journalId:number;
  totalCal:number = 0;
  totalCal2:number = 0;
  totalFat:number = 0;
  totalSaturated: number = 0;
  totalCarb:number = 0;
  totalSugar:number = 0;
  totalProtein:number = 0;
  totalSodium:number = 0;
  totalFiber:number = 0;
  bmr:number ;
  weight:number;
  height:number;
  goalWeight:number;
  age:number;
  out:string;


  //search string
  searchQuery;

  
  constructor(private nutritionixService: NutritionixService, private bmiService: BmiService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): any {
      this.getTodaysJournalId(); 
      this.getJournalFromService();
      this.getUserInfo(this.currentUser);
      this.calcBmr();
;  }

  ngAfterViewInit(){
    // this.getTodaysJournalId();  
    // this.getJournalFromService(); 
  }

  //gets items from nutritionx search endpoint
  getItems(term: string) {
    let q = term;
    if (q == '' || q.length < 3) {
      return;
    }

    this.nutritionixService.getSearchResults(q).subscribe(
      data => {
        console.log('search results', data/*.hits*/)
        this.items = data
      },
      (err) => alert("Error searching: " + err)
    )
  }

  addFoodToJournal(term) {
    this.nutritionixService.addToJournal(term, this.journalId).subscribe(
      data => {
        this.nutritionixService.getJournal(this.journalId);        
        return true;
      },
      error => {
        console.log("Error adding food to Journal");
      }
    );
  }
  
    
  getTodaysJournalId(){
    this.nutritionixService.searchTodaysJournalEntry().subscribe(
      data => {
        if((data.length) != 0)
        {
          // console.log("Data lenght " + data.length);
          let j1 = new Journal(data[0]);
          this.journalId = data[0].journalId;
          console.log("Todays Journal ID retrieved: " + data[0].journalId);            
        }
        else
        {    
          // console.log("Data " + data.length);
          this.nutritionixService.makeNewJournalEntry();                        
        }
      },
      err => console.error(err),
      () => console.log("getTodaysJournalId finished...")
    );
  }


  getJournalFromService() {
    this.nutritionixService.getJournal(this.journalId).subscribe(
      data => { 
        console.log('\n\nGetJournalFromService Results: ', data);
        this.totalCal = 0;
        this.totalCarb = 0;
        this.totalFat = 0;
        this.totalSugar = 0;
        this.totalSodium  = 0;
        this.totalProtein = 0;
        this.totalSaturated = 0;
        this.totalFiber = 0;
        this.jentries = data.fooditems ;
        for(let i in this.jentries){
          this.totalCal += this.jentries[i].nf_calories;
          this.totalCal2 = this.jentries[i].nf_calories;
          this.totalFat += this.jentries[i].nf_total_fat;
          this.totalCarb += this.jentries[i].nf_total_carbohydrate;
          this.totalSugar += this.jentries[i].nf_sugars;
          this.totalProtein += this.jentries[i].nf_protein;
          this.totalSodium += this.jentries[i].nf_sodium;
          this.totalSaturated += this.jentries[i].nf_saturated_fat;
          this.totalFiber += this.jentries[i].nf_dietary_fiber;

        }
        console.log('search results', this.jentries);
      },
      err => console.error(err),
      () => console.log('...done loading entries')
    );
  }

  
  deleteFood(food) {
    if (confirm("Delete entry: " + food.item_name + "?")) {
      this.nutritionixService.deleteFromJournal(food.item_id, this.journalId).subscribe(
        data => {
          this.getJournalFromService();
        }
      )
    }
  }
      getUserInfo(elephant){
    this.bmiService.getOneInfo(elephant.id).subscribe(
      data => {
          console.log('search results', data)
          
          this.weight = data.weight;
          this.height = data.height;
          this.goalWeight = data.goalWeight;
          this.age = data.age;
    },    
      (err) => alert("Error getting user information:" + err)
    )
  }
  calcBmr() {
        this.bmr = 66 + (13.17 * this.weight) + (5 * (this.height * 100) - (6.8 * this.age));
        return this.bmr;
    }

    calToBmr(){
      if(this.bmr > this.totalCal)
      {
        this.out = "Good Work! Keep it up"
      }
      else{
        this.out = "You'll Have to do Better Than That!";
      }
      return this.out;
    }



    





}
