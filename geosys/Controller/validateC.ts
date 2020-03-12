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
            $scope.errJSON = false;
            /************** interactive List ***************/
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (let i in log._themeAcc){
                this.itemsE.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            this.itemsF = [];
            this.setList = () => {
                this.selectedItemF = '';
                // populate list b with new items
                this.itemsF.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemE)
                for (let i in list){
                    this.itemsF.push(list[i])
                }
            }
    
            //Envoie le fromulaire a l'API
            this.submitFormV = function(element) { 
                if((<HTMLInputElement>document.getElementById('fileJSON')).files.length == 0){
                    $scope.errJSON = true;
                    log._closeable =false;
                }else{
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
                        log._closeable =false;
                        $scope.SelectedMenuV = {
                            "background-color" : "red", 
                        }
                    }else{
                        console.log(log.gettoken());
                        $scope.SelectedMenuV = {
                            "background-color" : "green", 
                        }
                    }
                }
            };
        })
    }
}