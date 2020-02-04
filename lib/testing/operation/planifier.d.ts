import { connexion } from "../apiConnect";
export declare class planifier {
    /*********** Properties ***********/
    _conn: connexion;
    _environnement: string;
    _theme: string;
    _idUT: string;
    _typetravail: string;
    _classes: string;
    _datefinpre: string;
    _whereclause: string;
    _geom: string;
    _data: any;
    /*********** Constructor ***********/
    constructor(env: string, theme: string, idut: string, tt: string, classes: string, datefin: string, wc: string, geom: string);
    /************* Methods *************/
    submitForm(token: string): any;
    getInformationToJson(): any;
    saveJson(output: any): void;
    setClassesIntoList(): string[];
    /******** Accessors *********/
    getdata(): any;
    setdata(value: any): void;
    getconn(): connexion;
    setconn(value: connexion): void;
    getenvironnement(): string;
    setenvironnement(value: string): void;
    gettheme(): string;
    settheme(value: string): void;
    getzonetravail(): string;
    setzonetravail(value: string): void;
    getidUT(): string;
    setidUT(value: string): void;
    gettypetravail(): string;
    settypetravail(value: string): void;
    getclasses(): string;
    setclasses(value: string): void;
    getdatefinpre(): string;
    setdatefinpre(value: string): void;
    getgeom(): string;
    setgeom(value: string): void;
}
