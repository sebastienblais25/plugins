import { connexion } from "../apiConnect";
import { User } from '../user';
export declare class Livraison {
    _theme: string;
    _idUt: string;
    _typeConn: string;
    _conn: connexion;
    constructor(idut: string, theme: string, typeconn: string);
    submitForm(form: any, log: User): any;
}
