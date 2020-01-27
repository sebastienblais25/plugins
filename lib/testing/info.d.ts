export declare class Info {
    _environnement: string;
    _theme: string;
    _zonetravail: string;
    _typetravail: string;
    _datefinpr: string;
    _form: string;
    constructor(env: string, theme: string, zonet: string, typet: string, datefin: string);
    getFormPanifiez(dropdown: string): string;
    getEnvironnement(): string;
    getTheme(): string;
    getZonetravail(): string;
    getTypetravail(): string;
    getdatefinpr(): string;
    setEnvironnement(env: string): void;
    setTheme(them: string): void;
    setZonetravail(zt: string): void;
    setTypetravail(tt: string): void;
    setdatefinpr(v: string): void;
    getInformationToJson(): any;
    transfromIntoJson(): void;
    interactiveDropDownList(): string;
    submitForm(_RV: any): void;
}
export interface Info {
    translations: any;
}
