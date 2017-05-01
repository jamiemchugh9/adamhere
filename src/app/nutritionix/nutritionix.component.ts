import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 

import { Router } from '@angular/router';
import { Food, Journal } from './index';
import { User } from '../-models/index';

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

  //search string
  searchQuery;

  
  constructor(private nutritionixService: NutritionixService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): any {
      this.getTodaysJournalId(); 
      this.getJournalFromService();
  }

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
        this.jentries = data.fooditems ;
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






}
