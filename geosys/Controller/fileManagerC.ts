import { User } from "../user";
import { FileMana } from '../operation/fileMana';
import { dragdropFunction } from "../javascript/dragndrop";
const FileSaver = require('file-saver'); // le import


export class FileManagerController {


    constructor(){}


    fileManagercontrols(log: User, mapApi: any, tfm: FileMana): void {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('FileManagerCtrl', function($scope) {
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.OpenFileManager = () => {
                if (log.getenvironnementSel() !== '') {
                    //if the panel already exist
                    if (!this.panel) {
                        // make sure both header and body have a digest cycle run on them
                        this.panel = mapApi.panels.create('FileManager');
                        //Size of the panel
                        this.panel.element.css({top: '0px;', margin: '100px 50px 100px 450px'});
                        //button in the header of the panel
                        this.panel.header.toggleButton;
                        this.panel.header.closeButton;
                        //title on the panel
                        this.panel.header.title = `File Manager (Alpha testing)`;
                        let fmc: FileManagerController = new FileManagerController();
                        //build the UI for the file manager
                        let output = tfm.buildUI()+dragdropFunction;
                        if (tfm._nextFolder == 'root') {
                            tfm.obtainArbo(log);
                            fmc.FileManaManager(log,mapApi, tfm, this.panel);
                            this.panel.body = output;
                        }  
                    } else {
                        this.panel.close();
                    }
                    this.panel.open();
                }
            };
        });
    };

    FileManaManager(log: User, mapApi: any, tfm: FileMana, panel: any): void {
        mapApi.agControllerRegister('fileManagerPanelCtrl', function($scope) {
            //building the list of folder and file
            this.folders = [];
            this.files = [];
            this.breadcrumbs = tfm._breadcrumbs;
            this.folders = tfm.buildFolderList();
            this.files = tfm.buildFileList();
            
            //click on the left arrow to back one folder
            this.precedent = () => {
                let rank = tfm._list.length - 2
                if (rank >= 0) {
                    tfm.setbreacrumbsForNav(rank.toString());
                    let fmc: FileManagerController = new FileManagerController();
                    let output = tfm.buildUI() + dragdropFunction;
                    tfm.obtainArbo(log);
                    fmc.FileManaManager(log, mapApi, tfm, panel);
                    panel.body = output; 
                } 
            }
            //refresh the folder 
            this.refresh = () => {
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI();
                tfm.obtainArbo(log);
                fmc.FileManaManager(log, mapApi, tfm, panel);
                panel.body = output;
            }

            //open the folder from the breadcrumbs
            this.followup = (folder)  => {
                tfm.setbreacrumbsForNav(folder);
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI()+dragdropFunction;
                tfm.obtainArbo(log);
                fmc.FileManaManager(log, mapApi, tfm, panel);
                panel.body = output;
            }

            //open a folder when clicked
            this.openFolder = (folder) => {
                tfm.setNextFolder(folder.name);
                tfm._breadcrumbs = tfm._breadcrumbs + '/' + tfm._nextFolder;
                let fmc: FileManagerController = new FileManagerController(); 
                let output = tfm.buildUI();
                tfm.obtainArbo(log);
                fmc.FileManaManager(log, mapApi, tfm, panel);
                panel.body = output;
            }

            //download file on download button clicked
            this.downloadFile = (file) => {
                tfm.downloadFile(file.name, tfm._breadcrumbs, log);
            }

            //delete file on delete button clicked
            this.deleteFile = (file) => {
                tfm.deleteFile(file.name, tfm._breadcrumbs, log);
            }

            //download file on download button clicked
            this.downloadFolder = (folder) => {
                tfm.downloadFolder(folder.name, tfm._breadcrumbs, log);
            }

            //delete file on delete button clicked
            this.deleteFolder = (folder) => {
                tfm.deleteFolder(folder.name, tfm._breadcrumbs, log);
            }
            //create a new folder
            this.createFolder = () => {
                //alert('creating new folder')
                if (!this.panel1) {
                    // make sure both header and body have a digest cycle run on them
                    this.panel1 = mapApi.panels.create('AddFolder');
                    this.panel1.element.css({
                        bottom: '0em',
                        width: '300px',
                        height: '200px'
                    });
                    this.panel1.element.css({top: '0px;', margin: '200px 50px 100px 650px'});
                    this.panel1.header.closeButton;
                    this.panel1.header.title = `Add Folder`;
                    let fmc: FileManagerController = new FileManagerController();
                    fmc.addingFolder(log,tfm, mapApi);
                    let output: string = `<div ng-controller="folderCtrl as ctrl16">
                    <md-input-container style="margin-bottom: 0px;height: 34px; width:275px; ">
                        <label>Name the folder</label>
                        <input type="text" ng-model="ctrl16.nameFolder"/>
                    </md-input-container>
                    <md-input-container style="float:right;">
                        <md-button class="md-raised" ng-click="ctrl16.addfolder()">
                            add Folder
                        </md-button>
                    </md-input-container>
                    </div>`;
                    this.panel1.body = output;  
                } else {
                    this.panel1.close();
                }
                this.panel1.open();
            }

            //upload file on drag and drop of file
            this.uploadFile = () => {
                let file = (<HTMLInputElement>document.getElementById('fileInput')).files[0]
                tfm.uploadfile(tfm._breadcrumbs,log,file)
            }
        });
    }

    //the panel to name the new folder and add the new folder in thje directory
    addingFolder(log: User, tfm: FileMana, mapApi: any): void {
        mapApi.agControllerRegister('folderCtrl', function($scope) {
            this.addfolder = () => {
                tfm.createFolder(tfm._breadcrumbs, log,this.nameFolder)
            }
        });
    }

}

export interface FileManagerController {
    panel: any;
    panel1:any; 
}