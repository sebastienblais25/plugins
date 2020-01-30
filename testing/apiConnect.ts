export class connexion{

    constructor(){

    }

    //Send json form to API in ajax
    connexionAPI(token:string, json:string, urlgoto:string):any{
        let outputValue:any;
        
        //console.log("hello");
        /********* API CALL **********/
        //no promise still
        const promises = [];
        promises.push(
            new Promise(resolve =>{
                $.ajax({
                    url: urlgoto,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    type: 'GET',
                    async: false,
                    //cache:false,
                    data:json,
                    dataType:'json',
                    success: //data => resolve()
                    
                    function(response,jqXHR){
                        outputValue = response;
                        console.log(jqXHR)
                        
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
}