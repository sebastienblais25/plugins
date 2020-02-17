import { User } from '../user';


export class Creer{

    _theme:string;
    _idUt:string;
    _nomCatalogue:string;
    _prod_desc:string;
    _descriptionProjet:string;
    _listIdSource:string[];
    _listIdPrecision:string[];
    _listIdContrLegale:string[];
    //return of the API
    _data:any;

    constructor(theme:string,idut:string,nomCata:string,prodDesc:string,descProj:string,listSource:string[],listPrecision:string[],listCont:string[]){
        this._theme = theme;
        this._idUt = idut;
        this._nomCatalogue = nomCata;
        this._prod_desc = prodDesc;
        this._descriptionProjet = descProj;
        this._listIdSource = listSource;
        this._listIdPrecision = listPrecision;
        this._listIdContrLegale = listCont;
    }

    submitFrom(log:User){

    }


    /********* Accessor **********/

    getData():any{
        return this._data;
    }

    setData(data:any){
        this._data = data;
    }
}