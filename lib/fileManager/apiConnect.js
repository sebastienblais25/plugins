"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Connexion = /** @class */ (function () {
    function Connexion() {
    }
    /**
     * Get the structure of a repository from S3
     * @param {string} token token of the user
     * @param {string} urltogo the url for the API
     * @returns {*} the list of folder and file
     * @memberof Connexion
     */
    Connexion.prototype.connexionAPIFileManager = function (token, urltogo, operation, content, file) {
        if (file === void 0) { file = ''; }
        /********* API CALL **********/
        return new Promise(function (resolve) {
            $.ajax({
                // URL of the API
                url: urltogo,
                // The header with token and contentYpe
                headers: {
                    'Authorization': "Bearer " + token,
                    'contentType': content
                },
                // Type of the operation GET,POST ,PUT or DELETE
                type: operation,
                // The typ of the data
                //dataType: 'json',
                data: file,
                processData: false,
                // Send the data in the promise
                success: function (data) { return resolve(data); }
            });
        });
    };
    Connexion.prototype.connexionAPIFileManagerTestDownload = function (token, urltogo, operation, content, file) {
        if (file === void 0) { file = ''; }
        /********* API CALL **********/
        return new Promise(function (resolve) {
            $.ajax({
                // URL of the API
                url: urltogo,
                xhrFields: {
                    responseType: 'blob'
                },
                // The header with token and contentYpe
                headers: {
                    'Authorization': "Bearer " + token,
                    'contentType': content
                },
                // Type of the operation GET,POST ,PUT or DELETE
                type: operation,
                // The typ of the data
                //dataType: 'json',
                data: file,
                processData: false,
                // Send the data in the promise
                success: function (data) { return resolve(data); }
            });
        });
    };
    return Connexion;
}());
exports.Connexion = Connexion;
