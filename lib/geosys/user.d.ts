import { Connexion } from './apiConnect';
import { Environnement } from './manager/environnement';
import { ApiReturn } from './manager/apireturn';
export declare class User {
    /** Send to APi **/
    private _username;
    private _password;
    /** Environnement **/
    private _environnementSel;
    private _urlEnvselected;
    private _baseTheme;
    /** Connexion **/
    private _conn;
    /** Return of login **/
    private _token;
    private _tokentype;
    private _expired;
    private _right;
    /** List **/
    private _themeAcc;
    private _envAcc;
    private _equipe;
    private _idUt;
    private _classeslist;
    private _workinType;
    /** other **/
    private _geom;
    private _advanced;
    private _closeable;
    /**
     * Creates an instance of User. with only the username and a password for the connections
     * @param {string} [username] Name of the user
     * @param {string} [password] Password of the user
     * @memberof User
     */
    constructor(username: string, password: string);
    /**
     * Contruct an url with the environnement selected and the url for the action
     * @param {string} url Url of the action
     * @param {string} [adding] Add the theme or id at the end (optional)
     * @returns {string} An url with the url of the nevironnemtn and the API one
     * @memberof User
     */
    constructUrl(url: string, adding?: string): string;
    /**
     * With the connexion to the APi send a json file with the username and the password in the header to get
     * the token for the rest of the connexion.
     * @returns {*} the data from the API. we dont know the return of the API so ANY.
     * @memberof User
     */
    submitForm(config: any): any;
    /**
     * Create the list of environnement and their url and place the PRO environnment in first
     * @param {*} output Its the data from API.
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
     * @param {string} token
     * @param {string} token_type
     * @param {number} expired
     * @param {string[]} scope
     * @param {string[]} theme
     * @param {string} equipe
     * @memberof User
     */
    setDataFromAPI(token: string, token_type: string, expired: number, scope: string[], theme: string[], equipe: string, config: any): void;
    /**
     * Call Api for a list of working unit
     * @param {string} theme The theme related to the working unit
     * @memberof User
     */
    callAPIWorkingUnit(theme: string): void;
    /**
     * Call the API for a list of classes
     * @param {string} theme The theme related to the list of classes
     * @memberof User
     */
    callAPIListeClasse(theme: string): void;
    /**
     * call the API for a list of working type
     * @param {string} theme the theme related to the working type
     * @memberof User
     */
    callAPIWorkingType(theme: string): void;
    /**
     * Ordering the list to set the base theme in first place
     * @param {string[]} theme List of theme
     * @param {*} config The base theme
     * @returns
     * @memberof User
     */
    orderThemeList(theme: string[], config: any): any;
    /**
     * Get all the information of a code into the properties _themeAcc
     * @param {string} theme The code of the theme to get all of his info
     * @param {string} rank The rankl of the list _themeAcc
     * @memberof User
     */
    getinfoForCode(theme: string, rank: string): void;
    /**
     * Build the object for the working unit id and setting the theme in front for the mocking
     * and set a list for the dropdown list int the forms.
     * @param {string} theme The theme selected by the user
     * @returns Return a list of working unit id with a name and a value for a dropdownlist
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
    /**************** Reading Ressources files *********************/
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
    /************************* For Geometry ******************************/
    /**
     * Work around for a follow-up duplicates
     * @param {*} coord coordinates with a follow-up duplicates
     * @returns {*} reyurn the coordinates with no folow-up duplicates
     * @memberof User
     */
    eliminateFollowUpDuplicate(coord: any): any;
    /**
     *Create a geojson for a drawing geometry or the imported geometry
     * @memberof planifier
     */
    createGeoJson(crs: string, coord: any): void;
    /**
     * Create a layer in the viewer to add a polygon in viewer
     * @param {string} mapId the map ID of the viewer
     * @param {*} values the coordinates of the drawing
     * @memberof User
     */
    createPolygons(mapId: string, values: any): void;
    /**
     * zoom in the polygon in the viewer
     * @param {string} mapId the id of the map in the viewer
     * @param {[]} coords the coordinates of the polygon
     * @param {number} [expand=1] the zoom
     * @memberof User
     */
    zoomExtent(mapId: string, coords: [], expand?: number): void;
    /*************** Accessors ***********************/
    getUsername(): string;
    setUsername(value: string): void;
    getPassword(): string;
    setPassword(value: string): void;
    getConn(): Connexion;
    setConn(value: Connexion): void;
    getToken(): string;
    setToken(value: string): void;
    getTokenType(): string;
    setTokenType(value: string): void;
    getExpired(): number;
    setExpired(value: number): void;
    getRight(): ApiReturn[];
    setRight(value: string, rank: number): void;
    getThemeAcc(): ApiReturn[];
    getAllThemeNAme(): string;
    setThemeAcc(value: string): void;
    getEnvAcc(): Environnement[];
    setEnvAcc(value: Environnement[]): void;
    getEnvironnementSel(): string;
    setEnvironnementSel(value: string): void;
    getUrlEnvselected(): string;
    setUrlEnvselected(value: string): void;
    getCloseable(): boolean;
    setCloseable(value: boolean): void;
    getGeom(): string;
    setGeom(value: string): void;
    getAdvanced(): boolean;
    setAdvanced(value: boolean): void;
    getEquipe(): ApiReturn;
    setEquipe(value: ApiReturn): void;
}
