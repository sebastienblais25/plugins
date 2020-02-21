import { connexion } from "../apiConnect";
import { User } from '../user';
import { urlValidateMD } from "../config/url";


export class Valider{

    _conn :connexion= new connexion();

    constructor(){  
    };

    submitForm(form:any, log:User){
        console.log(form.get('fichier_data'));
        let apire:any = this._conn.connexionAPIFormData(log.gettoken(), form , log.constructUrl(urlValidateMD), 'Post');
        //alert(apire);
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