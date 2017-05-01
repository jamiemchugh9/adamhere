export class User2 {
    id: number;
    username: string;
    weight: number; //kg
    height: number; //meters
    goalWeight: number;


 constructor(obj:any){
        this.id = obj.id;
        this.username = obj.username;
        this.weight = obj.weight;
        this.height = obj.height;
        this.goalWeight = obj.goalWeight;
       
 }
}