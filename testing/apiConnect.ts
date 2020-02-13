export class connexion{

    constructor(){

    }

    //Send json form to API in ajax
    connexionAPI(token:string, jsonstring:any, urlgoto:string, typeConn?:string):any{
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
   /* Note: connexionAPILogin pourrait etre fusionner juste ajuster le header selon l'utilisation */ 

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
                    console.log(outputValue); 
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
            console.log(values);
        });
        //alert(outputValue)
        return outputValue;     
    };

    connexionAPIPost(token:string, jsonstring:string, urlgoto:string, typeConn?:string):any{
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
                        //alert(jqXHR+ ' 1');
                        console.log(jqXHR );
                        alert(response.message);
                        //console.log(response.message  + ' 2');

                        outputValue = jqXHR;
                        
                    },
                    error: function(xhr){
                        alert(xhr.statusText);
                        alert("hello");
                        outputValue = xhr;
                    }
                })
                
           })
        );
       Promise.all(promises).then(values => {
            console.log(values);
        });

        //alert(outputValue + ' 3')
        

        return outputValue;
            
   };
}