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
    
    
    /**
     *Creates an instance of User. with only the username and a password for the connections
     * @param {string} [username] name of the user
     * @param {string} [password] password of the user
     * @memberof User
     */
    constructor(username?:string, password?:string){
        this._username =  username;
        this._password = password;
    }

    /**
     *Contruct an url with the environnement selected and the url for the action
     * @param {string} url url of the action
     * @param {string} [adding] add the theme or id at the end (optional)
     * @returns {string}
     * @memberof User
     */
    constructUrl(url:string, adding:string=''):string{
        return /*this._urlEnvselected*/ url + adding
    }

    /**
     * With the connexion to the APi send a json file with the username and the password in the header to get
     * the token for the rest of the connexion.
     * @returns {*} the data from the API. we dont know the return of the API so ANY.
     * @memberof User
     */
    submitForm():any{
        //To Change
             //create a json and save the file in the download folder 
        let json = '';
        let header:any = this.getInformationToHeader();
        let data:any = this._conn.connexionAPILogin(this.constructUrl(urlLoginGet),header);
        //Getting the list of environnement and their URL
        this.setListEnv(this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(urlEnvList), 'Get'));

         //alert(data.access_token);
         if (!data.code){
            this.setDataFromAPI(data.access_token,data.token_type,data.expired, data.scope ,data.theme, data.equipe);
        }else{
            alert(data.code)
        }
         return data;
             
    };

    /**
     * Create the list of environnement and their url and place the PRO environnment in first
     * @param {*} output its the data from API.
     * @memberof User
     */
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

    /**
     * Set the environnement url to a properties with the environnement selected
     * @param {string} env the environnement selected by the user
     * @memberof User
     */
    setEnvironnementSelected(env:string){
        for (let i in this._envAcc){
            if(this._envAcc[i]._env === env){
                this._urlEnvselected = this._envAcc[i]._urlEnv;
                //alert(this._urlEnvselected);
                break;
            } 
        }

    }

    /**
     * put the information of the user in a header for the first connexion to the API
     * @returns {*}
     * @memberof User
     */
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
    /**
     * build the object for the working unit id and setting the theme in front for the mocking
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working unit id with a name and a value for a dropdownlist
     * @memberof User
     */
    setidUTtheme(theme:string){
        //json file
        let json:string = "";
        //set the new url and get the connection 
        let output:any =this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(urlgetidWu + theme), 'Get');
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
    /**
     * build the list for the working type and
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working type name with a name and a value for a dropdownlist
     * @memberof User
     */
    setworkingtype(theme:string){
        //json file
        let json:string = "";
        //set the new url and get the connection
        let output:any =this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(urlWorkingType + theme), 'Get');
        
        for(let j in output){
            this._workinType.push(output[j].nom);
        }
        let list=[];
        for(let j in this._workinType){
            list.push( { name: this._workinType[j], value: this._workinType[j]});
        }
        return list;
    }

    /**
     * create a json file for getting a list of classes 
     * mostly hardcoded.
     * @param {string} theme the theme selected by the user
     * @returns {string} return a raw json
     * @memberof User
     */
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

    /**
     * the call to get the classes needed from the API 
     * @param {string} theme the theme selected by the user
     * @memberof User
     */
    getlistofclasses(theme:string){
        
        theme = theme + ':ress.json'
        let json = this.createJsonClasses(theme);
        let data:any = this._conn.connexionAPI(this.gettoken(), json , this.constructUrl(urlClassesList),'GET');
        this._classeslist = data.value.liste_classe;
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