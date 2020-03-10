
import { User } from './user';
import { urlListFile } from './config/url';
import { connexion } from './apiConnect';



export class FileMana{

    _conn:connexion = new connexion();
    _breadcrumbs:string = '';
    _lastFolder:string;
    _liveFolder:string
    _nextFolder:string;
    _value:any;
    _list = [];

    constructor(nextFolder:string = 'root'){
        //this._breadcrumbs = 'root';
        this._nextFolder = nextFolder
        this._breadcrumbs= '...';
    }

    obtainArbo(log:User){
        let outputValue:any;
        /********* API CALL **********/
        //no promise still
        const promises = [];
        promises.push(
            new Promise(resolve =>{
                $.ajax({
                    url: this.setNavigation(),
                    headers: {
                        'Authorization': `Bearer ${log.gettoken()}`,
                        'contentType': 'application/json'   
                    },
                    type: 'Get',
                    async: false,
                    //cache:false,
                    contentType: "application/json; charset=utf-8",
                    dataType:'json',
                    processData: false,
                    success: //data => resolve()
                    
                    function(response,jqXHR){
                        //console.log(response)
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

    setNavigation():string{
        return 'http://127.0.0.1:4010/' + urlListFile + this._breadcrumbs + '&__example=' + this._breadcrumbs
    }

    buildFolderList(){
        let listFo = [];
        for(let i in this._value.list_folder){
            listFo.push( { name: this._value.list_folder[i].name, modified:this._value.list_folder[i].last_modified, wanted: false });
        }
        return listFo;
    }

    buildFileList(){
        let listFi = [];
        for(let i in this._value.list_file){
            listFi.push( { name: this._value.list_file[i].name , size:this._value.list_file[i].size, modified:this._value.list_file[i].last_modified, wanted: false });
        }
        return listFi;
    }

    buildUI():string{
        /*if(this._nextFolder != 'root'){
            this._liveFolder = this._nextFolder;
            this._breadcrumbs += '/'+ this._liveFolder
        }*/
        let output:string = `
        <div ng-controller="fileManagerPanelCtrl as ctrl11">
            <div class="breadclass">`+ this.buildClickablebreadcrumbs() +`</div>
            <div class="headerFile">
                <span class="nameFileFolderHeader">Name</span> 
                <span class="modifiedFileFolderHeader">Date modified</span>
                <span class="sizeFileFolderHeader">Size</span>
            </div>
            <div id="div1">
            <form>
                <md-list-item ng-click="ctrl11.openFolder(folder)" class="folderBtn" ng-repeat="folder in ctrl11.folders">
                    <div class="groupingInfo">
                        <md-icon>
                            <i class="material-icons">
                                folder
                            </i>
                        </md-icon>
                        <span class="nameFileFolder">{{ folder.name }}</span>
                        <span class="modifiedFileFolder">{{ folder.modified }}</span>
                    </div>
                </md-list-item>
                
                <md-list-item class="fileBtn" ng-repeat="file in ctrl11.files">
                    <div class="groupingInfo">
                        <md-icon>
                            <i class="material-icons">
                                insert_drive_file
                            </i>
                        </md-icon>
                        <span class="nameFileFolder lilPad">{{ file.name }}</span> 
                        <span class="modifiedFileFolder lilPad">{{ file.modified }}</span>
                        <span class="sizeFileFolder lilPad">{{ file.size }} KB</span>
                        <div class="downloadbtn" ng-click="ctrl11.deleteFile(file)"><i class="material-icons">delete</i></div>
                        <div class="downloadbtn" ng-click="ctrl11.downloadFile(file)"><i class="material-icons">vertical_align_bottom</i></div>
                    </div>       
                </md-list-item>
                <div class="form-group">
                    <label for="file">Choose File</label>
                    <input type="file"
                        id="file">
                </div>
                <div id="div"> drop here</div>
            </form>
            </div>
        </div>
        <script type="text/javascript">
            $(document).ready(function(){ 
                $("#div").on("dragover", function(event) {
                    event.preventDefault();  
                    event.stopPropagation();
                    $(this).addClass('dragging');
                });
                
                $("#div").on("dragleave", function(event) {
                    event.preventDefault();  
                    event.stopPropagation();
                    $(this).removeClass('dragging');
                });
                
                $('#div').on(
                    'drop',
                    function(e){
                        if(e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length) {
                            e.preventDefault();
                            e.stopPropagation();
                            /*UPLOAD FILES HERE*/
                            upload(e.originalEvent.dataTransfer.files);
                        }
                    }
                );
            });
        </script>
        `
        return output;
    }

    buildClickablebreadcrumbs(){
        
        this._list =  this._breadcrumbs.split('/');
        let bc:string = '';
        for(let i in this._list){
            bc += `/<span ng-click="ctrl11.followup('`+ i +`')"><a href="#">`+this._list[i]+`</a></span>`;
        }
        return bc;
    }

    setbreacrumbsForNav(rank:string){
        
        this._breadcrumbs = '';
        for(let i in this._list){
            if(i < rank){
                this._breadcrumbs += this._list[i] + '/'
            }else if(i === rank){
                this._breadcrumbs += this._list[i]
            }else{
                break;
            }
        }
    }

    setNextFolder(next:string):void{
        this._nextFolder = next ;
    }
}