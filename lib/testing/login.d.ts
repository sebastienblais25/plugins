import { connexion } from './apiConnect';
export declare class login {
    /** Send to APi **/
    _username: string;
    _password: string;
    _conn: connexion;
    /** Return of login **/
    _token: string;
    _tokentype: string;
    _expired: number;
    _rightRead: string;
    _rightWrite: string;
    /** Dropdown List **/
    _themeAcc: string[];
    _envAcc: string[];
    constructor(username?: string, password?: string);
    submitForm(): any;
    getInformationToHeader(): any;
    setDataFromAPI(token: string, token_type: string, expired: number, scope: string[]): void;
    getusername(): string;
    setusername(value: string): void;
    getpassword(): string;
    setpassword(value: string): void;
    getconn(): connexion;
    setconn(value: connexion): void;
    gettoken(): string;
    settoken(value: string): void;
    gettokentype(): string;
    settokentype(value: string): void;
    getexpired(): number;
    setexpired(value: number): void;
    getrightRead(): string;
    setrightRead(value: string): void;
    getrightWrite(): string;
    setrightWrite(value: string): void;
}
