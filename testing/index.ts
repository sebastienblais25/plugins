import { form,loginmenu } from './html-assets';
import {Planifier} from './planifier';

//import { panelMod } from './panelManager';
const FileSaver = require('file-saver');
export default class Testing{

    _tokenbearer:string = "toto";
    _apireturn:any;
    _page:number = 0;

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
        //Ajoute le panel du login menu
        this.addLoginPanel();
        //Ajoute le panel du Planifier zone de travail
    }

    //add side menu item
    onMenuItemClick() {
        return () => {
            this.button.isActive = !this.button.isActive;
            this._RV.toggleSideNav('close');
            this.panelL.open();
        };
    }


    //Creating a login menu
    addLoginPanel(){
        let output:string = loginmenu;
        if (!this.panelL) {
            //creating the panel
            this.panelL = this.mapApi.panels.create('Test Login');
            this.panelL.element.css({bottom: '0em', width: '400px', top: '50px'})
            this.panelL.header.title = 'Test Login'
        } else {
            this.panelL.close();
        }
        //if (this._page ==0 ){
            //add control here
            this.connexionControls();
            
            //add compiler here
            this.compileTemplate(output);
            let closeBtn = this.panelL.header.closeButton;
            //add the template
            this.panelL.body = output;
        /*}else{
            let list = ["Hydro","Route","building"];
            let plan = new Planifier('','','','','','');
            this.angularcontrols(plan);
            
            let ddl = this.interactiveDropDownList(list);
            let output = form.replace(/{dropdowntheme}/, ddl)


            // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
            // Append element
            this.compileTemplate(output);

            let closeBtn = this.panelL.header.closeButton;
            
            //Add the from template to the 
            this.panelL.body = output;
        }*/
    }

    //add a panel with a form
    addPanelOption() {
        //à enlever plus tard
        let name:string = 'planifiezZT'
        let plan = new Planifier('','','','','','');
        let APIreturn:any
        //add panel
        if (!this.panelP) {
        // TODO: Creer le panel
        this.panelP = this.mapApi.panels.create('Test Submit');
        this.panelP.element.css({ bottom: '0em', width: '400px', top: '50px' });
        this.panelP.header.title = name;

        } else { 
            this.panelP.close
        }
        let list = ["Hydro","Route","building"];

        this.angularcontrols(plan);
        
        let ddl = this.interactiveDropDownList(list);
        let output = form.replace(/{dropdowntheme}/, ddl)


        // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
        // Append element
        this.compileTemplate(output);

        let closeBtn = this.panelP.header.closeButton;
        
        //Add the from template to the 
        this.panelP.body = output; 

    }


    //Submit controller
    angularcontrols(plan:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        this.mapApi.agControllerRegister('SubmitCtrl', function($scope){
            this.submitForm = function() { 
                //get all the information of the form into the class
                plan = new Planifier((<HTMLInputElement>document.getElementById("env")).value
            ,(<HTMLInputElement>document.getElementById("theme")).value
            ,(<HTMLInputElement>document.getElementById("idlot")).value
            ,(<HTMLInputElement>document.getElementById("clip")).value
            ,(<HTMLInputElement>document.getElementById("whereclause")).value
            ,(<HTMLInputElement>document.getElementById("geom")).value);
                
                this._apireturn = plan.submitForm(this._tokenbearer);
                alert(this._apireturn.value);
            };
        });
        /************** ***************/
    }

    connexionControls(){
        this.mapApi.agControllerRegister('connexionCtrl', function($scope){
            this.submitConn = function() { 
                //get all the information of the form into the class
                alert('allgood');
                
            };
            
        });
        //this._page = 1;
        //this.addLoginPanel();
    }

    compileTemplate(template): JQuery<HTMLElement> {
        let temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    }


    //create a drop list for the template
    interactiveDropDownList(list:string[]):string{
        let ddl:string= "";
        for (let i in list) {
            ddl += `<option value="` + list[i] + `">`+ list[i] + `</option>`
        }   
        return ddl;
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
    panelL:any,
    panelP:any;
};

Testing.prototype.translations = {
    'en-CA': {
        testbutton: 'Planning Work Place',
        envir: 'Environnement',
        themet: 'Select a theme',
        idlot: 'Select an id',
        typeTrv: 'working type',
        datefinprv: 'Final date planned',
        geome: 'Add your Geometry',
        submit: 'Submit'
    },

    'fr-CA': {
        testbutton: 'Planifiez zone de travail',
        envir: 'Environnement',
        themet: 'Theme',
        idlot: 'Selectionne un id de lot',
        typeTrv: 'Type de travail',
        datefinprv: 'Date fin prévue',
        geome: 'Ajouter votre Géométrie',
        submit: 'Soumettre'   
    }
};

(<any>window).testing = Testing;
