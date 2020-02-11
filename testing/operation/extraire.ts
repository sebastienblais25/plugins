

const FileSaver = require('file-saver'); // le import
import {urlgeoDataGet,urlgeoDatGetId} from '../config/url';
import { connexion } from '../apiConnect';
import { User } from '../user';

export class Extraire{

    /*********** Properties ***********/

    _conn :connexion= new connexion();
    _theme: string;
    _idUT: string;
    _listClasses:string[];
    _clip: string;
    _whereClause: string;
    _geom: string;
    //data from API
    _data:any;
    
    
    /************* Constructor *************/
    constructor(theme:string, idUT?:string, clip?:string,whereClause?:string, geom?:string){
        this._theme = theme;
        this._idUT = idUT;
        this._clip = clip;
        this._whereClause = whereClause;
        this._geom = geom;
    }

    /************* Methods *************/

    //Send json form to API in ajax
    submitForm(log:User):any{
        //create a json and save the file in the download folder 
        let json:string = "";
        let url:string;
        
        if(this._idUT === ""){
            json =  this.getInformationToJsonSR();
            url = urlgeoDataGet
            alert(json + ' 1')
        }else{
            url = urlgeoDatGetId + this._idUT
            alert('extract planned' + ' 1')
        }
        //this.saveJson(json)
        
        this.setData(this._conn.connexionAPI(log.gettoken(), json, url, 'Get'));

        //for test
        if(this.getinfo() == 'success'){
            //alert( this.getinfo());
            return this.getinfo();
        }else{
            //alert(this.getinfo().status);
            return this.getinfo().status;
        }      
   };

   setInfoForSR(list:string[],clip:string,whereClause:string, geom:string){
    this._idUT = "";
    this._listClasses = list;
    this._clip = clip;
    this._whereClause = whereClause;
    this._geom = geom;
   }

    //get the infromation out of the form into a string json
    

    getInformationToJsonSR():any{
        //get de properties
        let output:any = {
            "theme": this._theme,
            "liste_classes": this._listClasses,
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
