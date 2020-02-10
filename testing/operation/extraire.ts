

const FileSaver = require('file-saver'); // le import
import {urlgeoDataGet} from '../config/url';
import { connexion } from '../apiConnect';
import { User } from '../user';

export class Extraire{

    /*********** Properties ***********/

    _conn :connexion= new connexion();
    _environnement: string;
    _theme: string;
    _idUT: string;
    _clip: string;
    _whereClause: string;
    _geom: string;
    //data from API
    _data:any;
    
    
    /************* Constructor *************/
    constructor(theme:string, idUT:string, clip:string,whereClause:string, geom:string){
        this._theme = theme;
        this._idUT = idUT;
        this._clip = clip;
        this._whereClause = whereClause;
        this._geom = geom;
    }

    /************* Methods *************/

    //Send json form to API in ajax
    submitForm(log:User):any{
       //To Change
            //create a json and save the file in the download folder 
        let json:any = this.getInformationToJson(log);
        //this.saveJson(json)
        this.setData(this._conn.connexionAPI(log.gettoken(), json,urlgeoDataGet, 'Get'));

        //for test
        if(this.getinfo() == 'success'){
            return this.getinfo();
        }else{
            alert(this.getinfo().status);
            return this.getinfo().status;
        }      
   };

   /*setHeader(token:string):string{
       let output:any ={
        'Authorization': `Bearer ${token}`
       };
        return output;
   }*/ 

    //get the infromation out of the form into a string json
    getInformationToJson(log:User):any{
        //get de properties
        let output:any = {
            "theme": this._theme,
            "id_lot": this._idUT,
            "clip": this._clip,
            "where_clause" : this._whereClause,
            "geom": this._geom
        };
        let json:any = JSON.stringify(output)
        return json
    }

    //put a json string into a blob and export into a json file in download file
    saveJson(output:any):void{
        let blob = new Blob([output],{type:"application/json"});
        FileSaver.saveAs(blob,'export.json');
    }

    /*************** Accessors ***********************/
   getinfo(){
       return this._data;
   }

    getEnvironnement():string{
        return this._environnement;
    }

    getTheme():string{
        return this._theme;
    }

    getidUT():string{
        return this._idUT;
    }

    getclip():string{
        return this._clip;
    }

    getwhereClause():string{
        return this._whereClause;
    }

    getgeom(): string {
        return this._geom;
    }

    setEnvironnement(env:string):void{
        this._environnement = env
    }

    setTheme(them:string):void{
        this._theme = them;
    }

    setidUT(idUT:string):void{
        this._idUT = idUT;
    }

    setclip(clip:string):void{
        this._clip= clip;
    }

    setdatefinpr(v : string) {
        this._whereClause = v;
    }

    setgeom(value: string) {
        this._geom = value;
    }

    setData(data:any){
        this._data = data;
    }


}
