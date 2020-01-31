import { connexion } from "../apiConnect";


export class planifier{

    /*********** Properties ***********/
    _conn: connexion = new connexion();
    _environnement: string;
    _theme: string;
    _zonetravail: string;
    _idUT: string;
    _typetravail: string;
    _classes: string[];
    _datefinpre: string;  
    _logfile: string;

    /*********** Constructor ***********/

    constructor(env:string,theme:string,zt:string,idut:string,tt:string,classes:string[],datefin:string,logfile:string){
        this._environnement
        this._theme
        this._zonetravail
        this._idUT
        this._typetravail
    }

    /************* Methods *************/

    //create a drop list for the template
   interactiveDropDownList(list:string[]):string{
    let ddl:string= "";
    for (let i in list) {
        ddl += `<option value="` + list[i] + `">`+ list[i] + `</option>`
    }   ;
    return ddl;
}

    //get the infromation out of the form into a string json
    getInformationToJson():any{
        //get de properties
        let output:any = {
            "env": this.getenvironnement(),
            "theme": this.gettheme(),
            "zonetravail": this.getzonetravail(),
            "id_ut": this.getidUT(),
            "typetravail" : this.gettypetravail(),
            "classes": this.getclasses(),
            "date_fin_prevu": this.getdatefinpre(),
            "log": this.getlogfile()
        };
        let json:any = JSON.stringify(output)
        return json
    }


    /******** Accessors *********/

    //Connexion a l'API
    getconn(): connexion {
        return this._conn;
    }
    setconn(value: connexion) {
        this._conn = value;
    }

    //Environnement
    getenvironnement(): string {
        return this._environnement;
    }
    setenvironnement(value: string) {
        this._environnement = value;
    }

    //theme
    gettheme(): string {
        return this._theme;
    }
    settheme(value: string) {
        this._theme = value;
    }

    //zone de travail
    getzonetravail(): string {
        return this._zonetravail;
    }
    setzonetravail(value: string) {
        this._zonetravail = value;
    }

    //identifiant d'unité de travail
    getidUT(): string {
        return this._idUT;
    }
    setidUT(value: string) {
        this._idUT = value;
    }

    //type de travail
    gettypetravail(): string {
        return this._typetravail;
    }
    settypetravail(value: string) {
        this._typetravail = value;
    }

    //classes
    getclasses(): string[] {
        return this._classes;
    }
    setclasses(value: string[]) {
        this._classes = value;
    }

    //datefinprevu
    getdatefinpre(): string {
        return this._datefinpre;
    }
    setdatefinpre(value: string) {
        this._datefinpre = value;
    }

    //logfile
    getlogfile(): string {
        return this._logfile;
    }
    setlogfile(value: string) {
        this._logfile = value;
    }
}