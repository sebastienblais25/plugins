"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("../config/url");
var apiConnect_1 = require("../apiConnect");
var FileSaver = require('file-saver'); // le import
var FileMana = /** @class */ (function () {
    /**
     *Creates an instance of FileMana.
     * @param {string} [nextFolder='root']
     * @memberof FileMana
     */
    function FileMana(nextFolder) {
        if (nextFolder === void 0) { nextFolder = 'root'; }
        this._conn = new apiConnect_1.connexion();
        this._breadcrumbs = '';
        this._list = [];
        //this._breadcrumbs = 'root';
        this._nextFolder = nextFolder;
        this._breadcrumbs = '...';
    }
    /**
     * obtain the structure of a folder with a path send
     * @param {User} log for the token
     * @memberof FileMana
     */
    FileMana.prototype.obtainArbo = function (log) {
        this._nextFolder = '';
        this._value = this._conn.connexionAPIFileMAnager(log.getToken(), this.setNavigation());
    };
    /**
     * set the url for the navigation in the file manager
     * @returns {string} return the url needed
     * @memberof FileMana
     */
    FileMana.prototype.setNavigation = function () {
        return 'http://127.0.0.1:4010/' + url_1.urlListFile + this._breadcrumbs + '&__example=' + this._breadcrumbs;
    };
    /**
     * build a list of folder with the return of the API
     * @returns return a list of folder
     * @memberof FileMana
     */
    FileMana.prototype.buildFolderList = function () {
        var listFo = [];
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
     * set properties next folder
     * @param {string} next name of the next folder
     * @memberof FileMana
     */
    FileMana.prototype.setNextFolder = function (next) {
        this._nextFolder = next;
    };
    /**
     * set a formdata to the Api to upload a file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    FileMana.prototype.uploadfile = function (path, log, file) {
        alert(path + ' ' + log.getToken());
        console.log(file);
        this._conn.connexionAPIFileUplaod(log.getToken(), log.constructUrl(url_1.urlFileAction, path), file);
    };
    /**
     * receive a blob dorm the APi to save the file into the download repository
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    FileMana.prototype.downloadFile = function (nameFile, path, log) {
        /***** API Call *****/
        var dlFile = this._conn.connexionAPIFileDownloadDelete(log.getToken(), log.constructUrl(url_1.urlFileAction, this._breadcrumbs + '/' + nameFile), 'Get', 'application/octet-stream');
        /***** Download *****/
        console.log(dlFile);
        alert(nameFile + ' downloaded from ' + path);
        var blob = new Blob(["\"name\":\"j-s\""], { type: "application/json" });
        FileSaver.saveAs(blob, nameFile);
    };
    /**
     * to delete a file in the repository S3
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    FileMana.prototype.deleteFile = function (nameFile, path, log) {
        /***** API Call *****/
        var dlFile = this._conn.connexionAPIFileDownloadDelete(log.getToken(), log.constructUrl(url_1.urlFileAction, this._breadcrumbs + '/' + nameFile), 'Delete', 'application/json');
        console.log(dlFile);
        alert(nameFile + ' deleted from ' + path);
    };
    /**
     * Download a folder with an API call and a zip file
     * @param {string} nameFolder take the name of the folder
     * @param {string} path take the path of the folder
     * @param {string} token put the token for the API
     * @memberof FileMana
     */
    FileMana.prototype.downloadFolder = function (nameFolder, path, log) {
        /***** API Call *****/
        //let dlFile = this._conn.connexionAPIFileDownloadDelete(log.getToken(), log.constructUrl('blah'),'Get')
        /***** Download *****/
        alert(nameFolder + ' downloaded from ' + path);
        var blob = new Blob(["\"name\":\"j-s\""] /*,{type:"application/json"}*/);
        FileSaver.saveAs(blob, nameFolder + '.zip');
    };
    /**
     * Delete a folder in S/ with an API call
     * @param {string} nameFolder the name of the folder to delete
     * @param {string} path
     * @param {string} token
     * @memberof FileMana
     */
    FileMana.prototype.deleteFolder = function (nameFolder, path, log) {
        /***** API Call *****/
        //let dlFile = this._conn.connexionAPIFileDownloadDelete(log.getToken(), log.constructUrl('blah'),'Delete')
        alert(nameFolder + ' deleted from ' + path);
    };
    /**
     * Create a folder in S3 with an API call
     * @param {string} pathforfolder the path to add a folder
     * @param {string} token the token for the API
     * @param {string} foldername the new folder name
     * @memberof FileMana
     */
    FileMana.prototype.createFolder = function (pathforfolder, log, foldername) {
        /***** API Call *****/
        //let dlFile = this._conn.connexionAPIFileDownloadDelete(token, log.constructUrl('blah'),'Delete')
        alert("the new folder " + foldername + " will be created in " + pathforfolder);
    };
    FileMana.prototype.uploadFolder = function () {
    };
    return FileMana;
}());
exports.FileMana = FileMana;
