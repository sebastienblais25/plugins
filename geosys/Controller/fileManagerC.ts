import { User } from "../user";
import { FileMana } from '../operation/fileMana';
import { dragdropFunction } from "../javascript/dragndrop";
const FileSaver = require('file-saver'); // le import


export class FileManagerController{


    constructor(){}


    fileManagercontrols(log:User, mapApi:any, tfm:FileMana):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('FileManagerCtrl', function($scope){
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.OpenFileManager = () => {
                if(log._environnementSel!= ''){
                    
                    if (!this.panel) {
                        // make sure both header and body have a digest cycle run on them
                        this.panel = mapApi.panels.create('FileManager');
            
                        this.panel.element.css({
                            bottom: '0em',
                        });
            
                        this.panel.element.css({top: '0px;', margin: '100px 50px 100px 450px'});
                        this.panel.header.toggleButton;
                        this.panel.header.closeButton;
                        

                        this.panel.header.title = `File Manager (Alpha testing)`;
                        let fmc:FileManagerController = new FileManagerController();
                    
                        let output = tfm.buildUI()+dragdropFunction;
                        if (tfm._nextFolder == 'root'){
                            tfm.obtainArbo(log);
                            fmc.FileManaManager(log,mapApi, tfm, this.panel);
                            this.panel.body = output;
                        }
                        
                    }else {
                        this.panel.close();
                    }
                    
                    this.panel.open();
                    
                }
            };
        });
    };

    FileManaManager(log:User, mapApi:any, tfm:FileMana, panel:any):void{
        mapApi.agControllerRegister('fileManagerPanelCtrl', function($scope){
            this.folders = [];
            this.files = [];
            this.breadcrumbs = tfm._breadcrumbs;
            this.folders = tfm.buildFolderList();
            this.files = tfm.buildFileList();
            
            this.precedent = () =>{
                let rank = tfm._list.length - 2
                if(rank >= 0){
                    tfm.setbreacrumbsForNav(rank.toString());
                    let fmc:FileManagerController = new FileManagerController();
                    let output = tfm.buildUI()+dragdropFunction;
                    tfm.obtainArbo(log);
                    fmc.FileManaManager(log,mapApi, tfm, panel);
                    panel.body = output; 
                }
                
            }

            this.refresh = () =>{
                let fmc:FileManagerController = new FileManagerController();
                
                let output = tfm.buildUI();
                tfm.obtainArbo(log);
                fmc.FileManaManager(log,mapApi, tfm, panel);
                panel.body = output;
            }

            //open the folder from the breadcrumbs
            this.followup = (folder)  => {
                tfm.setbreacrumbsForNav(folder);
                let fmc:FileManagerController = new FileManagerController();
                let output = tfm.buildUI()+dragdropFunction;
                tfm.obtainArbo(log);
                fmc.FileManaManager(log,mapApi, tfm, panel);
                panel.body = output;
            }

            //open a folder when clicked
            this.openFolder = (folder) => {
                tfm.setNextFolder(folder.name);
                tfm._breadcrumbs = tfm._breadcrumbs + '/' + tfm._nextFolder;
                let fmc:FileManagerController = new FileManagerController();
                
                let output = tfm.buildUI();
                tfm.obtainArbo(log);
                fmc.FileManaManager(log,mapApi, tfm, panel);
                panel.body = output;
            }

            //download file on download button clicked
            this.downloadFile = (file) => {
                tfm.downloadFile(file.name,tfm._breadcrumbs,log.gettoken());
            }

            //delete file on delete button clicked
            this.deleteFile = (file) => {
                tfm.deleteFile(file.name,tfm._breadcrumbs,log.gettoken());
            }

            //upload file on drag and drop of file
            this.uploadFile = () =>{
                //alert("hello")
                let file = (<HTMLInputElement>document.getElementById('fileInput')).files[0]
                console.log(file)
                //let blob = new Blob([file],{type:"application/json"});
                //FileSaver.saveAs(blob,file.name);
                const myMap = (<any>window).RAMP.mapById(mapApi.id);

                // If you want to add a layer by configuration you can use this
                const objURL = URL.createObjectURL(file);
                const layerJSON = {
                    "id": "0",
                    "name": file.name,
                    "layerType": "esriFeature",
                    "fileType": "geojson",
                    "url": objURL
                };
                const myConfigLayer = myMap.layers.addLayer(layerJSON);

            }
        });
    }

}

export interface FileManagerController {
    panel: any; 
}