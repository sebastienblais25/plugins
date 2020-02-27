import { User } from "../user";
import { Valider } from '../operation/valider';



export class ValidateController{

    constructor(){};

      /**
     *the controller for all the function in the delivery templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    valiControl(log:User, mapApi:any):void{
        //mapApi.agDirectiveRegister()
        mapApi.agControllerRegister('submitFromV', function($scope){
            
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
                formdata.append('theme', this.selectedItemE);
                formdata.append('id_ut', this.selectedItemF)
                formdata.append('fichier_json', (<HTMLInputElement>document.getElementById('fileJSON')).files[0])
                formdata.append('logfile','blahblahblah')
                let vali:Valider = new Valider();
                let api:any = vali.submitForm(formdata,log);
                if (api != undefined){
                    alert(api);
                    console.log(api);
                    $scope.SelectedMenuV = {
                        "background-color" : "red", 
                    }
                }else{
                    console.log(log.gettoken());
                    $scope.SelectedMenuV = {
                        "background-color" : "green", 
                    }
                }
            };
        })
    }
}