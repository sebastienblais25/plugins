const FileSaver = require('file-saver'); // le import
import {urlgeoDataGet} from './url';

export class Planifier{
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
        this._clip =clip;
        this._whereClause = whereClause;
        this._geom = geom;
    }

    //Send json form to API in ajax
    submitForm(token:string):any{
        let outputValue:any;
        
       //To Change
            //create a json and save the file in the download folder
            
        let json:any = this.getInformationToJson();
        //this.saveJson(json);

        //console.log("hello");

        /********* API CALL **********/
        //no promise still
        const promises = [];
        promises.push(
            new Promise(resolve =>{
                $.ajax({
                    url: urlgeoDataGet,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    type: 'GET',
                    async: false,
                    cache:false,
                    data:json,
                    dataType:'json',
                    success: //data => resolve()
                    
                    function(response){
                        outputValue = response;
                        console.log(outputValue.value);
                        
                    }
                })
                /*.done(function(data){
                    console.log('success', data)
                    outputValue = data;
                })
                .fail(function(xhr){
                    console.log('error',xhr)
                });*/
           })
        );
       Promise.all(promises).then(values => {
            console.log(values[1]);
        });
        console.log();
        return outputValue;
            
   };

   getinfo(data:any){
       this._data = data
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

    

    /*translateform(_RV:any):string{
        let output:string = this.getFormPanifiez();
        output.replace(/{pt.y}/,Info.prototype.translations[_RV.getCurrentLang()].envir)


        return output;
    }*/

    
}

//parametre pour les le planifiez ZT
export interface Planifier{
    
}
