import { Connexion } from '../apiConnect';
import { User } from '../user';
export declare class Extraire {
    /*********** Properties ***********/
    _conn: Connexion;
    _theme: string;
    _idUT: string;
    _listClasses: string[];
    _clip: string;
    _whereClause: string;
    _geom: string;
    _json: string;
    _data: any;
    _envopt: string;
    /************* Constructor *************/
    /**
     *Creates an instance of Extraire.
     * @param {string} theme le thème sélectionner par l'utilisateur
     * @param {string} [idUT] le identifiant d'unité de travail sélectioner par l'utilisateur
     * @param {string} [clip] Si l'utilisateur veut un clip lors de l'Extraction
     * @param {string} [whereClause] si l'utilisateur a mis un where clause
     * @param {string} [geom] la géométrie entré par l'utilisateur.
     * @memberof Extraire
     */
    constructor(theme: string, idUT?: string, clip?: string, whereClause?: string, geom?: string);
    /************* Methods *************/
    /**
     * Envoie un raw json a l'Api s'il s'agit d'un extraction sans retour ou envoie aucun json, mais
     * envoie l'identifiant d'unité de travail dans le url s'il s'agit d'une extraction planifié
     * @param {User} log le sparamtere de l'utilisateur
     * @returns {*} retorune le succes ou l'erreur de l'opération un avec un message
     * @memberof Extraire
     */
    submitForm(log: User): any;
    /**
     * Set an optionnal environnement for the header of the json
     * @param {string} env the optionnal environnement
     * @memberof Extraire
     */
    setOptionnalEnvironnement(env: string): void;
    /**
     *set toutes les propriété pour une extraction sans retour
     * @param {string[]} list la liste de classe sélectionner par l'utilisatuer
     * @param {string} clip si l'utilisateur veut un clip de ses données
     * @param {string} whereClause
     * @param {string} geom
     * @memberof Extraire
     */
    setInfoForSR(list: string[], clip: string, whereClause: string, geom: string): void;
    /**
     *Creation d'un fichier json pour faire l'appel à l'API
     * @returns {*} retourne un raw Json pour l'API
     * @memberof Extraire
     */
    getInformationToJsonSR(): void;
    /**
     *put a json string into a blob and export into a json file in download file
     * @param {*} output the file to save
     * @memberof Extraire
     */
    saveJson(output: any): void;
    /*************** Accessors ***********************/
    setEnvOpt(env: string): void;
    getEnvOpt(): string;
    getJson(): string;
    setJson(json: string): void;
    getData(): any;
    getTheme(): string;
    getidUT(): string;
    getclip(): string;
    getwhereClause(): string;
    getgeom(): string;
    setTheme(them: string): void;
    setidUT(idUT: string): void;
    setclip(clip: string): void;
    setdatefinpr(v: string): void;
    setgeom(value: string): void;
    setData(data: any): void;
}
