//import { form } from './html-assets';
import {Info} from './info';
import { panelMod } from './panelManager';
import { AnimateSlideCellRenderer } from 'ag-grid-community';
//import { resolve } from 'dns';
const FileSaver = require('file-saver');

export default class Testing{

    _panel:panelMod = new panelMod();

    //initiation
    init(api: any) {
        //set la variable api pour le plugin
        this.mapApi = api;
        //set _RV
        this.config = this._RV.getConfig('plugins').testing;
        //set la langue pour le plugin
        this.config.language = this._RV.getCurrentLang();
        //création d'un button d'accès à partir du menu
        this.button = this.mapApi.mapI.addPluginButton(
            Testing.prototype.translations[this._RV.getCurrentLang()].testbutton,
            this.onMenuItemClick()
        );
  
    }

    //add side menu item
    onMenuItemClick() {
        return () => {
            //this.button.isActive = !this.button.isActive;
            this._RV.toggleSideNav('close');
            this.addPanel();  
        };
    }

    //add a panel with a form
    addPanel(){

        //à enlever plus tard
        let name:string = 'planifiezZT'
        let hello = new Info('','','','','');

        //add panel
        this.panel = this._panel.createPanel(this.panel, this.mapApi,name,Testing.prototype.translations[this._RV.getCurrentLang()].testbutton);
        //set the from inside the panel
        this.panel.body = hello.getFormPanifiez(hello.interactiveDropDownList());
        //open the panel in the viewer
        this.panel.open();

        //submit form Plan
        //this._panel.submitForm(this._RV);
        this.angularControls();
        
        /************ TEST *************/
        //this.angularControls();
        //hello.getInformation();
    }


    angularControls(){
        this.mapApi.agControllerRegister('SubmitCtrl',function($scope:any){
            $scope.$parent.ctrl = {value:{}};

            this.submit=()=>{
                alert('hello');
            }

        });
    }

    //First test with an alert
    //Event when a click is done on the map
    listenToAlert(){
        this.mapApi.click.subscribe(clickEvent => this.clickHandler(clickEvent));
    }

    clickHandler(clickEvent) {
        // get current language
        const lang = this._RV.getCurrentLang();
        alert('You clicked on point ');
        //var blob = new Blob(["Hello, world!"], {type:"application/json"});
        //FileSaver.saveAs(blob, "hello world.json");
        //create a json and save the file in the download folder
    }


    
};

export default interface Testing{
    mapApi: any,
    _RV: any,
    config: any,
    button:any,
    translations: any,
    panel:any,
    buttonp:any ;
};

Testing.prototype.translations = {
    'en-CA': {
        testbutton: 'Planning Work Place',
    },

    'fr-CA': {
        testbutton: 'Planifiez zone de travail',   
    }
};

(<any>window).testing = Testing;
