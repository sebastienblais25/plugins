import { urlLoginGet, urlgetidWu, urlEnvList,
     urlClassesList,urlWorkingType, urlGetCode } from './config/url';
import { Connexion } from './apiConnect';
import { idWu } from './manager/idWU';
import { Environnement } from './manager/environnement';
import { ApiReturn } from './ApiReturn';


export class User{

    /** Send to APi **/
    _username: string;
    _password: string;

    /** Environnement **/
    _environnementSel: string;
    _urlEnvselected:string;
    _basetheme:string;

    /** Connexion **/
    _conn: Connexion = new Connexion();
    
    /** Return of login **/
    _token: string;
    _tokentype: string;
    _expired: number = 3600;
    _rightRead:ApiReturn;
    _rightWrite:ApiReturn;

    /** List **/
    _themeAcc:ApiReturn[] = [];
    _envAcc: Environnement[] = [];
    _equipe:ApiReturn;
    _idUt:idWu;
    _classeslist:string[];
    _workinType:ApiReturn[] = [];

    /** other **/
    _geom:string;
    _advanced:boolean = false;
    _closeable:boolean = true; 
    
    
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
        return /*this._urlEnvselected*/'http://127.0.0.1:4010/' + url + adding
    }

    /**
     * With the connexion to the APi send a json file with the username and the password in the header to get
     * the token for the rest of the connexion.
     * @returns {*} the data from the API. we dont know the return of the API so ANY.
     * @memberof User
     */
    submitForm(config:any):any{
        //To Change
             //create a json and save the file in the download folder 
        let json = '';
        let data: any;
        let header:any = this.getInformationToHeader();
        data = this._conn.connexionAPILogin(this.constructUrl(urlLoginGet),header);
        //console.log(data);
        //Getting the list of environnement and their URL
        this.setListEnv(this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(urlEnvList), 'Get'));

         //alert(data.access_token);
        if (!data.code){
            this.setDataFromAPI(data.access_token,data.token_type,data.expired, data.scope ,data.theme, data.equipe,config);
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

    /**
     * sett all the info information obtain form a login into the properties of the class
     * @param {string} token
     * @param {string} token_type
     * @param {number} expired
     * @param {string[]} scope
     * @param {string[]} theme
     * @param {string} equipe
     * @memberof User
     */
    setDataFromAPI(token:string,token_type:string,expired:number, scope:string[], theme:string[] , equipe:string,config:any){
        this._token = token;
        this._tokentype = token_type;
        this._expired = expired;
        this._rightRead = new ApiReturn(scope[0]);
        this._rightWrite = new ApiReturn(scope[1]);
        this._equipe = new ApiReturn(equipe);
        this._basetheme = config.base_theme;
        //alert(this._rightRead + " " + this._rightWrite);
        let ordertheme:any =this.orderThemeList(theme,config);
        for (let i in ordertheme){
            this._themeAcc.push(new ApiReturn(ordertheme[i]));
            this.getinfoForCode(ordertheme[i],i)
        }
        this.callAPIWorkingUnit(this._basetheme);
        this.callAPIListeClasse(this._basetheme);
        this.callAPIWorkingType(this._basetheme);   
    }


    /**
     * call Api for a list of working unit 
     * @param {string} theme the theme related to the working unit
     * @memberof User
     */
    callAPIWorkingUnit(theme:string){
        let json = '';
        let output:any =this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(urlgetidWu + theme), 'Get');
        this._idUt = new idWu(theme,output.value);
        //À enlever Mocking Only
        for(let j in this._idUt._wUnit){
            this._idUt._wUnit[j] = this._idUt._theme + ' - ' + this._idUt._wUnit[j];
        }
    }

    /**
     * call the API for a list of classes
     * @param {string} theme the theme related to the list of classes
     * @memberof User
     */
    callAPIListeClasse(theme:string){
        let resstheme:string = theme + ':ress.json'
        let ressjson = this.createJsonRessources(resstheme/*,path */);
        let data:any = /*{
            "value": {
                "liste_classe": [
                    "waterbody_2",
                    "water_linear_flow_1",
                    "dam_2"
                ]
            }
        };*/this._conn.connexionAPI(this.gettoken(), ressjson , this.constructUrl(urlClassesList),'Get');
        this._classeslist = data.value.liste_classe;
    }

    /**
     * call the API for a list of working type
     * @param {string} theme the theme related to the working type
     * @memberof User
     */
    callAPIWorkingType(theme:string){
        let json = '';
        let ttoutput:any =this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(urlWorkingType + theme), 'Get');
        this._workinType = [];
        for(let j in ttoutput){
            this._workinType.push(new ApiReturn(ttoutput[j].id));
            this._workinType[j].setRemaining(ttoutput[j].id_list_code, ttoutput[j].nom,ttoutput[j].desc_en, ttoutput[j].desc_fr);
        }
    }

    /**
     * ordering the list to set the base theme in first place
     * @param {string[]} theme list of theme
     * @param {*} config the base theme
     * @returns
     * @memberof User
     */
    orderThemeList(theme:string[],config:any){
        let newtheme:string[] = [];
        for (let i in theme){
            if(theme[i] === config.base_theme){
                newtheme.push(theme[i]);
                break;
            } 
        }
        for (let i in theme){
            if(theme[i]!= config.base_theme){
                newtheme.push(theme[i]);
            }  
        }
        return newtheme
    }
    /**
     * Get all the information of a code into the properties _themeAcc
     * @param {string} theme the code of the theme to get all of his info
     * @param {string} rank the rankl of the list _themeAcc
     * @memberof User
     */
    getinfoForCode(theme:string, rank:string){
        let json:string ='';
        let data:any;
        data = this._conn.connexionAPI(this.gettoken(),json,this.constructUrl(urlGetCode,theme),'Get');
        //set outside of this function
        this._themeAcc[rank].setRemaining(data.id_liste_code,data.nom,data.desc_en,data.desc_fr);
    }

    /**
     * build the object for the working unit id and setting the theme in front for the mocking
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working unit id with a name and a value for a dropdownlist
     * @memberof User
     */
    setidUTtheme(theme:string){
        //set the new url and get the connection
        if(theme.toString() != this._basetheme.toString()){
            this.callAPIWorkingUnit(theme)
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
        //set the new url and get the connection
        if(theme != this._basetheme){
            this.callAPIWorkingType(theme); 
        }
        
        let list=[];
        for(let j in this._workinType){
            list.push( { name: this._workinType[j].getnom(), value: this._workinType[j].getId()});
        }
        return list;
    }

    /**************** Reading Ressources files *********************/
    /**
     * create a json file for getting a list of classes 
     * mostly hardcoded.
     * @param {string} theme the theme selected by the user
     * @returns {string} return a raw json
     * @memberof User
     */
    createJsonRessources(theme:string/*, path:string */):string{
        let output:any = {
            "fichiers": [
              "hydro_50k:ress_hydro.json",
              "general:ress.json"
            ],
            "chemin_recherche": [
              "ressources/liste_classes"
            ]
          } /*{
            "fichiers" : [theme],
            "chemin_recherche":[
                "ressources/liste_classes"
            ] 
        };*/

        let json:any = JSON.stringify(output)

        return json 
    }

    /**
     * the call to get the classes needed from the API 
     * @param {string} theme the theme selected by the user
     * @memberof User
     */
    getlistofclasses(theme:string/*,path:string*/){
        let listS = [];
        if(theme != this._basetheme){
            this.callAPIListeClasse(theme);
        }
        
        for(let i in this._classeslist){
            listS.push( { name: this._classeslist[i] , wanted: false });
        }
        return listS;
    }


    /************************* For Geometry ******************************/
    /**
     * Work around for a follow-up duplicates
     * @param {*} coord coordinates with a follow-up duplicates
     * @returns {*} reyurn the coordinates with no folow-up duplicates
     * @memberof User
     */
    eliminateFollowUpDuplicate(coord:any):any{
        //create a list to push the non-duplicates
        let nodupes = [];
        //search the array
        for(let i in coord[0]){
            let j = +i;
            //check the postion is not 0(for no previous)
            if(j != 0){
                //check if not duplicates with the previous one
                if(coord[0][i][0] !== coord[0][j-1][0] && coord[0][i][1] !== coord[0][j-1][1]){
                    //push in the non-duplicates array
                    nodupes.push(coord[0][i])
                }
            }else{
                //always push the first into the non-duplicates array
                nodupes.push(coord[0][i])
            }
        }
        let newCoord:any = [nodupes];
        return newCoord;
    }

    /**
     *Create a geojson for a drawing geometry or the imported geometry
     * @memberof planifier
     */
    createGeoJson(crs:string,coord:any){
        coord = this.eliminateFollowUpDuplicate(coord);
        let geojson:any = {
            "type" : 'Polygon',
            "crs" : {
                "type" : "name",
                "properties" : {
                    "name" : crs
                }
            },
            "coordinates" : 
                coord
        };
        this._geom = JSON.stringify(geojson);  
    }

    /**
     * Create a layer in the viewer to add a polygon in viewer
     * @param {string} mapId the map ID of the viewer
     * @param {*} values the coordinates of the drawing
     * @memberof User
     */
    createPolygons(mapId:string,values:any){
        //create a constant to get the map in the viewer
        const myMap = (<any>window).RAMP.mapById(mapId);
        //create a layer in the map in the viewer
        (<any>window).RAMP.mapById(mapId).layersObj.addLayer('shpUpload');
        //create a polygons with all the coordinates(the coordinates needs to be in lat/lon)
        const poly1 = new (<any>window).RAMP.GEO.Polygon(0, values);
        //create a multipolygon with an id
        const polyAll = new (<any>window).RAMP.GEO.MultiPolygon(`location${Math.round(Math.random() * 100000)}`, [poly1],{ outlineColor: [55, 50, 200], outlineWidth: 3 });
        // add the multipolygon to the graphic layer
        const shpUpload = myMap.layers.getLayersById('shpUpload')[0];
        //add the geometry in the layer created
        shpUpload.addGeometry([polyAll]);
        //zoom to extent of polygon(s)
        this.zoomExtent(mapId, values, 2);
        //console.log(shpUpload)
    }

    /**
     * zoom in the polygon in the viewer
     * @param {string} mapId the id of the map in the viewer
     * @param {[]} coords the coordinates of the polygon
     * @param {number} [expand=1] the zoom 
     * @memberof User
     */
    zoomExtent (mapId: string, coords: [], expand: number = 1): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const ramp = (<any>window).RAMP;
        let x = [];
        let y = [];
        //set coordinates of the polygons
        coords.forEach(item => {
            x.push(item[0]);
            y.push(item[1]);
        })
        //set the coordinates for the windows
        let ext = ramp.GAPI.proj.projectEsriExtent({
            'xmin': Math.min(...x), 'ymin': Math.min(...y), 'xmax': Math.max(...x), 'ymax': Math.max(...y),
            'spatialReference': { 'wkid': 4326 } }, myMap.esriMap.spatialReference);
        //the zoom on the polygon
        myMap.setExtent(ext.expand(expand));
    }

    /*************** Accessors ***********************/
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
    getconn(): Connexion {
        return this._conn;
    }
    setconn(value: Connexion) {
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
        return this._rightRead.getnom();
    }
    setrightRead(value: string) {
        this._rightRead.setnom(value);
    }

    /*RightWrite */
    getrightWrite(): string {
        return this._rightWrite.getnom();
    }
    setrightWrite(value: string) {
        this._rightWrite.setnom(value);
    }
    //List de theme
    getthemeAcc(): ApiReturn[] {
        return this._themeAcc;
    }

    getAllThemeNAme():string{
        let output:string;
        output = this.getthemeAcc()[0].getnom();
        for(let i in this.getthemeAcc()){
            if( i != '0')
            output += '<div>' +this.getthemeAcc()[i].getnom() + '</div>'
        }
        return output;
    }

    setthemeAcc(value: string) {
        this._themeAcc[0].setnom(value);
    }

    //liste d' environnement
    getenvAcc(): Environnement[] {
        return this._envAcc;
    }
    setenvAcc(value: Environnement[]) {
        this._envAcc = value;
    }

}