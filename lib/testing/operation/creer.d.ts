import { User } from '../user';
export declare class Creer {
    _theme: string;
    _idUt: string;
    _nomCatalogue: string;
    _prod_desc: string;
    _descriptionProjet: string;
    _listIdSource: string[];
    _listIdPrecision: string[];
    _listIdContrLegale: string[];
    _data: any;
    constructor(theme: string, idut: string, nomCata: string, prodDesc: string, descProj: string, listSource: string[], listPrecision: string[], listCont: string[]);
    submitFrom(log: User): void;
    /********* Accessor **********/
    getData(): any;
    setData(data: any): void;
}
