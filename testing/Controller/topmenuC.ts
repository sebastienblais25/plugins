import { User } from "../user";
import { Creer } from "../operation/creer";


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
            let count:number = 0
            this.openInfoUser = () =>{
                let panel:any;
                console.log(mapApi.panels);
                if (count < 1){
                    panel = mapApi.panels.create('infoUser');
                    panel.element.css({top: '0px;', left : '410px;', bottom: '50%;', margin: '100px 300px 300px 500px'});
                    panel.header.title = 'Info User';
                    let closeBtn = panel.header.closeButton;
                    count++;
                }

                
                panel.open();
                
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