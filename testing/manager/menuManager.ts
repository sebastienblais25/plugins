/****** Import ******/
import { manageController } from "./ControllerManager";
import { formExtraire, formPlanifier, formDelivery, topmenu } from '../config/html-assets';
import { login } from '../login';

export class menuManager{


    constructor(){}

    extractManager(log:login, panel:any, mapApi:any):string{

        /************* Extraire ***************/
        //let ext = new Extraire('','','','','','');
        let mb = new manageController();

        //activate the controls for Extraction
        //A enlever le panel
        mb.extrairecontrols(log,panel, mapApi);

        //add the dropdown list for the form
        let output = formExtraire;
        //output = output.replace(/{dropdownenv}/,ddlEnv);

        //mb.compileTemplate(output,mapApi);

        //add the compile template to the panel
        return output;
    }

    planifManager(log:login, panel:any, mapApi:any):string{

        /********* Planifier *********/
        let mb = new manageController();

        //A Enlever le panel
        mb.planControl(log,panel, mapApi);

        //add the dropdown list for the form
        let output = formPlanifier;
        
        //mb.compileTemplate(output,mapApi);

        //add the compile template to the panel
        return output;
    }

    deliManager(log:login, panel:any, mapApi:any):string{
        let listserver = log.getenvAcc();
        


        let mb = new manageController();

        mb.deliControl(log,panel, mapApi)

        let output = formDelivery;
        //mb.compileTemplate(output,mapApi);
        return output
    }

    topMenuManager(log:login, panel:any, mapApi:any):string{
        let mb = new manageController();

        mb.topmenuControl(log,panel, mapApi)

        let output = topmenu;
        //mb.compileTemplate(output,mapApi);
        return output
    }

       //create a drop list for the template




}