

export class Apireturn{


    _id:string;
    _idListeCode:string;
    _nom:string;
    _descEn:string;
    _descFr:string;


    constructor(id:string){
        this._id = id;
    }

    setRemaining(idListCode:string,nom:string,descEn:string, descFr:string){
        this._idListeCode =idListCode;
        this._nom = nom;
        this._descEn = descEn;
        this._descFr = descFr;
    }

}