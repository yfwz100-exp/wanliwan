function checkMail(str){    
    var strReg="";                   
    var r;   
    var strText=document.getElementById(str).value; 
    strReg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i;                
    r=strText.search(strReg);   
    if(r==-1) {
      	var insertText = "<span>请输入一个有效邮箱</span>";
      	document.getElementById("error").innerHTML = insertText;
      	document.getElementById("error").style.display='block';
        document.getElementById("rsubmit").style.marginTop='10px';
        doShake('email');
 	} else{
    document.getElementById("rsubmit").style.marginTop='0px';
    document.getElementById("error").style.display='none';

    if (document.getElementById("password").value=="") {
      var insertText = "<span>密码不可以为空</span>";
      document.getElementById("error1").innerHTML = insertText;
      document.getElementById("error1").style.display='block';
      document.getElementById("rsubmit").style.marginTop='20px';
      doShake('password');
      return false;
    }else{
      document.getElementById("error").style.display='none';
      document.getElementById("rsubmit").style.marginTop='0px';
      return true;
    }

  }
}

function checkPassword(str){   
  var strReg="";                   
  var r;   
  var strText=document.getElementById("email").value; 
  strReg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i;                
  r=strText.search(strReg);   
  if(document.getElementById("password").value=="") {
  	var insertText = "<span>密码不可以为空</span>";

  	document.getElementById("error1").innerHTML = insertText;
  	document.getElementById("error1").style.display='block';
    document.getElementById("rsubmit").style.marginTop='20px';
    doShake('password');
  	if(r==-1) {
    	var insertText = "<span>请输入一个有效邮箱</span>";
    	document.getElementById("error").innerHTML = insertText;
    	document.getElementById("error").style.display='block';
      document.getElementById("rsubmit").style.marginTop='20px';
      doShake('email');
	  } else{
    	  document.getElementById("error").style.display='none';
    }
	
  }else{
	  document.getElementById("error1").style.display='none';
	  if(r==-1) {
    	var insertText = "<span>请输入一个有效邮箱</span>";
    	document.getElementById("error").innerHTML = insertText;
    	document.getElementById("error").style.display='block';
      document.getElementById("rsubmit").style.marginTop='10px';
      doShake('email');
  	} else{
      	document.getElementById("error").style.display='none';
    }
  }

}
//显示密码
function showPassword(self){
  var temp=document.getElementById('password').value;
  if(self.checked){
    document.getElementById('pass').innerHTML="<input id=password class=password type=text onblur=checkPassword('password') placeholder=密码 name=user[password]></input>";
  }else{
    document.getElementById('pass').innerHTML="<input id=password class=password type=password onblur=checkPassword('password') placeholder=密码 name=user[password]></input>";
  } 
  document.getElementById('password').value=temp;
}




function checkReg(){   
  var strReg="";                   
  var r;
  var strText=document.getElementById("email").value;

  //去除前后空格
  strText = strText.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');

  document.getElementById("email").value = strText;

  strReg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i;                
  r=strText.search(strReg);

  var flag = true;

  if (document.getElementById("name").value=="") {
    var insertText = "<span>需要一个昵称~~</span>";
    document.getElementById("nameerr").innerHTML = insertText;
    document.getElementById("nameerr").style.display='block';
    flag = false;
    doShake('name');
  }else{
    document.getElementById("nameerr").style.display='none';
  }

  if(r==-1) {
  	var insertText = "<span>需要有效邮箱~~</span>";
  	document.getElementById("mailerr").innerHTML = insertText;
  	document.getElementById("mailerr").style.display='block';
    flag = false;
    doShake('email');
	}else{
    document.getElementById("mailerr").style.display='none';
  }
  if (document.getElementById("password").value=="") {  
    var insertText = "<span>需要一个密码~~</span>";
    document.getElementById("passerr").innerHTML = insertText;
    document.getElementById("passerr").style.display='block';
    flag = false;
    doShake('password');
  }else{
    document.getElementById("passerr").style.display='none';
  }
  
  if (flag) {
    return true;
  }else{
    return false;
  }
}


function checkLogin(){   
    var strReg="";                   
    var r;
    var strText=document.getElementById("email").value;
  
    //去除前后空格
    strText = strText.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');

    document.getElementById("email").value = strText;

    strReg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i;                
    r=strText.search(strReg);

    if(r==-1) {
      var insertText = "<span>请输入一个有效邮箱</span>";
      document.getElementById("error").innerHTML = insertText;
      document.getElementById("error").style.display='block';

      if (document.getElementById("password").value=="") {  
        var insertText = "<span>密码不可以为空</span>";
        document.getElementById("error1").innerHTML = insertText;
        document.getElementById("error1").style.display='block';
        document.getElementById("rsubmit").style.marginTop='20px';
        doShake('password');
        doShake('email');
        return false;
      }else{
        document.getElementById("rsubmit").style.marginTop='10px';
        document.getElementById("error1").style.display='none';
        doShake('email');
        return false;  
      }
      
    }else{
      document.getElementById("error").style.display='none';
      document.getElementById("rsubmit").style.marginTop='0px';

      if (document.getElementById("password").value=="") {
        var insertText = "<span>密码不可以为空</span>";
        document.getElementById("error1").innerHTML = insertText;
        document.getElementById("error1").style.display='block';
        document.getElementById("rsubmit").style.marginTop='20px';
        doShake('password');
        return false;
      }else{
        document.getElementById("error").style.display='none';
        document.getElementById("rsubmit").style.marginTop='0px';
        checkPassword();

        return true;
      }
    };
}

//抖动
function doShake(id){  
    var o=document.getElementById(id);  
    //var f=[o.offsetLeft,o.offsetTop];
    var f=[0,0];  
    var p=["left","top"],  
    i=0;  
    var u = setInterval(function() {  
        var s = o.style;  
        s[p[i % 2]] = f[i % 2] + ((i++) % 4 < 2 ? -2 : 2) + "px";  
        if (i > 30) {  
            clearInterval(u);  
            s[p[0]] = f[0] + "px";  
            s[p[1]] = f[1] + "px";  
            i = 0;  
        }  
    },36);  
}; 
 
