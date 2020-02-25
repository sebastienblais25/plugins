import { connexion } from "../apiConnect";
import { User } from '../user';
export declare class Valider {
    _conn: connexion;
    constructor();
    submitForm(form: any, log: User): any;
}
