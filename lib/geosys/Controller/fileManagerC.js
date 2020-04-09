"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileManagerC_1 = require("../../fileManager/fileManagerC");
var fileMana_1 = require("../../fileManager/fileMana");
var url_1 = require("../config/url");
var FileController = /** @class */ (function () {
    function FileController() {
    }
    /**
     * Create the first panel for the with the root
     * @param {User} log for the token and other useful tools
     * @param {*} mapApi The object of the API
     * @param {FileMana} tfm the object File Manager to keep where you are in a repository
     * @memberof FileManagerController
     */
    FileController.prototype.fileManagercontrols = function (log, mapApi) {
        mapApi.agControllerRegister('FileManagerCtrl', function () {
            var panel;
            var tfm = new fileMana_1.FileMana();
            tfm.setUrl('hello', 'http://127.0.0.1:4010/', url_1.urlListFile, url_1.urlFolderAction, url_1.urlFileAction);
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.OpenFileManager = function () {
                // Check if an environnment is selected
                if (log.getEnvironnementSel() !== '') {
                    if (!panel) {
                        // make sure both header and body have a digest cycle run on them
                        panel = mapApi.panels.create('FileManager');
                        //Size of the panel
                        panel.element.css({ top: '0px;', margin: '100px 50px 100px 450px' });
                        //button in the header of the panel
                        panel.header.toggleButton;
                        panel.header.closeButton;
                    }
                    else {
                        panel.close();
                    }
                    // Create the interface for the file manager
                    var mainFile = new fileManagerC_1.FileManagerController();
                    mainFile.fileManagercontrols(log.getToken(), mapApi, tfm, panel);
                }
            };
        });
    };
    ;
    return FileController;
}());
exports.FileController = FileController;
