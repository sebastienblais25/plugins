
import { User } from '../user';
import { urlListFile, urlFileAction } from '../config/url';
import { Connexion } from '../apiConnect';
const FileSaver = require('file-saver'); // le import



export class FileMana{

    _conn:Connexion = new Connexion();
    _breadcrumbs:string = '';
    _lastFolder:string;
    _liveFolder:string
    _nextFolder:string;
    _value:any;
    _list = [];


    /**
     *Creates an instance of FileMana.
     * @param {string} [nextFolder='root']
     * @memberof FileMana
     */
    constructor(nextFolder:string = 'root'){
        //this._breadcrumbs = 'root';
        this._nextFolder = nextFolder
        this._breadcrumbs= '...';
    }

    /**
     * obtain the structure of a folder with a path send
     * @param {User} log for the token
     * @memberof FileMana
     */
    obtainArbo(log:User){
        this._nextFolder = '';
        this._value = this._conn.connexionAPIFileManager(log.getToken(),this.setNavigation(),'Get','application/json');  
    }

    /**
     * set the url for the navigation in the file manager
     * @returns {string} return the url needed
     * @memberof FileMana
     */
    setNavigation():string{
        return 'http://127.0.0.1:4010/' + urlListFile + this._breadcrumbs + '&__example=' + this._breadcrumbs
    }

    /**
     * build a list of folder with the return of the API
     * @returns return a list of folder
     * @memberof FileMana
     */
    buildFolderList(){
        let listFo = [];
        for(let i in this._value.list_folder){
            listFo.push( { name: this._value.list_folder[i].name, modified:this._value.list_folder[i].last_modified, wanted: false });
        }
        return listFo;
    }

    /**
     * build a list of file with the return of the API
     * @returns return a list of file
     * @memberof FileMana
     */
    buildFileList(){
        let listFi = [];
        for(let i in this._value.list_file){
            listFi.push( { name: this._value.list_file[i].name , size:this._value.list_file[i].size, modified:this._value.list_file[i].last_modified, wanted: false });
        }
        return listFi;
    }

    /**
     * Build the template for the file manager
     * @returns {string} return a template
     * @memberof FileMana
     */
    buildUI():string{
        let output:string = `
        <div ng-controller="fileManagerPanelCtrl as ctrl11">
            <div class="Geosys-topcover"></div>
            <div class="Geosys-sticky-Header">
                <div class="Geosys-backing" ng-click="ctrl11.precedent()"><i class="material-icons">arrow_back</i></div>
                <div class="Geosys-backing" ng-click="ctrl11.refresh()"><i class="material-icons">refresh</i></div>
                <div class="Geosys-backing" ng-click="ctrl11.createFolder()"><i class="material-icons">create_new_folder</i></div>
                <div class="Geosys-breadclass">`+ this.buildClickablebreadcrumbs() +`</div>
                <div class="Geosys-header-File">
                    <span class="Geosys-name-File-Folder-Header">Name</span> 
                    <span class="Geosys-modified-File-Folder-Header">Date modified</span>
                    <span class="Geosys-size-File-Folder-Header">Size</span>
                </div>
            </div>
            <div id="div1" ondragenter="onDragEnter(event);"
            ondragover="onDragOver(event);"
            ondragleave="onDragLeave(event);"
            ondrop="onDrop(event);">
            <form>
                <md-list-item class="Geosys-folderBtn" ng-repeat="folder in ctrl11.folders">
                    <div class="Geosys-groupingInfo">
                        <div ng-click="ctrl11.openFolder(folder)" style="width: 90%;margin: 0;float: left;">
                            <md-icon>
                                <i class="material-icons">
                                    folder
                                </i>
                            </md-icon>
                            
                            <span class="Geosys-name-File-Folder Geosys-lilPad">{{ folder.name }}</span>
                            <span class="Geosys-modified-File-Folder Geosys-lilPad">{{ folder.modified }}</span>
                        </div>
                        <div class="Geosys-downloadbtn" ng-click="ctrl11.deleteFolder(folder)"><i class="material-icons">delete</i></div>
                        <div class="Geosys-downloadbtn" ng-click="ctrl11.downloadFolder(folder)"><i style="padding-top: 2px;" class="material-icons">get_app</i></div>
                    </div>
                </md-list-item>
                
                <md-list-item class="Geosys-fileBtn" ng-repeat="file in ctrl11.files">
                    <div class="Geosys-groupingInfo">
                        <md-icon>
                            <i class="material-icons">
                                insert_drive_file
                            </i>
                        </md-icon>
                        <span class="Geosys-name-File-Folder Geosys-lilPad">{{ file.name }}</span> 
                        <span class="Geosys-modified-File-Folder Geosys-lilPad">{{ file.modified }}</span>
                        <span class="Geosys-size-File-Folder Geosys-lilPad">{{ file.size }} KB</span>
                        <div class="Geosys-downloadbtn" ng-click="ctrl11.deleteFile(file)"><i class="material-icons">delete</i></div>
                        <div class="Geosys-downloadbtn" ng-click="ctrl11.downloadFile(file)"><i style="padding-top: 2px;" class="material-icons">get_app</i></div>
                    </div>       
                </md-list-item>
                <div class="Geosys-hidden-upload">
                    <input class="Geosys-hidden-upload" type="file"
                        id="fileInput">
                    <md-button id="uploading" ng-click="ctrl11.uploadFile();" class="Geosys-hidden-upload">Upload</md-button>
                </div>
            </form>
            </div>
            <div class="Geosys-drop-window">
                <div class="Geosys-drop-window-content">
                    <h3>Drop files to upload</h3>
                </div>
            </div>
        </div>
        `
        return output;
    }

