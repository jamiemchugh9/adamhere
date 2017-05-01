import { User } from '../-models/index';


export class Food {
    item_id: number | string;
    item_name: string;
    brand_name: string;
    nf_calories: number;
    nf_total_fat: number;
    nf_saturated_fat: number;
    nf_sodium: number;
    nf_total_carbohydrate: number;
    nf_dietary_fiber: number;
    nf_sugars: number;
    nf_protein: number;    
    // createdAt: Date;
    // entryId: string;
    // userId: number;
    // currentUser: User;
   
    constructor(obj:any){
        this.item_id = obj.item_id;
        this.item_name = obj.item_name;
        this.brand_name = obj.brand_name;
        this.nf_calories = obj.nf_calories;
        this.nf_total_fat = obj.nf_total_fat;
        this.nf_saturated_fat = obj.nf_saturated_fat;
        this.nf_sodium = obj.nf_sodium;
        this.nf_total_carbohydrate = obj.nf_total_carbohydrate;
        this.nf_dietary_fiber = obj.nf_dietary_fiber;
        this.nf_sugars = obj.nf_sugars;
        this.nf_protein = obj.nf_protein;  
        
    //     let now = new Date();
    //    //this.userId = "Fakedata";
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     this.userId =  currentUser.id;
    //     let month = now.getMonth()+1;
        
    //     this.entryId = now.getFullYear() + ""+ month + ""+ now.getDate() + this.userId;
    //     this.createdAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13);
    }

}