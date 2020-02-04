export declare class idWu {
    _theme: string;
    _wUnit: string[];
    constructor(theme: string, wUnit: string[]);
    getTheme(): string;
    getwUnit(): string[];
    getspecificwUnit(rank: number): string;
    setTheme(theme: string): void;
    setwUnit(wUnit: string[]): void;
    setspecificwUnit(wUnit: string, rank: number): void;
}
