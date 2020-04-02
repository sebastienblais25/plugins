import { Connexion } from "../apiConnect";
import { User } from '../user';
export declare class Valider {
    _conn: Connexion;
    constructor();
    submitForm(form: any, log: User): any;
}
