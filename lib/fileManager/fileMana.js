"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiConnect_1 = require("../fileManager/apiConnect");
var FileSaver = require('file-saver'); // le import
var FileMana = /** @class */ (function () {
    /**
     *Creates an instance of FileMana.
     * @param {string} [nextFolder='root']
     * @memberof FileMana
     */
    function FileMana(nextFolder) {
        if (nextFolder === void 0) { nextFolder = 'root'; }
        // Properties
        this._conn = new apiConnect_1.Connexion();
        this._breadcrumbs = '';
        this._list = [];
        this._nextFolder = nextFolder;
        this._breadcrumbs = '...';
    }
    /**
     * obtain the structure of a folder with a path send
     * @param {User} log for the token
     * @memberof FileMana
     */
    FileMana.prototype.obtainArbo = function (token) {
        this._nextFolder = '';
        return this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFolderFileList()), 'Get', 'application/json');
    };
    /**
     * set the url for the navigation in the file manager
     * @returns {string} return the url needed
     * @memberof FileMana
     */
    FileMana.prototype.setNavigation = function (urlgoto, adding) {
        if (adding === void 0) { adding = ''; }
        return this.getUrlServer() + urlgoto + this._breadcrumbs + adding + '/' + '&__example=' + this._breadcrumbs + adding + '/';
    };
    /**
     * build a list of folder with the return of the API
     * @returns return a list of folder
     * @memberof FileMana
     */
    FileMana.prototype.buildFolderList = function () {
        var listFo = [];
        // Build the list of folder for the user UI
        for (var i in this._value.list_folder) {
            listFo.push({ name: this._value.list_folder[i].name, modified: this._value.list_folder[i].last_modified, wanted: false });
        }
        return listFo;
    };
    /**
     * build a list of file with the return of the API
     * @returns return a list of file
     * @memberof FileMana
     */
    FileMana.prototype.buildFileList = function () {
        var listFi = [];
        // Build the list of folder for the user UI
        for (var i in this._value.list_file) {
            listFi.push({ name: this._value.list_file[i].name, size: this._value.list_file[i].size, modified: this._value.list_file[i].last_modified, wanted: false });
        }
        return listFi;
    };
    /**
     * Build the template for the file manager
     * @returns {string} return a template
     * @memberof FileMana
     */
    FileMana.prototype.buildUI = function () {
        var output = "\n        <div ng-controller=\"fileManagerPanelCtrl as ctrl11\">\n            <div class=\"Geosys-topcover\"></div>\n            <div class=\"Geosys-sticky-Header\">\n                <div class=\"Geosys-backing\" ng-click=\"ctrl11.precedent()\"><i class=\"material-icons\">arrow_back</i></div>\n                <div class=\"Geosys-backing\" ng-click=\"ctrl11.refresh()\"><i class=\"material-icons\">refresh</i></div>\n                <div class=\"Geosys-backing\" ng-click=\"ctrl11.createFolder()\"><i class=\"material-icons\">create_new_folder</i></div>\n                <div class=\"Geosys-breadclass\">" + this.buildClickablebreadcrumbs() + "</div>\n                <div class=\"Geosys-header-File\">\n                    <span class=\"Geosys-name-File-Folder-Header\">Name</span> \n                    <span class=\"Geosys-modified-File-Folder-Header\">Date modified</span>\n                    <span class=\"Geosys-size-File-Folder-Header\">Size</span>\n                </div>\n            </div>\n            <div id=\"div1\" ondragenter=\"onDragEnter(event);\"\n            ondragover=\"onDragOver(event);\"\n            ondragleave=\"onDragLeave(event);\"\n            ondrop=\"onDrop(event);\">\n            <form>\n                <md-list-item class=\"Geosys-folderBtn\" ng-repeat=\"folder in ctrl11.folders\">\n                    <div class=\"Geosys-groupingInfo\">\n                        <div ng-click=\"ctrl11.openFolder(folder)\" style=\"width: 90%;margin: 0;float: left;\">\n                            <md-icon>\n                                <i class=\"material-icons\">\n                                    folder\n                                </i>\n                            </md-icon>\n                            \n                            <span class=\"Geosys-name-File-Folder Geosys-lilPad\">{{ folder.name }}</span>\n                            <span class=\"Geosys-modified-File-Folder Geosys-lilPad\">{{ folder.modified }}</span>\n                        </div>\n                        <div class=\"Geosys-downloadbtn\" ng-click=\"ctrl11.deleteFolder(folder)\"><i class=\"material-icons\">delete</i></div>\n                        <div class=\"Geosys-downloadbtn\" ng-click=\"ctrl11.downloadFolder(folder)\"><i style=\"padding-top: 2px;\" class=\"material-icons\">get_app</i></div>\n                    </div>\n                </md-list-item>\n                \n                <md-list-item class=\"Geosys-fileBtn\" ng-repeat=\"file in ctrl11.files\">\n                    <div class=\"Geosys-groupingInfo\">\n                        <md-icon>\n                            <i class=\"material-icons\">\n                                insert_drive_file\n                            </i>\n                        </md-icon>\n                        <span class=\"Geosys-name-File-Folder Geosys-lilPad\">{{ file.name }}</span> \n                        <span class=\"Geosys-modified-File-Folder Geosys-lilPad\">{{ file.modified }}</span>\n                        <span class=\"Geosys-size-File-Folder Geosys-lilPad\">{{ file.size }} KB</span>\n                        <div class=\"Geosys-downloadbtn\" ng-click=\"ctrl11.deleteFile(file)\"><i class=\"material-icons\">delete</i></div>\n                        <div class=\"Geosys-downloadbtn\" ng-click=\"ctrl11.downloadFile(file)\"><i style=\"padding-top: 2px;\" class=\"material-icons\">get_app</i></div>\n                    </div>       \n                </md-list-item>\n                <div class=\"Geosys-hidden-upload\">\n                    <input class=\"Geosys-hidden-upload\" type=\"file\"\n                        id=\"fileInput\">\n                    <md-button id=\"uploading\" ng-click=\"ctrl11.uploadFile();\" class=\"Geosys-hidden-upload\">Upload</md-button>\n                </div>\n            </form>\n            </div>\n            <div class=\"Geosys-drop-window\">\n                <div class=\"Geosys-drop-window-content\">\n                    <h3>Drop files to upload</h3>\n                </div>\n            </div>\n        </div>\n        ";
        return output;
    };
    /**
     * build a clickable breacrumbs for the navigations
     * @returns return a string for the templates
     * @memberof FileMana
     */
    FileMana.prototype.buildClickablebreadcrumbs = function () {
        this._list = this._breadcrumbs.split('/');
        var bc = '';
        var lenght = this._list.length - 1;
        for (var i in this._list) {
            if (i === lenght.toString()) {
                bc += "&nbsp;/<span class=\"Geosys-breadClick\">" + this._list[i] + "</span>";
            }
            else {
                bc += "&nbsp/<span class=\"Geosys-breadClick\" ng-click=\"ctrl11.followup('" + i + "')\">" + this._list[i] + "</span>";
            }
        }
        return bc;
    };
    /**
     * set the path needed to get into the good folder
     * @param {string} rank wich folder we want to go in
     * @memberof FileMana
     */
    FileMana.prototype.setbreacrumbsForNav = function (rank) {
        this._breadcrumbs = '';
        for (var i in this._list) {
            if (i < rank) {
                this._breadcrumbs += this._list[i] + '/';
            }
            else if (i === rank) {
                this._breadcrumbs += this._list[i];
            }
            else {
                break;
            }
        }
    };
    /**
     * set a formdata to the Api to upload a file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    FileMana.prototype.uploadfile = function (path, token, file) {
        var form = new FormData();
        form.append('fichier', file);
        this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFileAction()), 'POST', 'application/json', form).then(function (values) {
            if (values[0].message !== undefined) {
                console.log('File uploaded');
            }
            else {
                alert(values[0]);
            }
        });
    };
    /**
     * receive a blob dorm the APi to save the file into the download repository
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    FileMana.prototype.downloadFile = function (nameFile, path, token) {
        /***** API Call *****/
        this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFileAction(), nameFile), 'Get', 'application/octet-stream').then(function (values) {
            /***** Download *****/
            console.log(values);
            alert(nameFile + ' downloaded from ' + path);
            var blob = new Blob([values]);
            FileSaver.saveAs(blob, nameFile);
        });
    };
    /**
     * to delete a file in the repository S3
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    FileMana.prototype.deleteFile = function (nameFile, path, token) {
        /***** API Call *****/
        var dlFile = this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFileAction(), nameFile), 'Delete', 'application/json').then(function (values) {
            console.log(dlFile);
            alert(nameFile + ' deleted from ' + path);
        });
    };
    /**
     * Download a folder with an API call and a zip file
     * @param {string} nameFolder take the name of the folder
     * @param {string} path take the path of the folder
     * @param {string} token put the token for the API
     * @memberof FileMana
     */
    FileMana.prototype.downloadFolder = function (nameFolder, path, token) {
        /***** API Call *****/
        this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFolderAction(), nameFolder), 'POST', 'application/octet-stream').then(function (values) {
            /***** Download *****/
            console.log(nameFolder + ' downloaded from ' + path);
            var blob = new Blob([values[0]] /*,{type:"application/json"}*/);
            FileSaver.saveAs(blob, nameFolder + '.zip');
        });
    };
    /**
     * Delete a folder in S/ with an API call
     * @param {string} nameFolder the name of the folder to delete
     * @param {string} path
     * @param {string} token
     * @memberof FileMana
     */
    FileMana.prototype.deleteFolder = function (nameFolder, path, token) {
        /***** API Call *****/
        this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFolderAction(), nameFolder), 'POST', 'application/json').then(function (values) {
            // Check if the operation is completed
            if (values[0].message !== undefined) {
                console.log(nameFolder + ' deleted from ' + path);
            }
            else {
                alert(values[0]);
            }
        });
    };
    /**
     * Create a folder in S3 with an API call
     * @param {string} pathforfolder the path to add a folder
     * @param {string} token the token for the API
     * @param {string} foldername the new folder name
     * @memberof FileMana
     */
    FileMana.prototype.createFolder = function (pathforfolder, token, foldername) {
        /***** API Call *****/
        this._conn.connexionAPIFileManager(token, this.setNavigation(this.getFolderAction(), foldername), 'POST', 'application/json').then(function (values) {
            // Check if the operation is completed
            if (values[0].message !== undefined) {
                console.log("the new folder " + foldername + " will be created in " + pathforfolder);
            }
            else {
                alert(values[0]);
            }
        });
    };
    /**
     * Set all the url from the config or the parameter of the function
     * @param {*} config Url in the config
     * @param {string} [urlServer=''] Url
     * @param {string} [folderFile=''] Url
     * @param {string} [folder=''] Url
     * @param {string} [file=''] Url
     * @memberof FileMana
     */
    FileMana.prototype.setUrl = function (config, urlServer, folderFile, folder, file) {
        if (urlServer === void 0) { urlServer = ''; }
        if (folderFile === void 0) { folderFile = ''; }
        if (folder === void 0) { folder = ''; }
        if (file === void 0) { file = ''; }
        // Set the url for the server
        if (urlServer !== '') {
            this._urlServer = urlServer;
        }
        else {
            this._urlServer = config.Server;
        }
        // Set the url for the navigation
        if (folderFile !== '') {
            this._folderFileList = folderFile;
        }
        else {
            this._folderFileList = config.FolderFileList;
        }
        // Set the url for the folder operation
        if (folder !== '') {
            this._folderAction = folder;
        }
        else {
            this._folderAction = config.FolderAction;
        }
        // Set the url for the file operation
        if (file !== '') {
            this._fileAction = file;
        }
        else {
            this._fileAction = config.FileAction;
        }
    };
    /**
     * TO DO : Maybe Added feature in the future
     * @memberof FileMana
     */
    FileMana.prototype.uploadFolder = function () {
    };
    /******* Accessor *******/
    // Conn
    FileMana.prototype.getConn = function () {
        return this._conn;
    };
    FileMana.prototype.setConn = function (value) {
        this._conn = value;
    };
    // Breadcrumbs
    FileMana.prototype.getBreadcrumbs = function () {
        return this._breadcrumbs;
    };
    FileMana.prototype.setBreadcrumbs = function (value) {
        this._breadcrumbs = value;
    };
    // Last Folder
    FileMana.prototype.getLastFolder = function () {
        return this._lastFolder;
    };
    FileMana.prototype.setLastFolder = function (value) {
        this._lastFolder = value;
    };
    // Live Folder
    FileMana.prototype.getLiveFolder = function () {
        return this._liveFolder;
    };
    FileMana.prototype.setLiveFolder = function (value) {
        this._liveFolder = value;
    };
    // Next Folder
    FileMana.prototype.getNextFolder = function () {
        return this._nextFolder;
    };
    FileMana.prototype.setNextFolder = function (next) {
        this._nextFolder = next;
    };
    // Value
    FileMana.prototype.getValue = function () {
        return this._value;
    };
    FileMana.prototype.setValue = function (value) {
        this._value = value;
    };
    // List
    FileMana.prototype.getList = function () {
        return this._list;
    };
    FileMana.prototype.setList = function (value) {
        this._list = value;
    };
    FileMana.prototype.getUrlServer = function () {
        return this._urlServer;
    };
    FileMana.prototype.getFolderFileList = function () {
        return this._folderFileList;
    };
    FileMana.prototype.getFolderAction = function () {
        return this._folderAction;
    };
    FileMana.prototype.getFileAction = function () {
        return this._fileAction;
    };
    return FileMana;
}());
exports.FileMana = FileMana;
