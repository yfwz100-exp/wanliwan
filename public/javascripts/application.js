!function ($) {

  $(function(){
  	   /*margin control*/
  	$.each($(".messageBar").children(),function(i,n){
  		var former=$(n).attr("class");
  		var latter=$(n).next().attr("class");
  		if(former==latter){
  		  $(n).css("margin-bottom","5px");
  	}
  	});
    /*margin control*/
  	$(".header_nav ul li img").hover(function(){
	  	var src=$(this).attr("src");
	  	var imgurl=src.substring(0,12);
	  	var gif=src.substring(12);
	  	var fua wqwqll_img_url=imgurl+"1"+gif;
  		$(this).attr("src",full_img_url);
  	},function(){
  		var src=$(this).attr("src");
	  	var imgurl=src.substring(0,12);
	  	var gif=src.substring(13);
	  	var full_img_url=imgurl+gif;
  		$(this).attr("src",full_img_url);
  	});
    var height=$("#my_info_content").height();
    if(height>50){
    	$("#my_info_content").attr("id","my_info_full_content");
    	$("#unfold").show();
    	$("#fold").hide();
    }
    $("#unfold").click(function(){
    	$("#my_info_full_content").attr("id","my_info_content");
    	$("#fold").show();
    	$("#unfold").hide();
    })
    $("#fold").click(function(){
    	$("#my_info_content").attr("id","my_info_full_content");
    	$("#unfold").show();
    	$("#fold").hide();
    })
 
})

}(window.jQuery)
