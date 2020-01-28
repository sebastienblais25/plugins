export class connexion{
    //Send json form to API in ajax
    submitForm(token:string, json:string, urlgoto:string):any{
        let outputValue:any;
        
        console.log("hello");

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
                    type: 'GET',
                    async: false,
                    cache:false,
                    data:json,
                    dataType:'json',
                    success: data => resolve()
                    
                    /*function(response){
                        outputValue = response;
                        console.log(outputValue.value);
                        
                    }*/
                })
                .done(function(data){
                    console.log('success', data)
                    outputValue = data;
                })
                .fail(function(xhr){
                    console.log('error',xhr)
                });
           })
        );
       Promise.all(promises).then(values => {
            console.log(values[1]);
        });
        console.log();
        return outputValue;
            
   };
}