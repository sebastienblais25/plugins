"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connexion = /** @class */ (function () {
    function connexion() {
    }
    //Send json form to API in ajax
    connexion.prototype.submitForm = function (token, json, urlgoto) {
        var outputValue;
        console.log("hello");
        /********* API CALL **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urlgoto,
                headers: {
                    'Authorization': "Bearer " + token,
                },
                type: 'GET',
                async: false,
                cache: false,
                data: json,
                dataType: 'json',
                success: function (data) { return resolve(); }
                /*function(response){
                    outputValue = response;
                    console.log(outputValue.value);
                    
                }*/
            })
                .done(function (data) {
                console.log('success', data);
                outputValue = data;
            })
                .fail(function (xhr) {
                console.log('error', xhr);
            });
        }));
        Promise.all(promises).then(function (values) {
            console.log(values[1]);
        });
        console.log();
        return outputValue;
    };
    ;
    return connexion;
}());
exports.connexion = connexion;
