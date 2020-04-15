import { User } from '../user';
import { Connexion } from '../apiConnect';
import { urlDeleteClean } from '../config/url';
export class Cleaning {

    _theme: string;
    _idUt: string;
    _json: string = '';
    _conn: Connexion = new Connexion();
    _data:any;

    constructor(theme: string, idut: string) {
        this._theme = theme;
        this._idUt = idut;
    }

    submitForm(log: User): any {
        this.setData(this._conn.connexionAPI(log.getToken(),this.getJson(),log.constructUrl(urlDeleteClean,this.getIdUt()),'Delete'));
        return this.getData();
    }

    /******* Accessor ********/

    getData(): any {
        return this._data;
    }

    setData(data: any) {
        this._data = data;
    }

    getTheme(): string {
        return this._theme
    }

    setTheme(theme: string) {
        this._theme = theme;
    }

    getIdUt(): string {
        return this._idUt;
    }

    setIdUt(idut: string) {
        this._idUt = idut;
    }

    getJson():string{
        return this._json;
    }

    setJson(json: string) {
        this._json = json;
    }
}