    /**
     * build a clickable breacrumbs for the navigations
     * @returns return a string for the templates
     * @memberof FileMana
     */
    buildClickablebreadcrumbs(){
        this._list =  this._breadcrumbs.split('/');
        let bc:string = '';
        let lenght = this._list.length - 1;
        for(let i in this._list){
            if(i === lenght.toString()){
                bc += `&nbsp;/<span class="Geosys-breadClick">`+this._list[i]+`</span>`;
            }else{
                bc += `&nbsp/<span class="Geosys-breadClick" ng-click="ctrl11.followup('`+ i +`')">`+this._list[i]+`</span>`;
            }
            
        }
        return bc;
    }

    /**
     * set the path needed to get into the good folder
     * @param {string} rank wich folder we want to go in
     * @memberof FileMana
     */
    setbreacrumbsForNav(rank:string){
        
        this._breadcrumbs = '';
        for(let i in this._list){
            if(i < rank){
                this._breadcrumbs += this._list[i] + '/'
            }else if(i === rank){
                this._breadcrumbs += this._list[i]
            }else{
                break;
            }
        }
    }

    /**
     * set properties next folder
     * @param {string} next name of the next folder
     * @memberof FileMana
     */
    setNextFolder(next:string):void{
        this._nextFolder = next ;
    }

    /**
     * set a formdata to the Api to upload a file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    uploadfile(path:string, log:User,file:File):void{
        alert(path + ' ' + log.getToken())
        console.log(file);
        this._conn.connexionAPIFileManager(log.getToken(),log.constructUrl(urlFileAction,path),'POST','application/json', file)
    }

    /**
     * receive a blob dorm the APi to save the file into the download repository
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    downloadFile(nameFile:string, path:string, log:User):void{
        /***** API Call *****/
        let dlFile = this._conn.connexionAPIFileManager(log.getToken(), log.constructUrl(urlFileAction,this._breadcrumbs + '/' + nameFile),'Get','application/octet-stream')
        /***** Download *****/
        console.log(dlFile);
        alert(nameFile + ' downloaded from ' + path)
        let blob = new Blob([`"name":"j-s"`],{type:"application/json"});
        FileSaver.saveAs(blob,nameFile);
    }

    /**
     * to delete a file in the repository S3
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    deleteFile(nameFile:string, path:string,log:User):void{
        /***** API Call *****/
        let dlFile = this._conn.connexionAPIFileManager(log.getToken(), log.constructUrl(urlFileAction,this._breadcrumbs + '/' + nameFile),'Delete','application/json')
        console.log(dlFile)
        alert(nameFile + ' deleted from ' + path)
    }

    /**
     * Download a folder with an API call and a zip file
     * @param {string} nameFolder take the name of the folder
     * @param {string} path take the path of the folder
     * @param {string} token put the token for the API
     * @memberof FileMana
     */
    downloadFolder(nameFolder:string,path:string,log:User){
         /***** API Call *****/
        //let dlFile = this._conn.connexionAPIFileDownloadDelete(log.getToken(), log.constructUrl('blah'),'Get')
        /***** Download *****/
        alert(nameFolder + ' downloaded from ' + path)
        let blob = new Blob([`"name":"j-s"`]/*,{type:"application/json"}*/);
        FileSaver.saveAs(blob,nameFolder+'.zip');
    }

    /**
     * Delete a folder in S/ with an API call
     * @param {string} nameFolder the name of the folder to delete
     * @param {string} path
     * @param {string} token
     * @memberof FileMana
     */
    deleteFolder(nameFolder:string,path:string,log:User){
        /***** API Call *****/
        //let dlFile = this._conn.connexionAPIFileDownloadDelete(log.getToken(), log.constructUrl('blah'),'Delete')
        alert(nameFolder + ' deleted from ' + path)
    }


    /**
     * Create a folder in S3 with an API call
     * @param {string} pathforfolder the path to add a folder
     * @param {string} token the token for the API
     * @param {string} foldername the new folder name
     * @memberof FileMana
     */
    createFolder(pathforfolder:string, log:User, foldername:string){
        /***** API Call *****/
        //let dlFile = this._conn.connexionAPIFileDownloadDelete(token, log.constructUrl('blah'),'Delete')
        alert("the new folder " + foldername + " will be created in " + pathforfolder)
    }

    uploadFolder(){

    }
}