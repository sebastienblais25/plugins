"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Url for Extract sans retour(/geodata) Get
exports.urlgeoDataGet = "http://127.0.0.1:4010/geodata?__dynamic=true";
//Url for planned extract(/geodata/{identifiant}) Get
exports.urlgeoDatGetId = "http://127.0.0.1:4010/geodata/";
//url for the login(/securite/login) Get
exports.urlLoginGet = "http://127.0.0.1:4010/securite/login";
//url for the id working unit(/suivi-prod/unite-travail/id/theme/actif/{theme}) Get
exports.urlgetidWu = "http://127.0.0.1:4010/suivi-prod/unite-travail/id/theme/actif/";
//Send planning to the API(/suivi-prod/planification) Post
exports.urlPlaniPost = "http://127.0.0.1:4010/suivi-prod/planification?__dynamic=true";
//url getting environnement(/systeme/envs) Get
exports.urlEnvList = "http://127.0.0.1:4010/systeme/envs";
//url getting list of classes(/systeme/ressources) Get
exports.urlClassesList = "http://127.0.0.1:4010/systeme/ressources";
//url getting the list of working type for theme(/suivi-prod/type-travail/theme/{theme}) Get
exports.urlWorkingType = "http://127.0.0.1:4010/suivi-prod/type-travail/theme/";
//url for delivery(Insert)(/geodata/{identifiant}) Post
exports.urlDeliveryInsert = "http://127.0.0.1:4010/geodata/";
//url for delivery(Update)(/geodata/{identifiant}) Put
exports.urlDeliveryUpdate = "http://127.0.0.1:4010/geodata/";
//url for creating MD(/geosys/creer-md) Post
exports.urlCreateMD = "http://127.0.0.1:4010/geosys/creer-md";
//url for validating MD() Post
exports.urlValidateMD = "http://127.0.0.1:4010/geosys/valider-md";
//url for getting all the info for a code() Get
exports.urlGetCode = "http://127.0.0.1:4010/suivi-prod/codes/";
