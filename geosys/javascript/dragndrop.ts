
export const dragdropFunction:string = `
<script>
function onDragOver(e) {
    e.preventDefault();  
    e.stopPropagation();
    $('.drop-window').show();
    e.dataTransfer.dropEffect = "move";
}
function onDragEnter(e) {
   
    e.preventDefault();  
    e.stopPropagation();
} 
function onDragLeave(e) {
    e.preventDefault();  
    e.stopPropagation();
    $('.drop-window').hide();
}
function onDrop(e) {
    e.preventDefault();  
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files = dt.files;
    $('.drop-window').hide();
    fileInput.files = files
    $('#uploading').click();
}
</script>
`;