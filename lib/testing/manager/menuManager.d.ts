/****** Import ******/
import { manageController } from "./ControllerManager";
import { User } from '../user';
export declare class menuManager {
    _compiler: manageController;
    /**
     *Creates an instance of menuManager. and create the main menu for the plugins
     * @param {User} log all the user information
     * @param {*} panel the panel of the plugins
     * @param {*} mapApi the APi of the viewer
     * @param {*} config the config of the viewer
     * @memberof menuManager
     */
    constructor(log: User, panel: any, mapApi: any, config: any);
    /**
     * Compile the output and the controller for the planned extraction and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    extractManager(log: User, mapApi: any): string;
    /**
     * Compile the output and the controller for the planning and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @param {*} config send the config for the drawinf potentially
     * @returns {string} the compile output
     * @memberof menuManager
     */
    planifManager(log: User, mapApi: any, config: any): string;
    /**
     * Compile the output and the controller for the delivery and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    deliManager(log: User, mapApi: any): string;
    /**
     * Compile the output and the controller for the the top menu and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    topMenuManager(log: User, mapApi: any): string;
    /**
     * Compile the output and the controller for the extraction without planning and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    extractSRManager(log: User, mapApi: any): string;
    /**
     *
     *
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    creerMDManager(log: User, mapApi: any): string;
}
