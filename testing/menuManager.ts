import { Extraire } from "./extraire";
import { manageButton } from "./ButtonManager";
import { formExtraire } from './html-assets';

export class menuManager{


    constructor(){}

    extractManager(log:any, panel:any, mapApi:any){
        let list = log.getthemeAcc();
        let listserver = log.getenvAcc();

        /************* Extraire ***************/
        let ext = new Extraire('','','','','','');
        let mb = new manageButton();
        //activate the controls for Extraction
        mb.angularcontrols(ext, log._token, mapApi);
        //set the dropdown list for the form
        let ddlEnv = ext.interactiveDropDownList(listserver);
        let ddltheme = ext.interactiveDropDownList(list);

        //add the dropdown list for the form
        let output = formExtraire.replace(/{dropdowntheme}/, ddltheme);
        output = output.replace(/{dropdownenv}/,ddlEnv);

        // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
        // Append element
        mb.compileTemplate(output,mapApi);

        //add the compile template to the panel
        panel.body = output;
    }

    planifManager(log:any, panel:any, mapApi:any){

    }



}