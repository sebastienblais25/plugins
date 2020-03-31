export class Connexion {

    constructor(){}

  
    /**
     * Get the structure of a repository from S3
     * @param {string} token token of the user
     * @param {string} urltogo the url for the API
     * @returns {*} the list of folder and file
     * @memberof Connexion
     */
    connexionAPIFileManager(token: string, urltogo: string, operation: string, content: string, file: any = ''): any {
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
                    dataType: 'json',
                    data: file,
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
}