

export class Apireturn{


    _id:number;
    _idListeCode:number;
    _nom:string;
    _descEn:string;
    _descFr:string;


    constructor(id:number){
        this._id = id;
    }

    setRemaining(idListCode:number,nom:string,descEn:string, descFr:string){
        this._idListeCode =idListCode;
        this._nom = nom;
        this._descEn = descEn;
        this._descFr = descFr;
    }
}