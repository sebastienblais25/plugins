"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Url for Extract sans retour(/geodata) Get
exports.urlgeoDataGet = "geodata";
// Url for planned extract(/geodata/{identifiant}) Get
exports.urlgeoDatGetId = "geodata/";
// Url for the login(/securite/login) Get
//export const urlLoginGet: string = `securite/login`;
// Url for the id working unit(/suivi-prod/unite-travail/id/theme/actif/{theme}) Get
exports.urlgetidWu = "suivi-prod/unite-travail/id/theme/actif/";
// Send planning to the API(/suivi-prod/planification) Post
exports.urlPlaniPost = "suivi-prod/planification";
// Url getting environnement(/systeme/envs) Get
exports.urlEnvList = "systeme/envs";
// Url getting list of classes(/systeme/ressources) Get
exports.urlClassesList = "systeme/ressources-recherche";
// Url getting the list of working type for theme(/suivi-prod/type-travail/theme/{theme}) Get
exports.urlWorkingType = "suivi-prod/type-travail/theme/";
// Url for delivery(Insert)(/geodata/{identifiant}) Post
exports.urlDeliveryInsert = "geodata/";
// Url for delivery(Update)(/geodata/{identifiant}) Put
exports.urlDeliveryUpdate = "geodata/";
// Url for creating MD(/geosys/creer-md) Post
exports.urlCreateMD = "geosys/creer-md";
// Url for validating MD(/geosys/valider-md) Post
exports.urlValidateMD = "geosys/valider-md";
// Url for getting all the info for a code(/suivi-prod/codes/{code}) Get
exports.urlGetCode = "suivi-prod/codes/";
// Url for cleaning a working unit id (/suivi-prod/unite-travail/{identifiant}) Delete
exports.urlDeleteClean = "suivi-prod/unite-travail/";
// Url for cancelling for step for a theme (/suivi-prod/etape-ut/{identifiant}) Delete
exports.urlCancelStep = "suivi-prod/etape-ut/";
// Url for testing a file manager 
exports.urlListFile = "systeme/liste-contenants-fichiers?contenant_url=";
// Url Download/Delete File
exports.urlFileAction = "systeme/fichiers?fichier_url=";
// Url Upload File
exports.urlFileActionUpload = "systeme/fichiers?contenant_url=";
// Url Create/Download/Delete Folder
exports.urlFolderAction = "systeme/contenants?contenant_url=";
// Url to send a query to the API
exports.urlQuery = "suivi-prod/requete-bd";
