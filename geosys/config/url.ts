 
//Url for Extract sans retour(/geodata) Get
export const urlgeoDataGet:string = `http://127.0.0.1:4010/geodata?__dynamic=true`;

//Url for planned extract(/geodata/{identifiant}) Get
export const urlgeoDatGetId:string = `http://127.0.0.1:4010/geodata/`;

//url for the login(/securite/login) Get
export const urlLoginGet:string = `http://127.0.0.1:4010/securite/login`;

//url for the id working unit(/suivi-prod/unite-travail/id/theme/actif/{theme}) Get
export const urlgetidWu:string = `http://127.0.0.1:4010/suivi-prod/unite-travail/id/theme/actif/`;

//Send planning to the API(/suivi-prod/planification) Post
export const urlPlaniPost:string = `http://127.0.0.1:4010/suivi-prod/planification?__dynamic=true`;

//url getting environnement(/systeme/envs) Get
export const urlEnvList:string = `http://127.0.0.1:4010/systeme/envs`;

//url getting list of classes(/systeme/ressources) Get
export const urlClassesList:string = `http://127.0.0.1:4010/systeme/ressources`;

//url getting the list of working type for theme(/suivi-prod/type-travail/theme/{theme}) Get
export const urlWorkingType:string = `http://127.0.0.1:4010/suivi-prod/type-travail/theme/`;

//url for delivery(Insert)(/geodata/{identifiant}) Post
export const urlDeliveryInsert:string = `http://127.0.0.1:4010/geodata/`;

//url for delivery(Update)(/geodata/{identifiant}) Put
export const urlDeliveryUpdate:string = `http://127.0.0.1:4010/geodata/`;

//url for creating MD(/geosys/creer-md) Post
export const urlCreateMD:string = `http://127.0.0.1:4010/geosys/creer-md`;

//url for validating MD(/geosys/valider-md) Post
export const urlValidateMD:string = `http://127.0.0.1:4010/geosys/valider-md`;

//url for getting all the info for a code(/suivi-prod/codes/{code}) Get
export const urlGetCode:string = `http://127.0.0.1:4010/suivi-prod/codes/`;

//url for cleaning a working unit id (/suivi-prod/unite-travail/{identifiant}) Delete
export const urlDeleteClean:string = `http://127.0.0.1:4010/suivi-prod/unite-travail/`