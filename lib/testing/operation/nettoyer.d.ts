import { User } from '../user';
import { connexion } from '../apiConnect';
export declare class Cleaning {
    _theme: string;
    _idUt: string;
    _json: string;
    _conn: connexion;
    _data: any;
    constructor(theme: string, idut: string);
    submitForm(log: User): any;
    /******* Accessor ********/
    getData(): any;
    setData(data: any): void;
    getTheme(): string;
    setTheme(theme: string): void;
    getIdUt(): string;
    setIdUt(idut: string): void;
    getJson(): string;
    setJson(json: string): void;
}
