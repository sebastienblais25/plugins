const FileSaver = require('file-saver'); // le import

export default class Info{
    _environnement: string;
    _theme: string;
    _zonetravail: string;
    _typetravail: string;
    _datefinpr: string;

    getEnvironnement():string{
        return this._environnement;
    }

    getTheme():string{
        return this._theme;
    }

    getZonetravail():string{
        return this._zonetravail;
    }

    getTypetravail():string{
        return this._typetravail;
    }

    getdatefinpr():string{
        return this._datefinpr;
    }

    setEnvironnement(env:string):void{
        this._environnement = env
    }

    setTheme(them:string):void{
        this._theme = them;
    }

    setZonetravail(zt:string):void{
        this._zonetravail = zt;
    }

    setTypetravail(tt:string):void{
        this._typetravail= tt;
    }

    setdatefinpr(v : string) {
        this._datefinpr = v;
    }

    setAll(en:string, th:string, zt:string, tt:string, datf:string):void{
        this._environnement =en;
        this._theme = th;
        this._zonetravail = zt;
        this._typetravail = tt;
        this._datefinpr = datf;
    }

    transfromIntoJson():void{
        var blob = new Blob([],{});
    }

    
}

//parametre pour les le planifiez ZT
export default interface Info{
    environnement: string,
    theme: string,
    zonetravail: string,
    typetravail: string,
    datefinpr: string;
}