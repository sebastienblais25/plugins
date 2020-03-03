import { connexion } from "../apiConnect";
import { User } from '../user';
import { urlDeliveryUpdate } from "../config/url";


export class Livraison{

    _theme:string;
    _idUt:string;
    _typeConn:string;
    _conn :connexion= new connexion();
    _envopt:string = '';

    constructor(idut:string,theme:string, typeconn:string){
        this._idUt = idut;
        this._theme = theme;
        this._typeConn =typeconn;
    };

    submitForm(form:any, log:User){
        let method:string;
        if(this._typeConn === 'Update'){
            method = 'Put';
        }else{
            method = 'Post'
        }
         let token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODMyNTgxNzAsIm5iZiI6MTU4MzI1ODE3MCwiZXhwIjoxNTgzMjY2MTcwLCJpc3MiOiJOUkNhbiIsInN1YiI6IjEyMzQ1Njc4OTAiLCJub21fdXNhZ2VyIjoidG90byIsInNjb3BlIjpbMTAxMDIsMTAxMDFdLCJ0aGVtZSI6WzEwMzAyLDEwMzAxXSwiZXF1aXBlcyI6WzQ1Nl0sImF3c19hY2Nlc3MiOnsiZGVzYyI6ImJsYSBibGEiLCJpZCI6ImNsZV9hd3NfMDEiLCJhY2Nlc19pZCI6ImFhYWFhYSIsImFjY2VzX3NlY3JldCI6ImJiYmJiYiJ9fQ.1AzvAevyqIMWPJhgaoOQdr0W8Xys1EAzgKKLHKg72QU';

        let apire:any = this._conn.connexionAPIFormData(token/*log.gettoken()*/, form , log.constructUrl(urlDeliveryUpdate,/* this._idUt*/), method);

        console.log(apire);
        //for test
        if(apire == 'success'){
            //alert( this.getinfo());
            return apire;
        }else{
            //alert(this.getinfo().status);
            return apire;
        }      
    }

    /**
    * Set an optionnal environnement for the header of the json
    * @param {string} env the optionnal environnement
    * @memberof Livraison
    */
   setOptionnalEnvironnement(env:string){
    let optEnv:string = `'env_app' : ${env}`;
    //console.log(optEnv);
    this._envopt = optEnv;
}

}
