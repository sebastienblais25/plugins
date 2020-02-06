import { connexion } from '../apiConnect';
import { login } from '../login';
export declare class Extraire {
    /*********** Properties ***********/
    _conn: connexion;
    _environnement: string;
    _theme: string;
    _idUT: string;
    _clip: string;
    _whereClause: string;
    _geom: string;
    _data: any;
    /************* Constructor *************/
    constructor(theme: string, idUT: string, clip: string, whereClause: string, geom: string);
    /************* Methods *************/
    submitForm(log: login): any;
    getInformationToJson(log: login): any;
    saveJson(output: any): void;
    /*************** Accessors ***********************/
    getinfo(): any;
    getEnvironnement(): string;
    getTheme(): string;
    getidUT(): string;
    getclip(): string;
    getwhereClause(): string;
    getgeom(): string;
    setEnvironnement(env: string): void;
    setTheme(them: string): void;
    setidUT(idUT: string): void;
    setclip(clip: string): void;
    setdatefinpr(v: string): void;
    setgeom(value: string): void;
    setData(data: any): void;
}
