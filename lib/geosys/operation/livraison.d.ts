import { connexion } from "../apiConnect";
import { User } from '../user';
export declare class Livraison {
    _conn: connexion;
    _theme: string;
    _idUt: string;
    _typeConn: string;
    _envopt: string;
    constructor(idut: string, theme: string, typeconn: string);
    submitForm(form: any, log: User): any;
    /**
    * Set an optionnal environnement for the header of the json
    * @param {string} env the optionnal environnement
    * @memberof Livraison
    */
    setOptionnalEnvironnement(env: string): void;
}
