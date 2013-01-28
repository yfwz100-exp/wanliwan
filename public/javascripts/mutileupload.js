function showFileName(){
  console.log(" FileList Demo:");
  var file;
  //取得FileList取得的file集合
  for(var i = 0 ;i<document.getElementById("multifile").files.length;i++){
    //file对象为用户选择的某一个文件
    file=document.getElementById("multifile").files[i];
    //此时取出这个文件进行处理，这里只是显示文件名
    console.log(file.name);
  }
} 
