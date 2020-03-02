import { User } from "../user";
import { Creer } from "../operation/creer";
import { infoUser } from '../templates/infoUser';


export class TopMenuController{

    constructor(){};

    /**
     * Change the environnement of the user and change the color of the backgournd if not PRO
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    topmenuControl(log:User, mapApi:any, panel:any){
        mapApi.agControllerRegister('topmenuCtrl', function($scope/*, $location, $anchorScroll*/){
            
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
            /*********** Info User Panel *************/
            this.openInfoUser = () =>{
                if (!this.panel) {
                    // make sure both header and body have a digest cycle run on them
                    this.panel = mapApi.panels.create('infoUser');
        
                    this.panel.element.css({
                        bottom: '0em',
                        width: '400px'
                    });
        
                    this.panel.element.css({top: '0px;', left : '410px;', bottom: '50%;', margin: '100px 300px 300px 500px'});
        
                    let closeBtn = this.panel.header.closeButton;
                    this.panel.header.title = `Info user`;
                } else {
                    this.panel.close();
                }
                let output = infoUser.replace('(username)',log.getusername() + ' ' + log.getpassword());
                output = output.replace('(theme)',log.getAllThemeNAme());
                output = output.replace('(right)',log.getrightRead() + ' ' + log.getrightWrite());
                output = output.replace('(equipe)',log._equipe._id);
                output = output.replace('(envir)', log._environnementSel + '  </br>URL : ' + log._urlEnvselected);
                this.panel.body = output;
        
                this.panel.open();
                
            }

            /**************** form opening handler ***************/
            $scope.IsVisibleP = false;
            $scope.IsVisibleEP = false;
            $scope.IsVisibleSR = false;
            $scope.IsVisibleCR = false;
            $scope.IsVisibleV = false;
            $scope.IsVisibleD = false;
            $scope.IsVisibleCL = false;
            $scope.IsVisibleCA = false;

            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHide = function(){ 
                
                if(log._environnementSel!= ''){
                   
                    $scope.IsVisibleP = $scope.IsVisibleP ? false : true;
                    if($scope.IsVisibleP == true){
                        //hide non-selected
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        //highlight
                        $scope.SelectedMenuP = {
                            "opacity" : "1", 
                        };
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                    }else{
                        $scope.SelectedMenuP = {};
                    }
                }    
            };
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHideEX = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisibleEP = $scope.IsVisibleEP ? false : true; 
                    if($scope.IsVisibleEP == true){
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        //highlight
                        $scope.SelectedMenuE = {
                            "opacity" : "1", 
                        };
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                    }else{
                        $scope.SelectedMenuE = {};
                    }
                }  
            };
            
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHideEXSR = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisibleSR = $scope.IsVisibleSR ? false : true;
                    if($scope.IsVisibleSR == true){
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        //highlight
                        $scope.SelectedMenuEU = {
                            "opacity" : "1", 
                        }
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                    }else{
                        $scope.SelectedMenuEU = {}
                    }
                }  
            };

            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHideCr = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisibleCR = $scope.IsVisibleCR ? false : true;
                    if($scope.IsVisibleCR == true){
                        
                        document.getElementsByClassName('panel-body')[7].setAttribute('id','scrolling')
                        let myElement = document.getElementById('create');
                        /*$( "#create" ).click(function() {
                            var container = document.getElementById('scrolling'); 
                            var scrollTo = document.getElementById('create');
                            container.scrollTop = scrollTo.offsetTop - 30;
                        });*/

                        //let topPos = myElement.offsetTop;
                        //console.log(panel.body);
                        //document.getElementById('scrolling').scrollTop = topPos;
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        //highlight
                        $scope.SelectedMenuCr = {
                            "opacity" : "1", 
                        }
                        $scope.SelectedMenuEU = {}
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                    }else{
                        $scope.SelectedMenuCr = {};
                    } 
                }    
            };
            
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHideV = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisibleV = $scope.IsVisibleV ? false : true;
                    if($scope.IsVisibleV == true){
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        //highlight
                        $scope.SelectedMenuV = {
                            "opacity" : "1", 
                        };
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                    }else{
                        $scope.SelectedMenuV = {};
                    } 
                }    
            };
            
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHideD = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisibleD = $scope.IsVisibleD ? false : true;
                    if($scope.IsVisibleD == true){
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        //highlight
                        $scope.SelectedMenuD = {
                            "opacity" : "1", 
                        }
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                    }else{
                        $scope.SelectedMenuD = {};
                    } 
                }    
            };
            
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHideCl = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisibleCL = $scope.IsVisibleCL ? false : true; 
                    if($scope.IsVisibleCL == true){
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCA = false;
                        //highlight
                        $scope.SelectedMenuC = {
                            "opacity" : "1", 
                        }
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuCa = {};
                    }else{
                        $scope.SelectedMenuC = {};
                    }
                }  
            };
            
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHideCa = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisibleCA = $scope.IsVisibleCA ? false : true; 
                    if($scope.IsVisibleCA == true){
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        //highlight
                        $scope.SelectedMenuCa = {
                            "opacity" : "1", 
                        }
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                    }else{
                        $scope.SelectedMenuCa = {};
                    }
                }  
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

    /**
     * Scroll to a DOM element
     * @function  scrollToElement
     * @param {Number} id element id
     */
    scrollToElement(id) {
        //$timeout(() => {
            $(`#${id}`)[0].scrollIntoView();
        //}, constants.delayScrollToElement);
    }

    
}

export interface TopMenuController {
    
    panel: any;
    
}