var fileobj;
$(document).ready(function(){
   $("#drop_zone").on("dragover", function(event) {
     event.preventDefault();  
     event.stopPropagation();
     return false;
   });
   $("#drop_zone").on("drop", function(event) {
     event.preventDefault();  
     event.stopPropagation();
     fileobj = event.originalEvent.dataTransfer.files[0];
     var fname = fileobj.name;
     var fsize = fileobj.size;
     if (fname.length > 0) {
        document.getElementById('file_info').innerHTML = "File name : " + fname +' <br>File size : ' + bytesToSize(fsize);
     }
     document.getElementById('selectfile').files[0] = fileobj;
     document.getElementById('btn_upload').style.display="inline";
   });
   $('#btn_file_pick').click(function(){
     /*normal file pick*/
     document.getElementById('selectfile').click();
     document.getElementById('selectfile').onchange = function() {
     fileobj = document.getElementById('selectfile').files[0];
     var fname  = fileobj.name;
     var fsize = fileobj.size;
     if (fname.length > 0) {
        document.getElementById('file_info').innerHTML = "File name : " + fname +' <br>File size : ' + bytesToSize(fsize);
     }
        document.getElementById('btn_upload').style.display="inline";
     };
   });
   $('#btn_upload').click(function(){
     if(fileobj=="" || fileobj==null){
        alert("Please select a file");
        return false;
     }else{
        ajax_file_upload(fileobj);
     }
   });
});

function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


// function ajax_file_upload(file_obj) {
//    if(file_obj != undefined) {
//      var form_data = new FormData();                  
//      form_data.append('upload_file', file_obj);
//      $.ajax({
//         type: 'POST',
//         url: 'upload.php',
//         contentType: false,
//         processData: false,
//         data: form_data,
//         beforeSend:function(response) {
//           $('#message_info').html("Uploading your file, please wait...");
//         },
//         success:function(response) {
//           $('#message_info').html(response);
//           alert(response);
//           $('#selectfile').val('');
//         }
//      });
//    }
// }
