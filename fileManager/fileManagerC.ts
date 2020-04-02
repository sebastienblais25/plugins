import { FileMana } from '../fileManager/fileMana';
import { dragdropFunction } from "../fileManager/dragndrop";

export class FileManagerController {

    constructor(){}
    /**
     * Create the first panel for the with the root 
     * @param {User} log for the token and other useful tools
     * @param {*} mapApi The object of the API
     * @param {FileMana} tfm the object File Manager to keep where you are in a repository
     * @memberof FileManagerController
     */
    fileManagercontrols(token: string, mapApi: any, tfm: FileMana, panel:any): void {  
        //if the panel already exist
        this.panel = panel;
        //title on the panel
        this.panel.header.title = `File Manager (Alpha testing)`;
        let fmc: FileManagerController = new FileManagerController();
        //build the UI for the file manager
        let output = tfm.buildUI() + dragdropFunction;
        if (tfm.getNextFolder() == 'root') {
            tfm.obtainArbo(token).then(values => {
                tfm.setValue(values);
                fmc.FileManaManager(token,mapApi, tfm, this.panel);
                this.panel.body = output;
            });   
        }  
        
        this.panel.open(); 
    };
    /**
     * Create the panel body when a folder is clicked
     * @param {User} log User tools
     * @param {*} mapApi the map Object
     * @param {FileMana} tfm to keep track where you are
     * @param {*} panel the panel to add the body
     * @memberof FileManagerController
     */
    FileManaManager(token: string, mapApi: any, tfm: FileMana, panel: any): void {
        mapApi.agControllerRegister('fileManagerPanelCtrl', function() {
            //building the list of folder and file
            this.folders = [];
            this.files = [];
            this.breadcrumbs = tfm.getBreadcrumbs();
            this.folders = tfm.buildFolderList();
            this.files = tfm.buildFileList();
            //click on the left arrow to back one folder
            this.precedent = () => {
                let rank = tfm.getList().length - 2
                if (rank >= 0) {
                    tfm.setbreacrumbsForNav(rank.toString());
                    let fmc: FileManagerController = new FileManagerController();
                    let output = tfm.buildUI() + dragdropFunction;
                    tfm.obtainArbo(token).then(values => {
                        tfm.setValue(values);
                        fmc.FileManaManager(token,mapApi, tfm, panel);
                        panel.body = output;
                    });   
                    
                } 
            }
            //refresh the folder 
            this.refresh = () => {
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel);
                    panel.body = output;
                });
            }
            //open the folder from the breadcrumbs
            this.followup = (folder)  => {
                tfm.setbreacrumbsForNav(folder);
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel);
                    panel.body = output;
                });
            }
            //open a folder when clicked
            this.openFolder = (folder) => {
                tfm.setNextFolder(folder.name);
                tfm.setBreadcrumbs(tfm.getBreadcrumbs() + '/' + tfm.getNextFolder());
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel);
                    panel.body = output;
                });
            }
            //download file on download button clicked
            this.downloadFile = (file) => {
                tfm.downloadFile(file.name, tfm.getBreadcrumbs(), token);
            }
            //delete file on delete button clicked
            this.deleteFile = (file) => {
                tfm.deleteFile(file.name, tfm.getBreadcrumbs(), token);
            }
            //download file on download button clicked
            this.downloadFolder = (folder) => {
                tfm.downloadFolder(folder.name, tfm.getBreadcrumbs(), token);
            }
            //delete file on delete button clicked
            this.deleteFolder = (folder) => {
                tfm.deleteFolder(folder.name, tfm.getBreadcrumbs(), token);
            }
            //create a new folder
            this.createFolder = () => {
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
                    fmc.addingFolder(token,tfm, mapApi,this.panel1);
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
                let file = (<HTMLInputElement>document.getElementById('fileInput')).files[0];
                tfm.uploadfile(tfm.getBreadcrumbs(),token,file);
            }
        });
    }
    /**
     * The panel to name the new folder and add the new folder in thje directory
     * @param {string} token
     * @param {FileMana} tfm
     * @param {*} mapApi
     * @memberof FileManagerController
     */
    addingFolder(token: string, tfm: FileMana, mapApi: any, panel:any): void {
        mapApi.agControllerRegister('folderCtrl', function() {
            this.addfolder = () => {
                tfm.createFolder(tfm.getBreadcrumbs(), token,this.nameFolder);
                panel.close();

            }
        });
    }
}

export interface FileManagerController {
    panel: any;
    panel1:any; 
}