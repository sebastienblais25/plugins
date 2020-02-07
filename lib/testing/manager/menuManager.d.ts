/****** Import ******/
import { manageController } from "./ControllerManager";
import { login } from '../login';
export declare class menuManager {
    _compiler: manageController;
    constructor(log: login, panel: any, mapApi: any, config: any);
    extractManager(log: login, mapApi: any): string;
    planifManager(log: login, mapApi: any, config: any): string;
    deliManager(log: login, mapApi: any): string;
    topMenuManager(log: login, mapApi: any): string;
}
