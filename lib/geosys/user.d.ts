import { connexion } from './apiConnect';
import { idWu } from './manager/idWU';
import { Environnement } from './manager/environnement';
import { Apireturn } from './apireturn';
export declare class User {
    /** Send to APi **/
    _username: string;
    _password: string;
    /** Environnement **/
    _environnementSel: string;
    _urlEnvselected: string;
    /** Connexion **/
    _conn: connexion;
    /** Return of login **/
    _token: string;
    _tokentype: string;
    _expired: number;
    _rightRead: Apireturn;
    _rightWrite: Apireturn;
    /** List **/
    _themeAcc: Apireturn[];
    _envAcc: Environnement[];
    _equipe: Apireturn;
    _idUt: idWu;
    _classeslist: string[];
    _workinType: Apireturn[];
    _geom: string;
    /**
     *Creates an instance of User. with only the username and a password for the connections
     * @param {string} [username] name of the user
     * @param {string} [password] password of the user
     * @memberof User
     */
    constructor(username?: string, password?: string);
    inputParse(values: string, parseType: string): any;
    createPolygons(mapId: string, values: string): void;
    zoomExtent(mapId: string, coords: [], expand?: number): void;
    /**
     *Contruct an url with the environnement selected and the url for the action
     * @param {string} url url of the action
     * @param {string} [adding] add the theme or id at the end (optional)
     * @returns {string}
     * @memberof User
     */
    constructUrl(url: string, adding?: string): string;
    /**
     * With the connexion to the APi send a json file with the username and the password in the header to get
     * the token for the rest of the connexion.
     * @returns {*} the data from the API. we dont know the return of the API so ANY.
     * @memberof User
     */
    submitForm(): any;
    /**
     * Create the list of environnement and their url and place the PRO environnment in first
     * @param {*} output its the data from API.
     * @memberof User
     */
    setListEnv(output: any): void;
    /**
     * Set the environnement url to a properties with the environnement selected
     * @param {string} env the environnement selected by the user
     * @memberof User
     */
    setEnvironnementSelected(env: string): void;
    /**
     * put the information of the user in a header for the first connexion to the API
     * @returns {*}
     * @memberof User
     */
    getInformationToHeader(): any;
    /**
     * sett all the info information obtain form a login into the properties of the class
     *
     * @param {string} token
     * @param {string} token_type
     * @param {number} expired
     * @param {string[]} scope
     * @param {string[]} theme
     * @param {string} equipe
     * @memberof User
     */
    setDataFromAPI(token: string, token_type: string, expired: number, scope: string[], theme: string[], equipe: string): void;
    /**
     * Get all the information of a code into the properties _themeAcc
     * @param {string} theme the code of the theme to get all of his info
     * @param {string} rank the rankl of the list _themeAcc
     * @memberof User
     */
    getinfoForCode(theme: string, rank: string): void;
    /**
     * build the object for the working unit id and setting the theme in front for the mocking
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working unit id with a name and a value for a dropdownlist
     * @memberof User
     */
    setidUTtheme(theme: string): any[];
    /**
     * build the list for the working type and
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working type name with a name and a value for a dropdownlist
     * @memberof User
     */
    setworkingtype(theme: string): any[];
    /**
     * create a json file for getting a list of classes
     * mostly hardcoded.
     * @param {string} theme the theme selected by the user
     * @returns {string} return a raw json
     * @memberof User
     */
    createJsonRessources(theme: string): string;
    /**
     * the call to get the classes needed from the API
     * @param {string} theme the theme selected by the user
     * @memberof User
     */
    getlistofclasses(theme: string): any[];
    /**
     *Création d'un geoJson pour envoyer la geométrie d'un polygone
     * @memberof planifier
     */
    createGeoJson(crs: string, coord: string): any;
    getusername(): string;
    setusername(value: string): void;
    getpassword(): string;
    setpassword(value: string): void;
    getconn(): connexion;
    setconn(value: connexion): void;
    gettoken(): string;
    settoken(value: string): void;
    gettokentype(): string;
    settokentype(value: string): void;
    getexpired(): number;
    setexpired(value: number): void;
    getrightRead(): string;
    setrightRead(value: string): void;
    getrightWrite(): string;
    setrightWrite(value: string): void;
    getthemeAcc(): Apireturn[];
    getAllThemeNAme(): string;
    setthemeAcc(value: string): void;
    getenvAcc(): Environnement[];
    setenvAcc(value: Environnement[]): void;
}
