import { Connexion } from '../fileManager/apiConnect';
const FileSaver = require('file-saver'); // le import



export class FileMana {
    // Properties
    private _conn: Connexion = new Connexion();
    private _breadcrumbs: string = '';
    private _lastFolder: string;
    private _liveFolder: string;
    private _nextFolder: string;
    private _value: any;
    private _list = [];
    // URL
    private _urlServer: string;
    private _folderFileList: string;
    private _folderAction: string;
    private _fileAction: string;
    
    /**
     *Creates an instance of FileMana.
     * @param {string} [nextFolder='root']
     * @memberof FileMana
     */
    constructor(nextFolder: string = 'root') {
        this._nextFolder = nextFolder
        this._breadcrumbs= '...';
    }
    /**
     * obtain the structure of a folder with a path send
     * @param {User} log for the token
     * @memberof FileMana
     */
    obtainArbo(token: string): any {
        this._nextFolder = '';
        return this._conn.connexionAPIFileManager(token,this.setNavigation(this.getFolderFileList()),'Get','application/json');  
    }
    /**
     * set the url for the navigation in the file manager
     * @returns {string} return the url needed
     * @memberof FileMana
     */
    setNavigation(urlgoto: string,adding: string = ''): string {
        return this.getUrlServer() + urlgoto + this._breadcrumbs + adding + '&__example=' + this._breadcrumbs + adding;
    }
    /**
     * build a list of folder with the return of the API
     * @returns return a list of folder
     * @memberof FileMana
     */
    buildFolderList() {
        let listFo = [];
        // Build the list of folder for the user UI
        for (let i in this._value.list_folder) {
            listFo.push( { name: this._value.list_folder[i].name, modified: this._value.list_folder[i].last_modified, wanted: false } );
        }
        return listFo;
    }
    /**
     * build a list of file with the return of the API
     * @returns return a list of file
     * @memberof FileMana
     */
    buildFileList() {
        let listFi = [];
        // Build the list of folder for the user UI
        for (let i in this._value.list_file) {
            listFi.push( { name: this._value.list_file[i].name , size:this._value.list_file[i].size, modified:this._value.list_file[i].last_modified, wanted: false } );
        }
        return listFi;
    }
    /**
     * Build the template for the file manager
     * @returns {string} return a template
     * @memberof FileMana
     */
    buildUI(): string {
        let output:string = `
        <div ng-controller="fileManagerPanelCtrl as ctrl11">
            <div class="Geosys-topcover"></div>
            <div class="Geosys-sticky-Header">
                <div class="Geosys-backing" ng-click="ctrl11.precedent()"><i class="material-icons">arrow_back</i></div>
                <div class="Geosys-backing" ng-click="ctrl11.refresh()"><i class="material-icons">refresh</i></div>
                <div class="Geosys-backing" ng-click="ctrl11.createFolder()"><i class="material-icons">create_new_folder</i></div>
                <div class="Geosys-breadclass">${this.buildClickablebreadcrumbs()}</div>
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
    buildClickablebreadcrumbs() {
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
    setbreacrumbsForNav(rank: string) {
        
        this._breadcrumbs = '';
        for(let i in this._list){
            if(i < rank){
                this._breadcrumbs += this._list[i] + '/';
            }else if(i === rank){
                this._breadcrumbs += this._list[i];
            }else{
                break;
            }
        }
    }
    /**
     * set a formdata to the Api to upload a file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    uploadfile(path:string, token: string,file:File):void{
        this._conn.connexionAPIFileManager(token,this.setNavigation(this.getFileAction()),'POST','application/json', file).then( values =>{
            if (values[0].message !== undefined) {
                console.log('File uploaded');
            } else {
                alert(values[0]);
            }
        })
    }

    /**
     * receive a blob dorm the APi to save the file into the download repository
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    downloadFile(nameFile:string, path:string, token: string):void{
        /***** API Call *****/
        let dlFile = this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFileAction(), nameFile),'Get','application/octet-stream').then( values =>{
            /***** Download *****/
            console.log(dlFile);
            alert(nameFile + ' downloaded from ' + path)
            let blob = new Blob([values[0]]);
            FileSaver.saveAs(blob,nameFile);
        })
        
    }
    /**
     * to delete a file in the repository S3
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    deleteFile(nameFile:string, path:string,token: string):void{
        /***** API Call *****/
        let dlFile = this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFileAction(), nameFile),'Delete','application/json').then( values =>{
            console.log(dlFile);
            alert(nameFile + ' deleted from ' + path);
        })
        
    }
    /**
     * Download a folder with an API call and a zip file
     * @param {string} nameFolder take the name of the folder
     * @param {string} path take the path of the folder
     * @param {string} token put the token for the API
     * @memberof FileMana
     */
    downloadFolder(nameFolder:string,path:string,token: string){
         /***** API Call *****/
         this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFolderAction(), nameFolder),'POST','application/octet-stream').then( values =>{
             /***** Download *****/
            console.log(nameFolder + ' downloaded from ' + path);
            let blob = new Blob([values[0]]/*,{type:"application/json"}*/);
            FileSaver.saveAs(blob,nameFolder+'.zip');
         });
    }

    /**
     * Delete a folder in S/ with an API call
     * @param {string} nameFolder the name of the folder to delete
     * @param {string} path
     * @param {string} token
     * @memberof FileMana
     */
    deleteFolder(nameFolder:string,path:string,token: string){
        /***** API Call *****/
        this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFolderAction(), nameFolder),'POST','application/json').then( values =>{
            // Check if the operation is completed
            if (values[0].message !== undefined) {
                console.log(nameFolder + ' deleted from ' + path);
            } else {
                alert(values[0]);
            }
        });
    }
    /**
     * Create a folder in S3 with an API call
     * @param {string} pathforfolder the path to add a folder
     * @param {string} token the token for the API
     * @param {string} foldername the new folder name
     * @memberof FileMana
     */
    createFolder(pathforfolder:string, token: string, foldername:string){
        /***** API Call *****/
        this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFolderAction(),foldername),'POST','application/json').then( values =>{
            // Check if the operation is completed
            if (values[0].message !== undefined) {
                console.log("the new folder " + foldername + " will be created in " + pathforfolder);
            } else {
                alert(values[0]);
            }
        });
        
    }
    /**
     * Set all the url from the config or the parameter of the function
     * @param {*} config Url in the config
     * @param {string} [urlServer=''] Url 
     * @param {string} [folderFile=''] Url
     * @param {string} [folder=''] Url
     * @param {string} [file=''] Url
     * @memberof FileMana
     */
    setUrl(config: any, urlServer: string = '', folderFile: string = '', folder: string = '', file: string = '') {
        // Set the url for the server
        if (urlServer !== '') {
            this._urlServer = urlServer;
        } else {
            this._urlServer = config.Server;
        }
        // Set the url for the navigation
        if (folderFile !== '') {
            this._folderFileList = folderFile;
        } else {
            this._folderFileList = config.FolderFileList;
        }
        // Set the url for the folder operation
        if (folder !== '') {
            this._folderAction = folder;
        } else {
            this._folderAction = config.FolderAction;
        }
        // Set the url for the file operation
        if (file !== '') {
            this._fileAction = file;
        } else {
            this._fileAction = config.FileAction;
        }
    }
    /**
     * TO DO : Maybe Added feature in the future
     * @memberof FileMana
     */
    uploadFolder(){

    }
    /******* Accessor *******/
    // Conn
    getConn(): Connexion {
        return this._conn;
    }
    setConn(value: Connexion) {
        this._conn = value;
    }
    // Breadcrumbs
    getBreadcrumbs(): string {
        return this._breadcrumbs;
    }
    setBreadcrumbs(value: string) {
        this._breadcrumbs = value;
    }
    // Last Folder
    getLastFolder(): string {
        return this._lastFolder;
    }
    setLastFolder(value: string) {
        this._lastFolder = value;
    }
    // Live Folder
    getLiveFolder(): string {
        return this._liveFolder;
    }
    setLiveFolder(value: string) {
        this._liveFolder = value;
    }
    // Next Folder
    getNextFolder(): string {
        return this._nextFolder;
    }
    setNextFolder(next:string):void{
        this._nextFolder = next ;
    }
    // Value
    getValue(): any {
        return this._value;
    }
    setValue(value: any) {
        this._value = value;
    }
    // List
    getList() {
        return this._list;
    }
    setList(value) {
        this._list = value;
    }
    getUrlServer(): string {
        return this._urlServer;
    }
    getFolderFileList(): string {
        return this._folderFileList;
    }
    getFolderAction(): string {
        return this._folderAction;
    }
    getFileAction(): string {
        return this._fileAction;
    }
    
}