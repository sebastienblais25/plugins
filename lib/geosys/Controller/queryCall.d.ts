import { Connexion } from "../apiConnect";
import { User } from "../user";
export declare class QueryCall {
    private _conn;
    submitquery(log: User): void;
    /***** Accessor ******/
    getConn(): Connexion;
    setConn(value: Connexion): void;
}
