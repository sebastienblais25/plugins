/****** Import ******/
import { User } from '../user';
import { PlanningController } from '../controller/planningC';
import { ExtractController } from '../controller/extractC';
import { CreateController } from '../controller/createC';
import { DeliveryController } from '../controller/deliveryC';
import { CleaningController } from '../controller/cleaningC';
import { CancelController } from '../controller/cancelC';
import { TopMenuController } from '../controller/topmenuC';
import { ValidateController } from '../controller/validateC';
import { FileManagerController } from '../controller/fileManagerC';
import { UnitTravC } from '../controller/unitTravC';
export declare class menuManager {
    _compiler: TopMenuController;
    _planning: PlanningController;
    _extract: ExtractController;
    _create: CreateController;
    _delivery: DeliveryController;
    _cleaning: CleaningController;
    _cancel: CancelController;
    _validate: ValidateController;
    _fileManager: FileManagerController;
    _workUnit: UnitTravC;
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
    topMenuManager(log: User, mapApi: any, panel: any): string;
    /**
     * Compile the output and the controller for the extraction without planning and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    extractSRManager(log: User, mapApi: any): string;
    /**
     * Set the template of the create From
     * @param {User} log all the info of the user
     * @param {*} mapApi the Api of the user
     * @returns {string} return the compiled output
     * @memberof menuManager
     */
    creerMDManager(log: User, mapApi: any): string;
    /**
     *
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    nettoyageManager(log: User, mapApi: any): string;
    /**
     *
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    cancelManager(log: User, mapApi: any): string;
    /**
     *
     *
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    validateManager(log: User, mapApi: any): string;
    /**
     *
     *
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    fileExplorerManager(log: User, mapApi: any): string;
    UTManager(log: User, mapApi: any): string;
}
