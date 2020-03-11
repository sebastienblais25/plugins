
import { User } from '../user';
import { urlListFile } from '../config/url';
import { connexion } from '../apiConnect';



export class FileMana{

    _conn:connexion = new connexion();
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
        this._value = this._conn.connexionAPIFileMAnager(log.gettoken(),this.setNavigation());  
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
            <div class="breadclass">`+ this.buildClickablebreadcrumbs() +`</div>
            <div class="headerFile">
                <span class="nameFileFolderHeader">Name</span> 
                <span class="modifiedFileFolderHeader">Date modified</span>
                <span class="sizeFileFolderHeader">Size</span>
            </div>
            <div id="div1" ondragenter="onDragEnter(event);"
            ondragover="onDragOver(event);"
            ondragleave="onDragLeave(event);"
            ondrop="onDrop(event);">
            <form>
                <md-list-item ng-click="ctrl11.openFolder(folder)" class="folderBtn" ng-repeat="folder in ctrl11.folders">
                    <div class="groupingInfo">
                        <md-icon>
                            <i class="material-icons">
                                folder
                            </i>
                        </md-icon>
                        <span class="nameFileFolder">{{ folder.name }}</span>
                        <span class="modifiedFileFolder">{{ folder.modified }}</span>
                    </div>
                </md-list-item>
                
                <md-list-item class="fileBtn" ng-repeat="file in ctrl11.files">
                    <div class="groupingInfo">
                        <md-icon>
                            <i class="material-icons">
                                insert_drive_file
                            </i>
                        </md-icon>
                        <span class="nameFileFolder lilPad">{{ file.name }}</span> 
                        <span class="modifiedFileFolder lilPad">{{ file.modified }}</span>
                        <span class="sizeFileFolder lilPad">{{ file.size }} KB</span>
                        <div class="downloadbtn" ng-click="ctrl11.deleteFile(file)"><i class="material-icons">delete</i></div>
                        <div class="downloadbtn" ng-click="ctrl11.downloadFile(file)"><i class="material-icons">vertical_align_bottom</i></div>
                    </div>       
                </md-list-item>
                <div class="hiddenupload">
                    <input class="hiddenupload" type="file"
                        id="fileInput">
                    <md-button id="uploading" ng-click="ctrl11.uploadFile();" class="hiddenupload">Upload</md-button>
                </div>
            </form>
            </div>
            <div class="drop-window">
                <div class="drop-window-content">
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
        for(let i in this._list){
            bc += `/<span ng-click="ctrl11.followup('`+ i +`')"><a href="#">`+this._list[i]+`</a></span>`;
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
     * @memberof FileMana
     */
    uploadfile():void{

    }

    /**
     * receive a blob dorm the APi to save the file into the download repository
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @memberof FileMana
     */
    downloadFile(nameFile:string, path:string):void{

    }

    /**
     * to delete a file in the repository S3
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @memberof FileMana
     */
    deleteFile(nameFile:string, path:string):void{

    }
}