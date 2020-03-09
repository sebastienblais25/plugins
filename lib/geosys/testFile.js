"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("./config/url");
var TestFile = /** @class */ (function () {
    function TestFile(nextFolder) {
        if (nextFolder === void 0) { nextFolder = 'root'; }
        this._breadcrumbs = '';
        this._list = [];
        //this._breadcrumbs = 'root';
        this._nextFolder = nextFolder;
        this._breadcrumbs = '...';
    }
    TestFile.prototype.obtainArbo = function (log) {
        var _this = this;
        var outputValue;
        /********* API CALL **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: _this.setNavigation(),
                headers: {
                    'Authorization': "Bearer " + log.gettoken(),
                    'contentType': 'application/json'
                },
                type: 'Get',
                async: false,
                //cache:false,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                processData: false,
                success: //data => resolve()
                function (response, jqXHR) {
                    //console.log(response)
                    outputValue = response;
                },
                error: function (xhr) {
                    alert(xhr.statusText);
                    outputValue = xhr;
                }
            });
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        //alert(outputValue + ' 123')
        this._nextFolder = '';
        this._value = outputValue;
    };
    TestFile.prototype.setNavigation = function () {
        return 'http://127.0.0.1:4010/' + url_1.urlListFile + this._breadcrumbs + '&__example=' + this._breadcrumbs;
    };
    TestFile.prototype.buildFolderList = function () {
        var listFo = [];
        for (var i in this._value.list_folder) {
            listFo.push({ name: this._value.list_folder[i].name, modified: this._value.list_folder[i].last_modified, wanted: false });
        }
        return listFo;
    };
    TestFile.prototype.buildFileList = function () {
        var listFi = [];
        for (var i in this._value.list_file) {
            listFi.push({ name: this._value.list_file[i].name, size: this._value.list_file[i].size, modified: this._value.list_file[i].last_modified, wanted: false });
        }
        return listFi;
    };
    TestFile.prototype.buildUI = function () {
        /*if(this._nextFolder != 'root'){
            this._liveFolder = this._nextFolder;
            this._breadcrumbs += '/'+ this._liveFolder
        }*/
        var output = "\n        <div ng-controller=\"fileManagerPanelCtrl as ctrl11\">\n            <div class=\"breadclass\">" + this.buildClickablebreadcrumbs() + "</div>\n            <div class=\"headerFile\">\n                <span class=\"nameFileFolderHeader\">Name</span> \n                <span class=\"modifiedFileFolderHeader\">Date modified</span>\n                <span class=\"sizeFileFolderHeader\">Size</span>\n            </div>\n            <div id=\"div1\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\">\n                <md-list-item ng-click=\"ctrl11.openFolder(folder)\" class=\"folderBtn\" ng-repeat=\"folder in ctrl11.folders\">\n                    <div class=\"groupingInfo\">\n                        <md-icon>\n                            <i class=\"material-icons\">\n                                folder\n                            </i>\n                        </md-icon>\n                        <span class=\"nameFileFolder\">{{ folder.name }}</span>\n                        <span class=\"modifiedFileFolder\">{{ folder.modified }}</span>\n                    </div>\n                </md-list-item>\n                \n                <md-list-item class=\"fileBtn\" ng-repeat=\"file in ctrl11.files\">\n                    <div class=\"groupingInfo\">\n                        <md-icon>\n                            <i class=\"material-icons\">\n                                insert_drive_file\n                            </i>\n                        </md-icon>\n                        <span class=\"nameFileFolder lilPad\">{{ file.name }}</span> \n                        <span class=\"modifiedFileFolder lilPad\">{{ file.modified }}</span>\n                        <span class=\"sizeFileFolder lilPad\">{{ file.size }} KB</span>\n                        <div class=\"downloadbtn\" ng-click=\"ctrl11.deleteFile(file)\"><i class=\"material-icons\">delete</i></div>\n                        <div class=\"downloadbtn\" ng-click=\"ctrl11.downloadFile(file)\"><i class=\"material-icons\">vertical_align_bottom</i></div>\n                    </div>       \n                </md-list-item>\n                <div class=\"form-group\">\n                    <label for=\"file\">Choose File</label>\n                    <input type=\"file\"\n                        id=\"file\">\n                </div>\n            </div>\n        </div>\n        ";
        return output;
    };
    TestFile.prototype.buildClickablebreadcrumbs = function () {
        this._list = this._breadcrumbs.split('/');
        var bc = '';
        for (var i in this._list) {
            bc += "/<span ng-click=\"ctrl11.followup('" + i + "')\"><a href=\"#\">" + this._list[i] + "</a></span>";
        }
        return bc;
    };
    TestFile.prototype.setbreacrumbsForNav = function (rank) {
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
    TestFile.prototype.setNextFolder = function (next) {
        this._nextFolder = next;
    };
    return TestFile;
}());
exports.TestFile = TestFile;
