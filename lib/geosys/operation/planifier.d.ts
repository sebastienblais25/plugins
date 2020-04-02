import { Connexion } from "../apiConnect";
import { User } from '../user';
export declare class planifier {
    /*********** Properties ***********/
    _conn: Connexion;
    _theme: string;
    _idUT: string;
    _typetravail: string;
    _classes: string[];
    _datefinpre: string;
    _whereclause: string;
    _geom: string;
    _json: string;
    _data: any;
    /*********** Constructor ***********/
    /**
     *Creates an instance of planifier.
     * @param {string} theme un theme choisi par l'utilisateur parmi la liste
     * @param {string} idut un id avec préfixe du theme et de la date créer avant le nom
     * @param {string} tt un type de travail sélectionner selon une liste créer par sélectio d'un theme
     * @param {string[]} classes une liste de classes sélectionner relier a un theme
     * @param {string} datefin une date de fin prévu entré par l'utilisateur
     * @param {string} wc si un where clause est entré par l'tuilsateur
     * @param {string} geom une geométrie entré par l'utilisateur
     * @memberof planifier
     */
    constructor(theme: string, idut: string, tt: string, classes: string[], datefin: string, wc: string, geom: string);
    /************* Methods *************/
    /**
     *Send a json to the API and return with the information
     *
     * @param {User} log les parametre de l'utilisateur de la classe user
     * @returns {*} retourne les informations de l'API si le fromulaire a été envoyé avec succès ou non
     * @memberof planifier
     */
    submitForm(log: User): any;
    /**
     * Transfrome les infromation du formulaire en fichier raw json
     * @param {User} log
     * @returns {*} retourne un raw json pour envoyer a l'Api
     * @memberof planifier
     */
    getInformationToJson(): void;
    /**
     * sauvegarde un fichier json dans le fichier de download de l'utilisateur
     * @param {*} output le fichier json a sauvegarder.
     * @memberof planifier
     */
    saveJson(): void;
    /******** Accessors *********/
    getJson(): string;
    setJson(json: string): void;
    getdata(): any;
    setdata(value: any): void;
    getconn(): Connexion;
    setconn(value: Connexion): void;
    gettheme(): string;
    settheme(value: string): void;
    getzonetravail(): string;
    setzonetravail(value: string): void;
    getidUT(): string;
    setidUT(value: string): void;
    gettypetravail(): string;
    settypetravail(value: string): void;
    getclasses(): string[];
    setclasses(value: string[]): void;
    getdatefinpre(): string;
    setdatefinpre(value: string): void;
    getgeom(): string;
    setgeom(value: string): void;
}
