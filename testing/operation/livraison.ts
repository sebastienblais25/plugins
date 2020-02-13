import { connexion } from "../apiConnect";
import { User } from '../user';
import { urlDeliveryUpdate } from "../config/url";


export class Livraison{

    _theme:string;
    _idUt:string;
    _typeConn:string;
    _conn :connexion= new connexion();

    constructor(){};

    submitForm(form:any, log:User){
        console.log(form);
        let apire:any = this._conn.connexionAPI(log.gettoken(), form , log.constructUrl(urlDeliveryUpdate, 'hello'), 'Put');

        alert(apire);
        //for test
        if(apire == 'success'){
            //alert( this.getinfo());
            return apire;
        }else{
            //alert(this.getinfo().status);
            return apire.status;
        }      
    }


}
