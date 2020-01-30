import { formExtraire,loginmenu } from './html-assets';
import {Extraire} from './extraire';
//import {urlgeoDataGet} from './url';
import { manageButton } from './ButtonManager'
import { login } from './login';
import { menuManager } from './menuManager';
//const FileSaver = require('file-saver');


export default class Testing{
    
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
        
        //Ajoute un panel
        this.addLoginPanel();
    }

    //add side menu item
    onMenuItemClick() {
        return () => {
            //this.button.isActive = !this.button.isActive;
            this._RV.toggleSideNav('close');
            this.panel.open();
        };
    }


    //Creating a login menu
    addLoginPanel(){
        let mb = new manageButton();
        let output:string = loginmenu;

        //if (!this.panel) {
            //creating the panel
            this.panel = this.mapApi.panels.create('Test Login');
            this.panel.element.css({bottom: '0em', width: '400px', top: '50px'})
            this.panel.header.title = 'Generic Title';
        //} else {
            this.panel.close();
       // }

        //add control here   
        this.connexionControls(this.panel,this.mapApi);
        
        
        //compile the login template
        mb.compileTemplate(output,this.mapApi);
        //add a close button 
        let closeBtn = this.panel.header.closeButton;
        //add the template
        this.panel.body = output;
    }


    connexionControls( panel:any,mapApi:any,){
        //ajoute un controller (html)
        this.mapApi.agControllerRegister('connexionCtrl', function($scope){
            //ajoute la focntion sous le controller(html)
            this.submitConn = function() { 
                //get all the information of the form into the class
                let log:login = new login((<HTMLInputElement>document.getElementById("username")).value
                ,(<HTMLInputElement>document.getElementById("password")).value);
                
                console.log(log._username,log._password)
                //submit the form to the API
                let loginfo:any = log.submitForm();
                //si le retour ne contient pas de code d'erreur
                if (loginfo.status != 401){
                    alert('Connected'); 
                    let menu:menuManager = new menuManager();
                    menu.extractManager(log,panel,mapApi);
                    
                //si le retour de l'API contient un code d'erreur
                }else{
                    alert(loginfo.code);
                    alert(loginfo.message);
                }
            }; 
        });
    }

};

export default interface Testing{
    mapApi: any,
    _RV: any,
    config: any,
    button:any,
    translations: any,
    panel:any;
};

//translate label
Testing.prototype.translations = {
    'en-CA': {
        //commun
        envir: 'Select an environnement :',
        themet: 'Select a theme :',
        idUT: 'Select a working unity id :',
        geome: 'Add your Geometry :',
        submit: 'Submit',
        //extraction seulement
        extrac: 'Extract',
        clip: 'If clip :',
        where: 'Enter a Where Clause :',
        //planifier seulement
        testbutton: 'Planning Work Place',
        zoneTrv: 'Working Zone :',
        typeTrv: 'working type :',
        classe: ' :',
        datefinprv: 'Final date planned :',
        log: ' :',
        //login seulement
        login: 'Login',
        username : "username",
        password : 'password'
    },

    'fr-CA': {
        
        //commun
        envir: 'Environnement :',
        themet: 'Theme :',
        idUT: 'Selectionne un identifiant d unité de travail :',
        geome: 'Ajouter votre Géométrie :',
        submit: 'Soumettre',
        //extraction seulement
        extrac: 'Extraction',
        clip: 'Si clip :',
        where: 'Entrer une Where Clause :',
        //planifier seuelement
        testbutton: 'Planifiez zone de travail',
        zoneTrv: 'Zone de travail :',
        typeTrv: 'Type de travail :',
        classe: ' :',
        datefinprv: 'Date fin prévue :',
        log: ' :',
        //Login seuelement
        login: 'connexion :',
        username : "nom d'usager",
        password : 'mot de passe'   
    }
};

(<any>window).testing = Testing;
