import { login } from '../login';
export declare class menuManager {
    constructor();
    extractManager(log: login, panel: any, mapApi: any): string;
    planifManager(log: login, panel: any, mapApi: any): string;
    interactiveDropDownList(list: string[]): string;
    setDDLidWorkingUnit(): void;
}
