"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Url for Extract sans retour(/geodata) Get
exports.urlgeoDataGet = "geodata";
//Url for planned extract(/geodata/{identifiant}) Get
exports.urlgeoDatGetId = "geodata/";
//url for the login(/securite/login) Get
exports.urlLoginGet = "securite/login";
//url for the id working unit(/suivi-prod/unite-travail/id/theme/actif/{theme}) Get
exports.urlgetidWu = "suivi-prod/unite-travail/id/theme/actif/";
//Send planning to the API(/suivi-prod/planification) Post
exports.urlPlaniPost = "suivi-prod/planification";
//url getting environnement(/systeme/envs) Get
exports.urlEnvList = "systeme/envs";
//url getting list of classes(/systeme/ressources) Get
exports.urlClassesList = "systeme/ressources";
//url getting the list of working type for theme(/suivi-prod/type-travail/theme/{theme}) Get
exports.urlWorkingType = "suivi-prod/type-travail/theme/";
//url for delivery(Insert)(/geodata/{identifiant}) Post
exports.urlDeliveryInsert = "geodata/";
//url for delivery(Update)(/geodata/{identifiant}) Put
exports.urlDeliveryUpdate = "geodata/";
//url for creating MD(/geosys/creer-md) Post
exports.urlCreateMD = "geosys/creer-md";
//url for validating MD(/geosys/valider-md) Post
exports.urlValidateMD = "geosys/valider-md";
//url for getting all the info for a code(/suivi-prod/codes/{code}) Get
exports.urlGetCode = "suivi-prod/codes/";
//url for cleaning a working unit id (/suivi-prod/unite-travail/{identifiant}) Delete
exports.urlDeleteClean = "suivi-prod/unite-travail/";
//url for cancelling for step for a theme (/suivi-prod/etape-ut/{identifiant}) Delete
exports.urlCancelStep = "suivi-prod/etape-ut/";
//url for testing a file manager 
exports.urlListFile = "systeme/liste-contenants-fichiers?contenant_url=";
//url Download/Delete/Upload File
exports.urlFileAction = "systeme/fichiers?fichier_url=";
//url Create/Download/Delete Folder
exports.urlFolderAction = "systeme/contenants?contenant_url=";
