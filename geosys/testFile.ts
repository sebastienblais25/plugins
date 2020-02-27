import { TestingFile } from './testingFile';
import { User } from './user';
import { urlListFile } from './config/url';



export class TestFile{

    _breadcrumbs:string = '';
    _files:TestingFile[];
    _lastFolder:string;
    _liveFolder:string
    _nextFolder:string;
    _value:any;

    constructor(nextFolder:string = 'root'){
        //this._breadcrumbs = 'root';
        this._nextFolder = nextFolder
    }

    obtainArbo(log:User){
        let outputValue:any;
        /********* API CALL **********/
        //no promise still
        const promises = [];
        promises.push(
            new Promise(resolve =>{
                $.ajax({
                    url: urlListFile + this._nextFolder,
                    type: 'Get',
                    async: false,
                    //cache:false,
                    contentType: "application/json; charset=utf-8",
                    dataType:'json',
                    processData: false,
                    success: //data => resolve()
                    
                    function(response,jqXHR){
                        console.log(response)
                        outputValue = response;
                        
                    },
                    error: function(xhr){
                        alert(xhr.statusText);
                        outputValue = xhr;
                    }
                })
           })
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });
        //alert(outputValue + ' 123')
        this._nextFolder = '';
        this._value = outputValue;  
    }

    buildFolderList(){
        let listFo = [];
        for(let i in this._value.list_folder){
            listFo.push( { name: this._value.list_folder[i].name , wanted: false });
        }
        return listFo;
    }

    buildFileList(){
        let listFi = [];
        for(let i in this._value.list_file){
            listFi.push( { name: this._value.list_file[i].name , wanted: false });
        }
        return listFi;
    }

    buildUI():string{
        this._liveFolder = this._nextFolder;
        this._breadcrumbs += '/'+ this._liveFolder
        let output:string = `
        <div ng-controller="fileManagerPanelCtrl as ctrl11">
            <div class="breadclass">`+ this._breadcrumbs +`</div>
            
            <md-list-item ng-click="ctrl11.openFolder(folder)" class="folderBtn" ng-repeat="folder in ctrl11.folders">
                <div class="" >(folder){{ folder.name }}</div>
            </md-list-item>

            <md-list-item class="fileBtn" ng-repeat="file in ctrl11.files">
                <div class="">(file){{ file.name }}</div>
                
            </md-list-item>

        </div>
        `

        return output;
    }

    setNextFolder(next:string):void{
        this._nextFolder = next ;
    }
}