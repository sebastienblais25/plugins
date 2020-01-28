export declare class Planifier {
    _environnement: string;
    _theme: string;
    _idLot: string;
    _clip: string;
    _whereClause: string;
    _geom: string;
    _data: any;
    constructor(env: string, theme: string, idLot: string, clip: string, whereClause: string, geom: string);
    submitForm(token: string): any;
    getinfo(data: any): void;
    getEnvironnement(): string;
    getTheme(): string;
    getidLot(): string;
    getclip(): string;
    getwhereClause(): string;
    getgeom(): string;
    setEnvironnement(env: string): void;
    setTheme(them: string): void;
    setidLot(zt: string): void;
    setclip(clip: string): void;
    setdatefinpr(v: string): void;
    setgeom(value: string): void;
    getInformationToJson(): any;
    saveJson(output: any): void;
}
export interface Planifier {
}
