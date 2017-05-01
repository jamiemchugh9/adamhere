export class Journal {
    
    journalId: number;
    userId:number;
    creationDate: string;
   
    constructor(obj:any){
        this.journalId = obj.journalId;
        this.userId = obj.userId;
        this.creationDate = obj.creationDate;
    }

    setCreationDate(input:string){
        this.creationDate = input;
    }
    


}
