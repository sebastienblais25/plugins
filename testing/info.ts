const FileSaver = require('file-saver'); // le import

export class Info{
    _environnement: string;
    _theme: string;
    _zonetravail: string;
    _typetravail: string;
    _datefinpr: string;
    _form:string;

    constructor(env:string, theme:string, zonet:string, typet:string,datefin:string){
        this._environnement = env;
        this._theme = theme;
        this._zonetravail = zonet;
        this._typetravail =typet;
        this._datefinpr = datefin;
    }

    getFormPanifiez(dropdown:string):string{
        this._form = 
        `<div tabindex="-2" ng-controller="SubmitPlanZT as ctrl">
            <ul class="rv-list">
                <li>
                    
                        Environnement:<br>
                        <input type="text" name="env" id="env" value="Pro">
                        <br>

                        Sélectionner le thème:<br>
                        <select type="text" name="theme" id="theme" placeholder="Select something">
                        `+ dropdown +`
                        </select>
                        <br>

                        Sélectionner la source de la zone de travail:<br>
                        <input type="text" name="ZT" id="ZT" value="1">
                        <br>

                        Sélectionner le type de travail:<br>
                        <input type="text" name="TT" value="Ajout">
                        <br>

                        Ajouter une géométrie:<br>
                        <input type="text" name="geom" id="geom" value="geom">
                        <br>

                        Date de fin prévue:<br>
                        <input type="date" name="datefin" value="">
                        <br><br>
                
                
                        <md-button name="submit" id="submit" value="Submit ng-click="">Submit</md-button>
                </li>   
            </ul>
        </div>`;

        return this._form
    }

    getEnvironnement():string{
        return this._environnement;
    }

    getTheme():string{
        return this._theme;
    }

    getZonetravail():string{
        return this._zonetravail;
    }

    getTypetravail():string{
        return this._typetravail;
    }

    getdatefinpr():string{
        return this._datefinpr;
    }

    setEnvironnement(env:string):void{
        this._environnement = env
    }

    setTheme(them:string):void{
        this._theme = them;
    }

    setZonetravail(zt:string):void{
        this._zonetravail = zt;
    }

    setTypetravail(tt:string):void{
        this._typetravail= tt;
    }

    setdatefinpr(v : string) {
        this._datefinpr = v;
    }

    /*setAll(en:string, th:string, zt:string, tt:string, datf:string):void{
        this._environnement =en;
        this._theme = th;
        this._zonetravail = zt;
        this._typetravail = tt;
        this._datefinpr = datf;
    }*/

    //get the infromation out of the form into a string json
    getInformationToJson():any{
        //get de properties
        
        /***** Tochange ********/
        let output:any = {
            "env": (<HTMLInputElement>document.getElementById("env")).value,
            "theme": (<HTMLInputElement>document.getElementById("theme")).value,
            "id_lot": (<HTMLInputElement>document.getElementById("ZT")).value,
            "clip": "oui",
            "geom": (<HTMLInputElement>document.getElementById("geom")).value
        };
        /************ **********/
        let json:any = JSON.stringify(output)
        return json
    }

    //put a json string into a blob and export into a json file in download file
    transfromIntoJson():void{
        let blob = new Blob([this.getInformationToJson()],{type:"application/json"});
        FileSaver.saveAs(blob,'export.json');
    }

    interactiveDropDownList(/* parametre du json */):string{
        let list = ["Hydro","Route","building"]
        let ddl:string= "";
        for (let i in list) {
            ddl += `<option value="` + list[i] + `">`+ list[i] + `</option>`
        }   
        return ddl;
    }

    
    //si le button est pas en Angular
    submitForm(_RV:any):void{
         // get current language
         const lang = _RV.getCurrentLang();
        
        //To Change
         $("#submit").click(function() {
             
             alert('You clicked on point ');
             //var blob = new Blob(["Hello, world!"], {type:"application/json"});
             //FileSaver.saveAs(blob, "hello world.json");
             //create a json and save the file in the download folder
             let output:any = {
                "env": (<HTMLInputElement>document.getElementById("env")).value,
                "theme": (<HTMLInputElement>document.getElementById("theme")).value,
                "id_lot": (<HTMLInputElement>document.getElementById("ZT")).value,
                "clip": "oui",
                "geom": (<HTMLInputElement>document.getElementById("geom")).value
            };
    
            let json:any = JSON.stringify(output)
 
             
             let blob = new Blob([json],{type:"application/json"});
             FileSaver.saveAs(blob,'export.json');
 
 
             // pour appel à l'API
             /*const promises = [];
             promises.push(
                 new Promise(resolve =>{
                 $.ajax({
                     url: '',
                     cache:false,
                     data:json,
                     dataType:'json',
                     success: data=>resolve()
                 });  
             })
             );
             Promise.all(promises).then(values => {
                 alert('all good');
             });*/

         });
    };

    /*translateform(_RV:any):string{
        let output:string = this.getFormPanifiez();
        output.replace(/{pt.y}/,Info.prototype.translations[_RV.getCurrentLang()].envir)


        return output;
    }*/

    
}

//parametre pour les le planifiez ZT
export interface Info{
    translations:any;
}


//translate form english to french
Info.prototype.translations = {
    'en-CA': {
        testbutton: 'Testing',
        envir: 'Environnement1',
        themet: 'Theme',
        zoneTrv: 'Working Zone',
        typeTrv: 'Working Type',
        datefinprv: 'Final date planned',
        geome: 'Geometry'
        
    },

    'fr-CA': {
        testbutton: 'testing',
        envir: 'Environnement2',
        themet: 'Theme',
        zoneTrv: 'Zone de travail',
        typeTrv: 'Type de travail',
        datefinprv: 'Date fin prévue',
        geome: 'Géométrie'   
    }
};