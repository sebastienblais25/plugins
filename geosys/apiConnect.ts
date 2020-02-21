export class connexion{

    constructor(){}

    /**
     * connection to the Api with ajax and promises
     * @param {string} token the token for the connection
     * @param {*} jsonstring the body in json 
     * @param {string} urlgoto the url to jion the API
     * @param {string} typeConn the type of connection Get, Post, put ...
     * @returns {*} return all the information we get from the Api
     * @memberof connexion
     */
    connexionAPI(token:string, jsonstring:any, urlgoto:string, typeConn:string):any{
        let outputValue:any;
        /********* API CALL **********/
        //no promise still
        const promises = [];
        promises.push(
            new Promise(resolve =>{
                $.ajax({
                    url: urlgoto,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'contentType': 'application/json'
                    },
                    type: typeConn,
                    async: false,
                    //cache:false,
                    contentType: "application/json; charset=utf-8",
                    data: jsonstring,
                    dataType:'json',
                    processData: false,
                    success: //data => resolve()
                    
                    function(response,jqXHR){
                        if(response == undefined){
                            outputValue = 'success';
                            alert('delete')
                        }else{
                            if (response.message != undefined){
                                alert('Planning and extract')
                                outputValue = jqXHR;
                            }else{
                                //alert(response + ' 2')
                                outputValue = response;
                            }  
                        }  
                    },
                    error: function(xhr){
                        alert(xhr.statusText);
                        outputValue = xhr;
                        //console.log($('#recommandation').val());
                    }
                })
           })
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });
        //alert(outputValue + ' 123')
        return outputValue;       
   };

   /**
    *the connexion to the Api for the login
    * @param {string} urlgoto the url for the login
    * @param {*} header the header with the username and the password
    * @returns {*} return the infromation of the user
    * @memberof connexion
    */
   connexionAPILogin(urlgoto:string,header:any):any{
    let outputValue:any;
    
    //console.log("hello");
    /********* API CALL Login **********/
    //no promise still
    const promises = [];
    promises.push(
        new Promise(resolve =>{
            $.ajax({
                url: urlgoto,
                headers: {
                    header
                },
                type: 'GET',
                async: false,
                //cache:false,
                //data:json,
                dataType:'json',
                success: //data => resolve()
                
                function(response){
                    outputValue = response;
                    //console.log(outputValue); 
                },
                error: function(xhr){
                    alert(xhr.statusText);
                    outputValue = xhr;
                }
            })
            /*.done(function(data){
                console.log('success', data)
                outputValue = data;
            })
            .fail(function(xhr){
                console.log('error',xhr)
            });*/
       })
        );
    Promise.all(promises).then(values => {
            //console.log(values);
        });
        //alert(outputValue)
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
   connexionAPIFormData(token:string, formdata:any, urlgoto:string, typeConn:string):any{
    let outputValue:any;
    /********* API CALL **********/
    //no promise still
    const promises = [];
    promises.push(
        new Promise(resolve =>{
            $.ajax({
                url: urlgoto,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                type: typeConn,
                async: false,
                //cache:false,
                mimeType: "multipart/form-data",
                contentType: false,
                data: formdata,
                processData: false,
                success: //data => resolve()
                
                function(response,jqXHR){
                    
                    if (response.message != undefined){
                        //alert(response.message + ' 123')
                        outputValue = jqXHR;
                    }else{
                        //alert(response + ' 2')
                        outputValue = response;
                    }
                    
                },
                error: function(xhr){
                    alert(xhr.statusText);
                    outputValue = xhr;
                    //console.log($('#recommandation').val());
                }
            })
            /*.done(function(data){
                console.log('success', data)
                outputValue = data;
            })
            .fail(function(xhr){
                console.log('error',xhr)
            });*/
            })
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });
        return outputValue;
    };
}