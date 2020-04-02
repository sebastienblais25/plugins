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
        var outputValue;
        /********* API CALL **********/
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urltogo,
                headers: {
                    'Authorization': "Bearer " + token,
                    'contentType': content
                },
                type: operation,
                async: false,
                dataType: 'json',
                data: file,
                processData: false,
                success: //data => resolve()
                function (response, jqXHR) {
                    outputValue = response;
                },
                error: function (xhr) {
                    outputValue = xhr;
                }
            });
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        return outputValue;
    };
    return Connexion;
}());
exports.Connexion = Connexion;
