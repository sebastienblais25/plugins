import { connexion } from './apiConnect';
export declare class login {
    _username: string;
    _password: string;
    _conn: connexion;
    /**Return of login**/
    _token: string;
    _tokentype: string;
    _expired: number;
    _rightRead: string;
    _rightWrite: string;
    constructor(username?: string, password?: string);
    submitForm(): any;
    getInformationToHeader(): any;
}
