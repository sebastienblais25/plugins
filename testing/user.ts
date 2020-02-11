import { urlLoginGet, urlgetidWu, urlEnvList, urlClassesList,urlWorkingType } from './config/url';
import { connexion } from './apiConnect';
import { idWu } from './manager/idWU';
import { Environnement } from './manager/environnement';


export class User{

    /** Send to APi **/
    _username: string = 'hello';
    _password: string = 'hello';
    

    /** Environnement **/
    _environnementSel: string;
    _urlEnvselected:string;

    /** Connexion **/
    _conn: connexion = new connexion();
    
    /** Return of login **/
    _token: string;
    _tokentype: string;
    _expired: number = 3600;
    _rightRead: string;
    _rightWrite: string;

    /** List **/
    _themeAcc: string[];
    _envAcc: Environnement[] = [];
    _equipe:string;
    _idUt:idWu;
    _classeslist:string[];
    _workinType:string[] = [];
    
    

    //Constructor with only username and pasword for the login
    constructor(username?:string, password?:string){
        this._username =  username;
        this._password = password;
    }

    //submit the from to the API
    submitForm():any{
        //To Change
             //create a json and save the file in the download folder 
        let json = '';
        let header:any = this.getInformationToHeader();
        let data:any = this._conn.connexionAPILogin(urlLoginGet,header);


        //Getting the list of environnement and their URL
        this.setListEnv(this._conn.connexionAPI(this.gettoken(), json, urlEnvList, 'Get'));

         //alert(data.access_token);
         if (!data.code){
            this.setDataFromAPI(data.access_token,data.token_type,data.expired, data.scope ,data.theme, data.equipe);
        }else{
            alert(data.code)
        }
         return data;
             
    };

    //Create the list of environnemnt and their url with Pro first
    setListEnv(output:any){
        for (let i in output){
            if(output[i].env === 'PRO'){
                this._envAcc.push(new Environnement(output[i].env,output[i].url))
                break;
            } 
        }
        for (let i in output){
            if(output[i].env != 'PRO'){
                this._envAcc.push(new Environnement(output[i].env,output[i].url))
            }  
        }
    }

    //set the url for the environnemnt selected
    setEnvironnementSelected(env:string){
        for (let i in this._envAcc){
            if(this._envAcc[i]._env === env){
                this._urlEnvselected = this._envAcc[i]._urlEnv;
                //alert(this._urlEnvselected);
                break;
            } 
        }

    }

    //get the infromation out of the form into a string json
    getInformationToHeader():any{
        //get de properties
        let output:any = {
            "usager": this._username,
            "mot_de_passe": this._password,
            "duree_token": this._expired
        };
        //let json:any = JSON.stringify(output)
        return output
    }

    //Ajoute le reste des données obtenu par le login
    setDataFromAPI(token:string,token_type:string,expired:number, scope:string[], theme:string[] , equipe:string){
        this._token = token;
        this._tokentype = token_type;
        this._expired = expired;
        this._rightRead = scope[0];
        this._rightWrite = scope[1];
        this._themeAcc = theme
        this._equipe = equipe;
        //alert(this._rightRead + " " + this._rightWrite);
    }

    //build the list of working unit 
    setidUTtheme(theme:string){
        //json file
        let json:string = "";
        //set the new url and get the connection
        let newUrl = urlgetidWu + theme;
        let output:any =this._conn.connexionAPI(this.gettoken(), json, newUrl, 'Get');
        this._idUt = new idWu(theme,output.value);
        //À enlever Mocking Only
        for(let j in this._idUt._wUnit){
            this._idUt._wUnit[j] = this._idUt._theme + ' - ' + this._idUt._wUnit[j];
        }
        let list=[];
        for(let j in this._idUt._wUnit){
            list.push( { name: this._idUt._wUnit[j], value: this._idUt._wUnit[j]});
        }
        return list;    
    }

    //build a list of workingtype
    setworkingtype(theme:string){
        //json file
        let json:string = "";
        //set the new url and get the connection
        let newUrl = urlWorkingType + theme;
        let output:any =this._conn.connexionAPI(this.gettoken(), json, newUrl, 'Get');
        
        for(let j in output){
            this._workinType.push(output[j].nom);
        }
        let list=[];
        for(let j in this._workinType){
            list.push( { name: this._workinType[j], value: this._workinType[j]});
        }
        return list;
    }

    //Return a list of a theme selected
    getUtravail(theme:string):string[]{
        for (let i in this._idUt){
            if (this._idUt[i].getTheme() == theme){
                return this._idUt[0]._wUnit
            }
        }
        let ret:string[] = ['No value'];
        return ret;
        
    }

    createJsonClasses(theme:string):string{
        let output:any = {
            "fichiers" : theme,
            "chemin_recherche":[
                "ressources/liste_classes"
            ] 
        };

        let json:any = JSON.stringify(output)
        return json 
    }

    getlistofclasses(theme:string):any{
        
        theme = theme + ':ress.json'
        let json = this.createJsonClasses(theme);
        let data:any = this._conn.connexionAPI(this.gettoken(), json , urlClassesList,'GET');
        this._classeslist = data.value.liste_classe;
        //alert(this._classeslist);
    }

    //accessor
    /*Username */
    getusername(): string {
        return this._username;
    }
    setusername(value: string) {
        this._username = value;
    }

    /*Password */
    getpassword(): string {
        return this._password;
    }
    setpassword(value: string) {
        this._password = value;
    }

    /*Conn */
    getconn(): connexion {
        return this._conn;
    }
    setconn(value: connexion) {
        this._conn = value;
    }

    /*Token */
    gettoken(): string {
        return this._token;
    }
    settoken(value: string) {
        this._token = value;
    }

    /*Tokentype */
    gettokentype(): string {
        return this._tokentype;
    }
    settokentype(value: string) {
        this._tokentype = value;
    }

    /*Expired */
    getexpired(): number {
        return this._expired;
    }
    setexpired(value: number) {
        this._expired = value;
    }

    /* RightRead*/
    getrightRead(): string {
        return this._rightRead;
    }
    setrightRead(value: string) {
        this._rightRead = value;
    }

    /*RightWrite */
    getrightWrite(): string {
        return this._rightWrite;
    }
    setrightWrite(value: string) {
        this._rightWrite = value;
    }
    //List de theme
    getthemeAcc(): string[] {
        return this._themeAcc;
    }
    setthemeAcc(value: string[]) {
        this._themeAcc = value;
    }

    //liste d' environnement
    getenvAcc(): Environnement[] {
        return this._envAcc;
    }
    setenvAcc(value: Environnement[]) {
        this._envAcc = value;
    }

}