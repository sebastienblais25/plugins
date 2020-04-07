import { Connexion } from "../apiConnect";
import { User } from "../user";
import { urlQuery } from "../config/url";


export class QueryCall {
    private _conn: Connexion = new Connexion();


    submitquery(log: User): void {
        let json: any = '';
        this._conn.connexionAPI(log.getToken(),json,log.constructUrl(urlQuery),'Get');
    }
    /***** Accessor ******/
    getConn(): Connexion {
        return this._conn;
    }
    setConn(value: Connexion) {
        this._conn = value;
    }
}