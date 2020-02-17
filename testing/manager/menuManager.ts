/****** Import ******/
import { manageController } from "./ControllerManager";
import { formExtraireSR, formExtraireP, formPlanifier, formDelivery, topmenu, formCreerMD, formNettoyage, formCancel } from '../config/html-assets';
import { User } from '../user';

export class menuManager{

    _compiler:manageController;


    /**
     *Creates an instance of menuManager. and create the main menu for the plugins 
     * @param {User} log all the user information
     * @param {*} panel the panel of the plugins
     * @param {*} mapApi the APi of the viewer
     * @param {*} config the config of the viewer
     * @memberof menuManager
     */
    constructor(log:User, panel:any, mapApi:any, config:any){
        //set the manage controller
        this._compiler = new manageController();

        //varaible for the form
        let outputExt:string  = this.extractManager(log,mapApi);
        let outputExtSR:string = this.extractSRManager(log,mapApi);
        let outputPlan:string = this.planifManager(log,mapApi, config);
        let outputDeli:string = this.deliManager(log,mapApi);
        let outputCreer:string = this.creerMDManager(log,mapApi);
        let outputNettoyage:string = this.nettoyageManager(log,mapApi);
        let outputCancel:string = this.cancelManager(log,mapApi);
        let outputTopmenu:string = this.topMenuManager(log,mapApi);
        
        let menuprincipal:string;

        //compile the form together
        menuprincipal = "<div>" + outputTopmenu + outputPlan + outputExt + outputExtSR + outputDeli + outputCreer + outputNettoyage + outputCancel + "</div>";
        this._compiler.compileTemplate(menuprincipal,mapApi);
        
        //put the form in the panel
        panel.body = menuprincipal;
    }

    /**
     * Compile the output and the controller for the planned extraction and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    extractManager(log:User, mapApi:any):string{
        
        this._compiler.extrairecontrols(log, mapApi);

        //add the dropdown list for the form
        let output = formExtraireP;
        
        return output;
    }


    /**
     * Compile the output and the controller for the planning and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @param {*} config send the config for the drawinf potentially
     * @returns {string} the compile output
     * @memberof menuManager
     */
    planifManager(log:User, mapApi:any, config:any):string{

        this._compiler.planControl(log, mapApi, config);

        //add the dropdown list for the form
        let output = formPlanifier;
        
        return output;
    }

    /**
     * Compile the output and the controller for the delivery and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    deliManager(log:User, mapApi:any):string{
        
        this._compiler.deliControl(log, mapApi);

        let output = formDelivery;
        //mb.compileTemplate(output,mapApi);
        return output
    }

    /**
     * Compile the output and the controller for the the top menu and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    topMenuManager(log:User, mapApi:any):string{

        this._compiler.topmenuControl(log, mapApi);

        let output = topmenu;
        //mb.compileTemplate(output,mapApi);
        return output
    }

    /**
     * Compile the output and the controller for the extraction without planning and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    extractSRManager(log:User, mapApi:any):string{
        this._compiler.extraireSRcontrols(log, mapApi);

        let output = formExtraireSR;
        return output;

    }


    /**
     * Set the template of the create From
     * @param {User} log all the info of the user
     * @param {*} mapApi the Api of the user
     * @returns {string} return the compiled output
     * @memberof menuManager
     */
    creerMDManager(log:User, mapApi:any):string{
        this._compiler.creerControl(log, mapApi);

        let output = formCreerMD;
        return output;
    }


    /**
     * 
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    nettoyageManager(log:User, mapApi:any):string{
        this._compiler.nettoyagecontrols(log, mapApi);
        
        let output = formNettoyage;
        return output;
    }

    /**
     *
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    cancelManager(log:User, mapApi:any):string{
        this._compiler.cancelcontrols(log, mapApi);
        let output = formCancel;
        return output;
    }
}