export class Connexion {

    constructor(){}

   /**
    * The connexion to the Api for the login
    * @param {string} urlgoto The url for the login
    * @param {*} header The header with the username and the password
    * @returns {*} Return the infromation of the user
    * @memberof connexion
    */
   connexionAPILogin(urlgoto: string, header: any): any {
        let outputValue: any;
        /********* API CALL Login **********/
        const promises = [];
        promises.push(
            new Promise(resolve => {
                $.ajax( {
                    url: urlgoto,
                    headers: {
                        header
                    },
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    success: //data => resolve()
                    function(response) {
                        outputValue = response;
                        //console.log(outputValue);
                    },
                    error: (xhr) => {
                        alert(xhr.statusText);
                        outputValue = xhr;
                    }
                })
            })
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });
        return outputValue;
    };
    /**
     * connection to the Api with ajax and promises
     * @param {string} token the token for the connection
     * @param {*} jsonstring the body in json 
     * @param {string} urlgoto the url to jion the API
     * @param {string} typeConn the type of connection Get, Post, put ...
     * @returns {*} return all the information we get from the Api
     * @memberof connexion
     */
    connexionAPI(token: string, jsonString: any, urlgoto: string, typeConn: string, optEnv: string = ''): any {
        let outputValue: any;
        /********* API CALL **********/
        const promises = [];
        promises.push(
            new Promise(resolve =>{
                $.ajax( {
                    url: urlgoto,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'contentType': 'application/json',
                        optEnv
                    },
                    type: typeConn,
                    async: false,
                    data: jsonString,
                    dataType: 'json',
                    processData: false,
                    success: //data => resolve()
                    function(response, jqXHR) {
                        if (response === undefined) {
                            outputValue = 'success';
                        } else {
                            if (response.message !== undefined) {
                                outputValue = jqXHR;
                            } else {
                                outputValue = response;
                            }
                        }
                    },
                    error: (xhr) => {
                        outputValue = xhr;
                    }
                })
            })
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });
        return outputValue;
    };
   /**
     * connection to the Api with ajax and promises for files
     * @param {string} token the token for the connection
     * @param {*} jsonstring the body in formdata (File)
     * @param {string} urlgoto the url to join the API
     * @param {string} typeConn the type of connection Get, Post, put ...
     * @returns {*} return all the information we get from the Api
    * @memberof connexion
    */
    connexionAPIFormData(token: string, formdata: any, urlgoto: string, typeConn: string, optEnv: string = ''): any {
        let outputValue: any;
        /********* API CALL **********/
        const promises = [];
        promises.push(
            new Promise(resolve => {
                $.ajax( {
                    url: urlgoto,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        optEnv
                    },
                    type: 'POST',
                    async: false,
                    data: formdata,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: //data => resolve()
                    function(response, jqXHR) {     
                        if (response.message !== undefined) {
                            outputValue = jqXHR;
                        } else {
                            outputValue = response;
                        }
                    },
                    error: (xhr) => {
                        outputValue = xhr;
                    }
                })
            })
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });
        return outputValue;
    };
    /**
     * Get the structure of a repository from S3
     * @param {string} token token of the user
     * @param {string} urltogo the url for the API
     * @returns {*} the list of folder and file
     * @memberof Connexion
     */
    connexionAPIFileMAnager(token: string, urltogo: string): any {
        let outputValue: any;
        /********* API CALL **********/
        const promises = [];
        promises.push(
            new Promise(resolve => {
                $.ajax( {
                    url: urltogo,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'contentType': 'application/json'
                    },
                    type: 'Get',
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    processData: false,
                    success: //data => resolve()
                    function(response,jqXHR){
                        outputValue = response;
                    },
                    error: (xhr) => {
                        outputValue = xhr;
                    }
                })
           }) 
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });
        return outputValue
    }
    /**
     * Send to the API the file to download or the file to delete
     * @param {string} token the token to connect to the API
     * @param {string} urltogo url for the service of the API
     * @param {string} operation delete or get
     * @param {string} content json for delete and the file for the download
     * @returns {*} return the file or the message of a deleted file
     * @memberof Connexion
     */
    connexionAPIFileDownloadDelete(token: string, urltogo: string, operation: string, content: string): any {
        let outputValue: any;
        /********* API CALL **********/
        const promises = [];
        promises.push(
            new Promise(resolve => {
                $.ajax( {
                    url: urltogo,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'contentType': content
                    },
                    type: operation,
                    async: false,
                    processData: false,
                    success: //data => resolve()
                    function (response,jqXHR) {
                        if (response === undefined) {
                            outputValue = 'success';
                        } else {
                            if (response.message !== undefined) {
                                outputValue = jqXHR;
                            } else {
                                outputValue = response;
                            }
                        }
                    },
                    error: (xhr) => {
                        outputValue = xhr;
                    }
                })
            })
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });
        return outputValue;
    }
    /**
     * Send a file to the API to upload
     * @param {string} token Token to connetc to the API
     * @param {string} urltogo Url to uplaod a file
     * @param {File} file The file to upload
     * @returns {*} Return a meassage for the uploaded file
     * @memberof Connexion
     */
    connexionAPIFileUplaod(token: string, urltogo: string, file: File):any{
        let outputValue: any;
        /********* API CALL **********/
        const promises = [];
        promises.push(
            new Promise(resolve => {
                $.ajax( {
                    url: urltogo,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'contentType': 'application/json'
                    },
                    type: 'POST',
                    async: false,
                    dataType:'application/octet-stream',
                    data : file,
                    processData: false,
                    success: //data => resolve()
                    function(response,jqXHR) {
                        if (response === undefined) {
                            outputValue = 'success';
                        }else{
                            if (response.message !== undefined){
                                outputValue = jqXHR;
                            }else{
                                outputValue = response;
                            }
                        }
                    },
                    error: function(xhr) {
                        outputValue = xhr; 
                    }
                })
            })
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });
        return outputValue;  
    }
}