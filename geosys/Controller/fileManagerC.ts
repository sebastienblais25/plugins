import { User } from "../user";
import { TestFile } from '../testFile';


export class FileManagerController{


    constructor(){}


    fileManagercontrols(log:User, mapApi:any, tfm:TestFile):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('FileManagerCtrl', function($scope){
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.OpenFileManager = () => {
                if(log._environnementSel!= ''){
                    
                    $scope.SelectedMenuFM = {
                        "background-color" : "blue", 
                    }
                    if (!this.panel) {
                        // make sure both header and body have a digest cycle run on them
                        this.panel = mapApi.panels.create('FileManager');
            
                        this.panel.element.css({
                            bottom: '0em',
                            //width: '400px'
                        });
            
                        this.panel.element.css({top: '0px;', margin: '100px 50px 100px 450px'});
            
                        let closeBtn = this.panel.header.closeButton;
                        this.panel.header.title = `File Manager (Alpha testing)`;
                        let fmc:FileManagerController = new FileManagerController();
                    
                        let output = tfm.buildUI();
                        if (tfm._nextFolder == 'root'){
                            tfm.obtainArbo(log);
                            fmc.testFileManager(log,mapApi, tfm, this.panel);
                            this.panel.body = output;
                        }
                        this.panel.open();
                    }else {
                        this.panel.close();
                    }
                    
                    
                    
                }
            };
        });
    };

    testFileManager(log:User, mapApi:any, tfm:TestFile, panel:any):void{
        mapApi.agControllerRegister('fileManagerPanelCtrl', function($scope){
            this.folders = [];
            this.files = [];
            this.breadcrumbs = tfm._breadcrumbs;
            this.folders = tfm.buildFolderList();
            this.files = tfm.buildFileList();
            const dragDrop = require('drag-drop')
 
            /*dragDrop('#dropTarget', (files, pos, fileList, directories) => {
                console.log('Here are the dropped files', files) // Array of File objects
                console.log('Dropped at coordinates', pos.x, pos.y)
                console.log('Here is the raw FileList object if you need it:', fileList)
                console.log('Here is the list of directories:', directories)
            })*/

            this.openFolder = (folder) => {
                //console.log(folder.name);
                tfm.setNextFolder(folder.name);
                
                let fmc:FileManagerController = new FileManagerController();
                
                let output = tfm.buildUI();
                tfm.obtainArbo(log);
                fmc.testFileManager(log,mapApi, tfm, panel);
                panel.body = output;
            }

            this.downloadFile = (file) => {
                alert(file.name + ' downloaded from ' + tfm._breadcrumbs)
            }

            this.deleteFile = (file) => {
                alert(file.name + ' deleted from ' + tfm._breadcrumbs)
            }
        });
    }

}

export interface FileManagerController {
    
    panel: any;
    
}