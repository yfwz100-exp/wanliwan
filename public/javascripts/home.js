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
      show: function (func) {
        this._obj.fadeIn({
          always: typeof func != 'undefined' ? func : null
        });
      },
      hide: function (func) {
        this._obj.fadeOut({
          always: typeof func != 'undefined' ? func : null
        });
      }
    };

    window.infoArea = {
      _obj: $('#info-area').css({
        position: 'absolute'
      }),
      show: function (y, func) {
        this._obj.css({
          top: y + 'px',
          zIndex: 642,
        }).slideDown();
      },
      hide: function () {
        this._obj.slideUp();
      },
      get height() {
        return this._obj.height();
      },
      get width() {
        return this._obj.width();
      },
      set message(message) {
        var msg = this._msg ? this._msg : this._msg = $('.content', this._obj);
        msg.html(message);
      },
      get message() {
        return this._msg ? this._msg.html() : (this._msg = $('.content', this._obj)).html(); 
      },
      set title(title) {
        var tit = this._title ? this._title : this._title = $('.title', this._obj);
        tit.html(title);
      },
      get title() {
        return this._title ? this._title.html() : (this._title = $('.title', this._obj)).html(); 
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

        $.get($target.attr('href')).success(function (data, attr, xhr) {
          var $obj = $($.parseHTML(data));

          infoArea.title = $obj.filter('title').html();
          infoArea.message = $obj.filter('#everything').html();

          var attop = pos.top - infoArea.height / 2;
          var vtop = $(document).scrollTop() - infoArea._obj.parent().offset().top;
          infoArea.show(attop > vtop ? attop : vtop);
        }).error(function (data) {
          infoArea.title = 'The site is still being actively contructing.';
          infoArea.message = 'Refer to the administrator of the website for more information.';

          var attop = pos.top - infoArea.height / 2;
          var vtop = $(document).scrollTop() - infoArea._obj.parent().offset().top;
          infoArea.show(attop > vtop ? attop : vtop);
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
    $('.header .navigator').css({
      zIndex: 642
    });
    $('.header .avatar').css({
      zIndex: 642
    });

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
    $('#new-post-area').slideUp();
    overlay.hide(function () {
      $('.header .navigator').css({
        zIndex: 0
      });
      $('.header .avatar').css({
        zIndex: 0
      });
      
    });
    infoArea.hide();
  }

})();

