"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connexion = /** @class */ (function () {
    function connexion() {
    }
    //Send json form to API in ajax
    connexion.prototype.connexionAPI = function (token, json, urlgoto) {
        var outputValue;
        console.log("hello");
        /********* API CALL **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urlgoto,
                headers: {
                    'Authorization': "Bearer " + token
                },
                type: 'GET',
                async: false,
                //cache:false,
                data: json,
                dataType: 'json',
                success: //data => resolve()
                function (response) {
                    outputValue = response;
                    console.log(outputValue.value);
                }
            });
            /*.done(function(data){
                console.log('success', data)
                outputValue = data;
            })
            .fail(function(xhr){
                console.log('error',xhr)
            });*/
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        return outputValue;
    };
    ;
    /* Note: connexionAPILogin pourrait etre fusionner juste ajuster le header selon l'utilisation */
    connexion.prototype.connexionAPILogin = function (urlgoto, header) {
        var outputValue;
        console.log("hello");
        /********* API CALL Login **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urlgoto,
                headers: {
                    header: header
                },
                type: 'GET',
                async: false,
                //cache:false,
                //data:json,
                dataType: 'json',
                success: //data => resolve()
                function (response) {
                    outputValue = response;
                    console.log(outputValue);
                }
            });
            /*.done(function(data){
                console.log('success', data)
                outputValue = data;
            })
            .fail(function(xhr){
                console.log('error',xhr)
            });*/
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        //alert(outputValue)
        return outputValue;
    };
    ;
    return connexion;
}());
exports.connexion = connexion;
