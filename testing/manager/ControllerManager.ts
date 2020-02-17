/****** Import ******/
import { Extraire } from "../operation/extraire";
import { User } from '../user';
import { planifier } from '../operation/planifier';
import { Livraison } from '../operation/livraison';
import { Cleaning } from '../operation/nettoyer';


export class manageController{


    constructor(){};

    /**
     *the controller for all the function in planning templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @param {*} config the config is for drawing 
     * @memberof manageController
     */
    planControl(log:User, mapApi:any, config:any):void{
        mapApi.agControllerRegister('submitFromP', function($scope){
            const that = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if($scope.IsVisible == true){
                        $scope.SelectedMenu = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenu = {
                        }
                    }
                }    
            };
            /************** interactive List ***************/
            this.selectedItemC = '';
            this.selectedItemD = '';
            this.dfp = '';
            this.itemsC = [];
            //theme list
            for (let i in log._themeAcc){
                this.itemsC.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            //List of working type
            this.itemsD = [];
            //the group of classes for a theme
            this.classes = [];
            //function ng-chage of the theme list
            this.setList = () => {
                console.log(`set: ${this.selectedItemC}`);
                //set the today's date
                let today = new Date();
                let dd:string = String(today.getDate());
                let mm:string = String(today.getMonth() + 1); //January is 0!
                let yyyy:string = String(today.getFullYear());
                if(dd.length < 2){
                    dd = '0'+dd;
                }
                if(mm.length < 2){
                    mm = '0'+mm;
                }
                //add the name of the theme
                let slectedthem:string;
                for(let i in this.itemsC){
                    if(this.itemsC[i].value == this.selectedItemC){
                        slectedthem = this.itemsC[i].name;
                    }
                }
                //Populate the input of the working unit
                this.idut = slectedthem + '_'+ dd + mm + yyyy + '_';
                //populate the working type list
                this.itemsD.length = 0;
                this.itemsD = log.setworkingtype(this.selectedItemC);
                /** liste de classes **/
                let list= [];
                list = log.getlistofclasses(this.selectedItemC);
                this.classes.length = 0;
                //add the new list in list for the template
                this.classes=list
            }
            //for claases list select all the info
            this.toggleAll = () => {
                if( this.listeclasse == true){
                    for(let i in this.classes){
                        this.classes[i].wanted = false;
                    }  
                }else{
                    for(let i in this.classes){
                        this.classes[i].wanted = true;
                    }
                }
            }
            let count:number = 0;
            /*this.toggleDraw = () => {
                
                if (count == 0){
                    let toolbar:PanelManager = new PanelManager(mapApi,config);
                    count ++;
                }
                (<any>document).getElementsByClassName('rv-mapnav-draw-content')[0].style.display = this.checkTool? 'none' : 'block';
            }*/
            /********** Form submission ************/
            //Envoie le fromulaire a l'API
            this.submitFormP = function() { 
                //get all the information of the form into the class
                let listofclass = []
                for(let i in this.classes){
                    if(this.classes[i].wanted ==true){
                        listofclass.push(this.classes[i].name);
                    }
                }
                //set the information in the the json 
                alert(this.selectedItemD)
                let plan:planifier = new planifier(
                    this.selectedItemC,
                    (<HTMLInputElement>document.getElementById("idUt")).value,
                    this.selectedItemD,
                    listofclass,
                    this.dfp,
                    (<HTMLInputElement>document.getElementById("wherep")).value,
                    (<HTMLInputElement>document.getElementById("geomp")).value);
                //submit the form to the API
                let apireturn:any = plan.submitForm(log);
                //If the return isn't a succes
                if (apireturn != 'success'){
                    $scope.SelectedMenu = {
                        "background-color" : "red", 
                    }
                }else{
                    $scope.IsVisible = false;
                    $scope.SelectedMenu = {
                        "background-color" : "green", 
                    }
                }
            };
        });
    }

    /**
     * the controller for all the function in the planned extract templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    extrairecontrols(log:User, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function($scope){ 
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                    if($scope.IsVisible == true){
                        $scope.SelectedMenu = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenu = {
                        }
                    }
                }  
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.itemsA = [];
            for (let i in log._themeAcc){
                this.itemsA.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = () => {
                console.log(`set: ${this.selectedItemA}`);
                // populate list of working unit id
                this.itemsB.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemA)
                for (let i in list){
                    this.itemsB.push(list[i])
                }
            }
            /**************** From Submission ***************/
             this.submitForm = function() { 
                //get all the information of the form into the class
                let ext = new Extraire(
                     this.selectedItemA
                    ,this.selectedItemB);
                let apireturn:any = ext.submitForm(log);
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                    $scope.SelectedMenu = {
                        "background-color" : "red", 
                    }
                }else{
                    $scope.IsVisible = false;
                    $scope.SelectedMenu = {
                        "background-color" : "green", 
                    }
                } 
            };
        });
    }

    /**
     *the controller fro all the function in the unplanned extract templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    extraireSRcontrols(log:User, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitExCtrl', function($scope){
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if($scope.IsVisible == true){
                        $scope.SelectedMenu = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenu = {
                        }
                    }
                }  
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.whereclause = '';
            this.geom = '';
            this.itemsA = [];
            for (let i in log._themeAcc){
                this.itemsA.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            this.classes = [];
            //création de la liste pour les unité de travail
            this.setList = () => {
                let list= [];
                list = log.getlistofclasses(this.selectedItemC);
                this.classes.length = 0;
                //add the new list in list for the template
                this.classes = list 
            }
            //select all the classes in the list
            this.toggleAll = () => {
                if( this.listeclasse == true){
                    for(let i in this.classes){
                        this.classes[i].wanted = false;
                    }  
                }else{
                    for(let i in this.classes){
                        this.classes[i].wanted = true;
                    }
                }
            }
            /**************** From Submission ***************/
            //Envoie le formulaire a l'Api
            this.submitSRForm = function() { 
                //get all the information of the form into the class
                let listofclass = []
                for(let i in this.classes){
                    if(this.classes[i].wanted ==true){
                        listofclass.push(this.classes[i].name);
                    }
                }
                let siClip:string;
                if(this.cbClip == true){
                    siClip = 'oui';
                }else{
                    siClip = 'non';
                }
                let extsr = new Extraire(
                     this.selectedItemA);
                    extsr.setInfoForSR(listofclass,
                    siClip,
                    this.whereclause,
                    this.geom)
                let apireturn:any = extsr.submitForm(log);
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                    $scope.SelectedMenu = {
                        "background-color" : "red", 
                    }
                }else{
                    $scope.IsVisible = false;
                    $scope.SelectedMenu = {
                        "background-color" : "green", 
                    }
                }   
            };
        });
    }

    /**
     *the controller for all the function in the delivery templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    deliControl(log:User, mapApi:any):void{
        //mapApi.agDirectiveRegister()
        mapApi.agControllerRegister('submitFromD', function($scope){
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if($scope.IsVisible == true){
                        $scope.SelectedMenu = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenu = {
                        }
                    } 
                }    
            };
            /************** interactive List ***************/
            this.typeOper = '';
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (let i in log._themeAcc){
                this.itemsE.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            this.itemsF = [];
            this.setList = () => {
                console.log(`set: ${this.selectedItemE}`);
                console.log(`set: ${this.typeOper}`);
                // populate list b with new items
                this.itemsF.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemE)
                for (let i in list){
                    this.itemsF.push(list[i])
                }
            }
            this.filechanged = () => {
                this.fileSelect.trigger('click');
            }
            //Envoie le fromulaire a l'API
            this.submitFormD = function(element) { 
                //get all the information of the form into the class
                let formdata = new FormData();
                formdata.append('fichier_data',(<HTMLInputElement>document.getElementById('fileMD')).files[0]);
                formdata.append('fichier_meta',(<HTMLInputElement>document.getElementById('filefgdb')).files[0]);
                let livre:Livraison = new Livraison(this.selectedItemF,this.selectedItemE,this.typeOper);
                let apireturn:any = livre.submitForm(formdata,log);     
                if (apireturn != undefined){
                    alert(apireturn + ' 4');
                    console.log(apireturn);
                    $scope.SelectedMenu = {
                        "background-color" : "red", 
                    }
                }else{
                    console.log(log.gettoken());
                    $scope.SelectedMenu = {
                        "background-color" : "green", 
                    }
                }
            };
        })
    }

    /**
     * the controller for all the function for CreateMD
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    creerControl(log:User, mapApi:any):void{
        mapApi.agControllerRegister('submitFromC', function($scope){
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if($scope.IsVisible == true){
                        $scope.SelectedMenu = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenu = {
                        }
                    } 
                }    
            };
            /************** interactive List ***************/
            this.typeOper = '';
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (let i in log._themeAcc){
                this.itemsE.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            //List working unit ID
            this.itemsF = [];
            //list sources ID
            this.sources = [];
            //list of precisions ID
            this.precisions = [];
            //list of contraints ID
            this.contraintes = []
            //création de la liste pour les unité de travail
            this.setList = () => {
                /******changer pour sources********/
                let listS= [];
                listS = log.getlistofclasses(this.selectedItemE);
                this.sources.length = 0;
                //add the new list in list for the template
                this.sources = listS
                /******changer pour precision********/
                let listP= [];
                listP = log.getlistofclasses(this.selectedItemE);
                this.precisions.length = 0;
                //create the list with name and varaible for the checkbox
                this.precisions= listP
                /******changer pour contraintes********/
                let listCo= [];
                listCo = log.getlistofclasses(this.selectedItemE);
                this.contraintes.length = 0;
                //create the list with name and varaible for the checkbox
                this.contraintes = listCo
                // populate list b with new items
                this.itemsF.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemE)
                for (let i in list){
                    this.itemsF.push(list[i])
                }
            }
            //for claases list select all the info
            this.toggleAllS = () => {
                if( this.listeSources == true){
                    for(let i in this.sources){
                        this.sources[i].wanted = false;
                    }  
                }else{
                    for(let i in this.sources){
                        this.sources[i].wanted = true;
                    }
                }
            }
            //for claases list select all the info
            this.toggleAllP = () => {
                if( this.listePrecision == true){
                    for(let i in this.precisions){
                        this.precisions[i].wanted = false;
                    }  
                }else{
                    for(let i in this.precisions){
                        this.precisions[i].wanted = true;
                    }
                }
            }
            //for claases list select all the info
            this.toggleAllC = () => {
                if( this.listeContrainte == true){
                    for(let i in this.contraintes){
                        this.contraintes[i].wanted = false;
                    }  
                }else{
                    for(let i in this.contraintes){
                        this.contraintes[i].wanted = true;
                    }
                }
            }
        })
    }

    /**
     * Change the environnement of the user and change the color of the backgournd if not PRO
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    topmenuControl(log:User, mapApi:any){
        mapApi.agControllerRegister('topmenuCtrl', function($scope){
            /**************** From Submission ***************/

            /************** interactive List ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (let i in log._envAcc){
                this.itemsENT.push({name : 'Environnement : ' +log._envAcc[i]._env , value: log._envAcc[i]._env});
            }
            this.setEnv = () => {
                log._environnementSel = this.selectedItemENT;
                log.setEnvironnementSelected(this.selectedItemENT);
                if(log._environnementSel === 'TST')
                    $scope.bgEnv = {
                        "background-color" : "lightblue", 
                    }
                else if(log._environnementSel === 'DEV'){
                    $scope.bgEnv = {
                        "background-color" : "pink", 
                    }
                }else{
                    $scope.bgEnv = {
                        "background-color" : "white", 
                    }
                }
            }
            
        });
    }

    
    /**
     * the controller for the cleaning function
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    nettoyagecontrols(log:User, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitNetCtrl', function($scope){
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                    if($scope.IsVisible == true){
                        $scope.SelectedMenu = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenu = {
                        }
                    }
                }  
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.itemsA = [];

            for (let i in log._themeAcc){
                this.itemsA.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = () => {
                console.log(`set: ${this.selectedItemA}`);

                // populate list of working unit id
                this.itemsB.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemA)
                for (let i in list){
                    this.itemsB.push(list[i])
                }
            }
            /**************** From Submission ***************/
             this.submitNett = function() { 
                 let deleted = confirm('Confirmez le nettoyage ? / Confirm the cleaning ? ');
                 if(deleted){
                    let nettoyage:Cleaning = new Cleaning(this.selectedItemA ,this.selectedItemB)
                    let renet= nettoyage.submitForm(log);
                    if (renet != 'success'){

                        alert(renet.statusText)
                        $scope.SelectedMenu = {
                         "background-color" : "red", 
                    }
                    }else{

                        $scope.IsVisible = false;
                        //console.log(log._token);
                        alert("Deleted")
                        $scope.SelectedMenu = {
                            "background-color" : "green", 
                        }
                    }
                     
                } 
            };
        });
    }

    /**
     * The controoller for to cancel function
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    cancelcontrols(log:User, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('cancelStep', function($scope){ 
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                    if($scope.IsVisible == true){
                        $scope.SelectedMenu = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenu = {
                        }
                    }
                }  
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.stepCan = '';
            this.itemsA = [];
            for (let i in log._themeAcc){
                this.itemsA.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = () => {
                console.log(`set: ${this.selectedItemA}`);
                // populate list of working unit id
                this.itemsB.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemA)
                for (let i in list){
                    this.itemsB.push(list[i])
                }
            }
            /**************** From Submission ***************/
             this.submitCan = function() { 
                //get all the information of the form into the class
                /*let ext = new Extraire(
                     this.selectedItemA
                    ,this.selectedItemB);     
                let apireturn:any = ext.submitForm(log);
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                    $scope.SelectedMenu = {
                        "background-color" : "red", 
                    }
                }else{
                    $scope.IsVisible = false;
                    console.log(log._token);
                    $scope.SelectedMenu = {
                        "background-color" : "green", 
                    }
                }*/
                //alert(this._apireturn.value);    
            };
        });
    }

    /**
     * Compilateur de HTML avec les variables pour les boutons
     * @param {*} template the template for the form
     * @param {*} mapApi the main API with the function to compile
     * @returns {JQuery<HTMLElement>} return the output compiled
     * @memberof manageController
     */
    compileTemplate(template,mapApi): JQuery<HTMLElement> {
        let temp = $(template);
        mapApi.$compile(temp);
        return temp;
    } 
}