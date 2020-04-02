import { User } from "../user";
export declare class TopMenuController {
    constructor();
    /**
     * Change the environnement of the user and change the color of the backgournd if not PRO
     * @param {User} log getting all the information of the user and getting the envrionnemnt he's already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    topmenuControl(log: User, mapApi: any): void;
    /**
     *
     * @param {User} log
     * @param {*} mapApi
     * @memberof TopMenuController
     */
    controlUserInfo(log: User, mapApi: any): void;
    /**
     * Compilateur de HTML avec les variables pour les boutons
     * @param {*} template the template for the form
     * @param {*} mapApi the main API with the function to compile
     * @returns {JQuery<HTMLElement>} return the output compiled
     * @memberof manageController
     */
    compileTemplate(template: any, mapApi: any): JQuery<HTMLElement>;
}
export interface TopMenuController {
    panel: any;
    panel1: any;
}
