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
        console.log(this._envopt);
        //console.log(form.get('fichier_data'));
        let apire:any = this._conn.connexionAPIFormData(log.gettoken(), form , log.constructUrl(urlDeliveryUpdate, this._idUt), method, this._envopt);

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
