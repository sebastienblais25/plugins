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
        /********* API CALL **********/
        return new Promise(resolve => {
            $.ajax( {
                // URL of the API
                url: urltogo,
                // The header with token and contentYpe
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'contentType': content
                },
                // Type of the operation GET,POST ,PUT or DELETE
                type: operation,
                // The typ of the data
                //dataType: 'json',
                data: file,
                processData: false,
                // Send the data in the promise
                success: data => resolve(data)
            })
        }) 
    }
}