

const FileSaver = require('file-saver'); // le import
import {urlgeoDataGet} from './url';
import { connexion } from './apiConnect';

export class Extraire{
    _conn :connexion= new connexion();
    _environnement: string;
    _theme: string;
    _idLot: string;
    _clip: string;
    _whereClause: string;
    _geom: string;
    _data:any;
    
    
    //Constructor
    constructor(env:string, theme:string, idLot:string, clip:string,whereClause:string, geom:string){
        this._environnement = env;
        this._theme = theme;
        this._idLot = idLot;
        this._clip = clip;
        this._whereClause = whereClause;
        this._geom = geom;
    }

    //Send json form to API in ajax
    submitForm(token:string):any{
       //To Change
            //create a json and save the file in the download folder 
        let json:any = this.getInformationToJson();
        //this.saveJson(json)
        this.SetData(this._conn.connexionAPI(token, json,urlgeoDataGet));

        //for test
        if(this.getinfo().value){
            alert(this.getinfo().value);
        }
        return this.getinfo().value;
            
   };

   /*setHeader(token:string):string{
       let output:any ={
        'Authorization': `Bearer ${token}`
       };
        return output;
   }*/

   //create a drop list for the template
   interactiveDropDownList(list:string[]):string{
    let ddl:string= "";
    for (let i in list) {
        ddl += `<option value="` + list[i] + `">`+ list[i] + `</option>`
    }   ;
    return ddl;
}  

   getinfo(){
       return this._data;
   }

    getEnvironnement():string{
        return this._environnement;
    }

    getTheme():string{
        return this._theme;
    }

    getidLot():string{
        return this._idLot;
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

    setidLot(zt:string):void{
        this._idLot = zt;
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

    SetData(data:any){
        this._data = data;
    }

    //get the infromation out of the form into a string json
    getInformationToJson():any{
        //get de properties
        let output:any = {
            "env": this._environnement,
            "theme": this._theme,
            "id_lot": this._idLot,
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
}

//parametre pour les le planifiez ZT
export interface Extraire{
    
}
