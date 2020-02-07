/****** Import ******/
import { loginmenu } from './config/html-assets';
import { manageController } from './manager/ControllerManager'
import { login } from './login';
import { menuManager } from './manager/menuManager';

export default class Testing{
    
    //initiation
    init(api: any) {
        //set la variable api pour le plugin
        this.mapApi = api;
        //set _RV
        this.config = this._RV.getConfig('plugins').testing;
        //set la langue pour le plugin
        this.config.language = this._RV.getCurrentLang();
        //set la config pour la geometry
        //to try
        this.config.url = this._RV.getConfig('services').geometryUrl;
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
            //open the panel
            this.panel.open();
        };
    }


    //Creating a login menu
    addLoginPanel(){
        //permet d'Activer le bouton connexion/ login
        let output:string = loginmenu;


        //creating the panel with the dimension and a title for the application
        this.panel = this.mapApi.panels.create('Test Login');
        this.panel.element.css({bottom: '0em', width: '400px', top: '50px'})
        this.panel.header.title = 'Generic Title';

        //add control for the login button
        this.connexionControls(this.panel,this.mapApi,this.config);
        
        
        //compile the login template
        this.compileTemplate(output,this.mapApi);

        //add a close button 
        let closeBtn = this.panel.header.closeButton;
        //add a toggle button
        let toggleBtn = this.panel.header.toggleButton;
        //add the template to the panel
        this.panel.body = output;
    }


    connexionControls( panel:any,mapApi:any,config:any){
        //ajoute un controller au formulaire html
        this.mapApi.agControllerRegister('connexionCtrl', function($scope){
            //ajoute la fonction sous le controller au formulaire html
            this.submitConn = function() { 
                //prends les informations des input pour envoyer a l'API
                let log:login = new login((<HTMLInputElement>document.getElementById("username")).value
                ,(<HTMLInputElement>document.getElementById("password")).value);
                
                
                //Envoie le formulaire a l API
                let loginfo:any = log.submitForm();

                //si le retour ne contient pas de code d'erreur continue
                if (loginfo.status != 401){
                    //alert('Connected'); 
                    let menu:menuManager =  new menuManager(log,panel,mapApi,config);
                    

                //si le retour de l'API contient un code d'erreur et le message
                }else{
                    alert(loginfo.code);
                    alert(loginfo.message);
                }
            }; 
        });
    }

    compileTemplate(template,mapApi): JQuery<HTMLElement> {
        let temp = $(template);
        mapApi.$compile(temp);
        return temp;
    }
};

//Inteface pour avoir accèes au element du viewer
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
        //Commun
        envir: 'Select an environnement :',
        themet: 'Select a theme :',
        idUT: 'Select a working unity id :',
        geome: 'Add your Geometry :',
        submit: 'Submit',
        cancel: 'Cancel',
        where: 'Enter a Where Clause :',
        //Extraction seulement
        extrac: 'Extract',
        clip: 'If clip :',
        //Planifier seulement
        testbutton: 'GeoSys',
        planif: 'Planning',
        typeTrv: 'working type :',
        classe: 'Select a class :',
        datefinprv: 'Final date planned :',
        //Login seulement
        login: 'Login',
        username : "username",
        password : 'password',
        //Livraison seulement
        delivery : 'Delivery',

    },

    'fr-CA': {
        
        //Commun
        envir: 'Environnement :',
        themet: 'Theme :',
        idUT: 'Selectionne un identifiant d unité de travail :',
        geome: 'Ajouter votre Géométrie :',
        submit: 'Soumettre',
        cancel: 'Annuler',
        where: 'Entrer une Where Clause :',
        //Extraction seulement
        extrac: 'Extraction',
        clip: 'Si clip :',
        //Planifier seulement
        testbutton: 'GeoSys',
        planif: 'Planifier',
        typeTrv: 'Type de travail :',
        classe: 'selectionne une classe :',
        datefinprv: 'Date fin prévue :',
        //Login seulement
        login: 'connexion :',
        username : "nom d'usager",
        password : 'mot de passe', 
        //Livraison seulement 
        delivery : 'Livraison', 
    }
};

//accès du plugins à l'application
(<any>window).testing = Testing;
