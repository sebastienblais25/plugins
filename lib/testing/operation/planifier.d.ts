import { connexion } from "../apiConnect";
export declare class planifier {
    /*********** Properties ***********/
    _conn: connexion;
    _environnement: string;
    _theme: string;
    _zonetravail: string;
    _idUT: string;
    _typetravail: string;
    _classes: string[];
    _datefinpre: string;
    _logfile: string;
    /*********** Constructor ***********/
    constructor(env: string, theme: string, zt: string, idut: string, tt: string, classes: string[], datefin: string, logfile: string);
    /************* Methods *************/
    interactiveDropDownList(list: string[]): string;
    getInformationToJson(): any;
    /******** Accessors *********/
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
    getclasses(): string[];
    setclasses(value: string[]): void;
    getdatefinpre(): string;
    setdatefinpre(value: string): void;
    getlogfile(): string;
    setlogfile(value: string): void;
}
