import { User } from "../user";
import { infoUser } from '../templates/infoUser';
import { helpDoc } from "../Documentation/helpDoc";

export class TopMenuController {

    constructor(){};
    /**
     * Change the environnement of the user and change the color of the backgournd if not PRO
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    topmenuControl(log: User, mapApi: any, panel: any) {
        mapApi.agControllerRegister('topmenuCtrl', function($scope) {
            const that = this;
            /************** interactive List ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (let i in log.getenvAcc()) {
                this.itemsENT.push({name : 'Environnement : ' +log.getenvAcc()[i]._env , value: log.getenvAcc()[i]._env});
            }
            this.setEnv = () => {
                log.setEnvironnementSelected(this.selectedItemENT);
                if (log.getenvironnementSel() === 'TST') {
                    $scope.bgEnv = {
                        "background-color" : "lightgreen", 
                    }
                } else if (log.getenvironnementSel() === 'DEV') {
                    $scope.bgEnv = {
                        "background-color" : "pink", 
                    }
                } else {
                    $scope.bgEnv = {
                        "background-color" : "white", 
                    }
                }
            }
            /*********** Info User Panel *************/
            this.openInfoUser = () => {
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
                output = output.replace('(equipe)',log.getequipe().getId());
                output = output.replace('(envir)', log.getenvironnementSel() + '  </br>URL : ' + log.geturlEnvselected());
                let paneluser: TopMenuController =  new TopMenuController()
                paneluser.controlUserInfo(log,mapApi);
                this.panel.body = output;
                this.panel.open();     
            }
            this.openHelpUser = () => {
                if (!this.panel1) {
                    // make sure both header and body have a digest cycle run on them
                    this.panel1 = mapApi.panels.create('help');
                    this.panel1.element.css({
                        bottom: '0em'
                    });
                    this.panel1.element.css({top: '0px;', left : '410px;', bottom: '50%;', margin: '100px 50px 100px 450px'});
                    this.panel1.header.closeButton;
                    this.panel1.header.title = `Help`;
                } else {
                    this.panel1.close();
                }
                this.panel1.body = helpDoc;
                this.panel1.open(); 
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
            $scope.IsVisibleUT = false;
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHide = () => {
                if (log.getenvironnementSel() !== '' && log.getcloseable() == true) {
                    $scope.IsVisibleP = $scope.IsVisibleP ? false : true;
                    if ($scope.IsVisibleP == true) {
                        //hide non-selected
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuP = {
                            'opacity': '1', 
                        };
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    } else {
                        $scope.SelectedMenuP = {};
                    }
                } else {
                    log.setcloseable(true);
                }    
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideEX =  () => {
                if (log.getenvironnementSel() !== '' && log.getcloseable() == true) {
                    $scope.IsVisibleEP = $scope.IsVisibleEP ? false : true; 
                    if ($scope.IsVisibleEP == true) {
                        //Advanced Setting
                        if (log.getadvanced() == true) {
                            $scope.AdvancedVisible = true;
                        } else {
                            $scope.AdvancedVisible = false;
                        }
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuE = {
                            'opacity': '1', 
                        };
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    } else {
                        $scope.SelectedMenuE = {};
                    }
                } else {
                    log.setcloseable(true);
                }   
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideEXSR = () => {
                if (log.getenvironnementSel() !== '' && log.getcloseable() == true) {
                    $scope.IsVisibleSR = $scope.IsVisibleSR ? false : true;
                    if ($scope.IsVisibleSR == true) {
                        //Advanced Setting
                        if (log.getadvanced() == true) {
                            $scope.AdvancedVisible = true;
                        } else {
                            $scope.AdvancedVisible = false;
                        }
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuEU = {
                            'opacity' : '1', 
                        }
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    } else {
                        $scope.SelectedMenuEU = {}
                    }
                } else {
                    log.setcloseable(true);
                }   
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCr = () => {
                if (log.getenvironnementSel() !== '' && log.getcloseable() == true) {
                    $scope.IsVisibleCR = $scope.IsVisibleCR ? false : true;
                    if ($scope.IsVisibleCR == true) {
                        document.getElementsByClassName('panel-body')[7].setAttribute('id','scrolling')
                        let myElement = document.getElementById('create');;
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuCr = {
                            'opacity': '1', 
                        }
                        $scope.SelectedMenuEU = {}
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    } else {
                        $scope.SelectedMenuCr = {};
                    } 
                } else {
                    log.setcloseable(true);
                }     
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideV = () => {
                if (log.getenvironnementSel() !== '' && log.getcloseable() == true) {
                    $scope.IsVisibleV = $scope.IsVisibleV ? false : true;
                    if ($scope.IsVisibleV == true) {
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuV = {
                            'opacity': '1', 
                        };
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    } else {
                        $scope.SelectedMenuV = {};
                    } 
                } else {
                    log.setcloseable(true);
                }     
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideD = () => {
                if (log.getenvironnementSel() !== '' && log.getcloseable() == true) {
                    $scope.IsVisibleD = $scope.IsVisibleD ? false : true;
                    if ($scope.IsVisibleD == true) {
                        //Advanced Setting
                        if (log.getadvanced() === true) {
                            $scope.AdvancedVisible = true;
                        } else {
                            $scope.AdvancedVisible = false;
                        }
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuD = {
                            'opacity': '1', 
                        }
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    } else {
                        $scope.SelectedMenuD = {};
                    } 
                } else {
                    log.setcloseable(true);
                }     
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCl = () => {
                if (log.getenvironnementSel() !== '' && log.getcloseable() == true) {
                    $scope.IsVisibleCL = $scope.IsVisibleCL ? false : true; 
                    if ($scope.IsVisibleCL == true) {
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuC = {
                            'opacity': '1', 
                        }
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    } else {
                        $scope.SelectedMenuC = {};
                    }
                } else {
                    log.setcloseable(true);
                }   
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCa = () => {
                if (log.getenvironnementSel() !== '' && log.getcloseable() == true) {
                    $scope.IsVisibleCA = $scope.IsVisibleCA ? false : true; 
                    if ($scope.IsVisibleCA == true) {
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuCa = {
                            'opacity': '1', 
                        }
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuUT = {};
                    } else {
                        $scope.SelectedMenuCa = {};
                    }
                } else {
                    log.setcloseable(true);
                }   
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideUT = () => {
                if (log.getenvironnementSel() !== '' && log.getcloseable() == true) {
                    $scope.IsVisibleUT = $scope.IsVisibleUT ? false : true;
                    if ($scope.IsVisibleUT == true) {
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        //highlight
                        $scope.SelectedMenuUT = {
                            'opacity' : '1', 
                        };
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                    } else {
                        $scope.SelectedMenuUT = {};
                    }
                } else {
                    log.setcloseable(true);
                }    
            }
        });
    }
    /**
     *
     * @param {User} log
     * @param {*} mapApi
     * @memberof TopMenuController
     */
    controlUserInfo(log: User, mapApi: any): void {
        mapApi.agControllerRegister('infoUserCtrl', function($scope){
            this.emailUser = 'jean-sebastien.bruneau-blais@canada.ca';
            this.checkAdvanced = log.getadvanced();
            this.changeEmail = () =>{
                alert('hello');
            };
            this.checkingAdvanced = () => {
                if (log.getadvanced() === true) {
                    log.setadvanced(false);
                } else {
                    log.setadvanced(true);
                }
            }
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

export interface TopMenuController {
    
    panel: any;
    panel1:any;
    
}