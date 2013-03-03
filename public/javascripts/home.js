(function () {
  "use strict"

  $(function () {
    // 增加背景层，即网页变黑的效果。
    window.overlay = {
      _obj: $('<div></div>').css({
        position: 'fixed', 
        left: '0', top: '0', width:'100%', height:'100%',
        display: 'none',
        backgroundColor: 'rgba(22,22,22,0.85)'
      }).appendTo(document.body),
      show: function () {
        this._obj.fadeIn();
      },
      hide: function () {
        this._obj.fadeOut();
      }
    };

    // 为背景添加单击事件，使得单击以后回到原来的页面。
    overlay._obj.click(function () {
      page('/home');
    });

    $('.hot a').toggleElement({
      element: '#info-area',
      duration: 0,
      toggle: function ($info, event) {
        overlay.show();
        var $target = $(event.currentTarget);
        var pos = $target.position();

        var $title = $('.title', $info);
        var $content = $('.content', $info);
        $.get($target.attr('href'), null, null, 'html').success(function (data) {
          // var obj = $.parseJSON(data);
          // $title.html(obj.title);
          $content.html($(data));
          window.o = $(data);

          var actualHeight = $info.height();
          $info.css({
            top: pos.top + 'px'
          });
          $info.slideToggle();
        }).error(function (data) {
          $title.html('The site is still being actively contructing.');
          $content.html('Refer to the administrator of the website for more information.');
          
          var actualHeight = $info.height();
          $info.css({
            top: pos.top - actualHeight / 2 + 'px'
          });
          $info.slideToggle();
        });
      }
    });
    
    // 初始化。
    // 相应所有点击事件，如果符合定义的路由表，就直接执行路由动作。
    page();
  });
  
  // 定义路由表，与express类似
  page('/home(*)', home);
  page('/new/:type(*)', newTextPopup);

  function newTextPopup(ctx) {
    $.get('/new/'+ctx.params.type).success(function (data) {
      $('#new-post-area').html(data).slideDown();
      $('#new-post-area form').submit(function (event) {

        // 取消默认动作。
        event.preventDefault();
        var $this = $(this);
        var data = $this.serializeArray();

        // AJAX 提交表单。
        $.post('/new/'+ctx.params.type, data).success(function (data) {
          var o = $(data).hide();
          $('#posts-list').prepend(o);
          o.slideDown();
          page('/homeb/');
        }).error(function (data) {
          alert('错误了～');
        });
      });
      overlay.show();
    }).error(function (data) {
      $('#new-post-area').html('大哥手下留情，我们很快就会完善的了……').slideDown();
      overlay.show();
    });
  }

  function home(ctx) {
    overlay.hide();
    $('#new-post-area').slideUp();
    $('#info-area').css({
      position: 'absolute',
      zIndex: 642,
    }).slideUp();
  }

})();

