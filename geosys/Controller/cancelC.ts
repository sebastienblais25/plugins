import { User } from "../user";
//import { Cancel } from "../operation/cancel";


export class CancelController {

    constructor(){};

     /**
     * The controoller for to cancel function
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    cancelcontrols(log: User, mapApi: any): void {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('cancelStep', function($scope) { 
            /************** interactive List ***************/
            //theme
            this.selectedItemA = '';
            //working unit ID
            this.selectedItemB = '';
            //Step for the cancel
            this.stepCan = '';
            //Set up for the list of theme
            this.itemsA = [];
            for (let i in log.getThemeAcc()) {
                this.itemsA.push({name : log.getThemeAcc()[i].getId() , value: log.getThemeAcc()[i].getId()});
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = () => {
                // populate list of working unit id
                this.itemsB.length = 0;
                let list: any = log.setidUTtheme(this.selectedItemA)
                for (let i in list) {
                    this.itemsB.push(list[i])
                }
            }
            /**************** From Submission ***************/
             this.submitCan = () => { 
                //get all the information of the form into the class
                /*let ext = new Extraire(
                     this.selectedItemA
                    ,this.selectedItemB);     
                let ApiReturn:any = ext.submitForm(log);
                if (ApiReturn != 'success'){
                    alert(ApiReturn.statusText)
                    $scope.SelectedMenu = {
                        "background-color" : "red", 
                    }
                }else{
                    $scope.IsVisibleCA = false;
                    console.log(log._token);
                    $scope.SelectedMenu = {
                        "background-color" : "green", 
                    }
                }*/
                //alert(this._ApiReturn.value);    
            };
        });
    }
}