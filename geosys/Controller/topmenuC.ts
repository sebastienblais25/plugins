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
                this.panel.body = output;
        
                this.panel.open();
                
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
    
}