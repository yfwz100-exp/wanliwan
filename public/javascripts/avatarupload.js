(function() {
  $(function() {
    $('#broimg').append($('<iframe src="/home/avatar/upload?callback=upload"></iframe>').css({
      display: 'none'
    })).click(function(event) {
      var $ifr;
      //$('.preview button').css({display:'none'});

      event.preventDefault();
      $ifr = $(this).children('iframe').contents();
      $ifr.find('#photo-upload-btn').click().change(function() {
        return $ifr.find('#photo-upload').submit();
      });
    });


    $('#firbroimg').append($('<iframe src="/home/avatar/upload?callback=upload"></iframe>').css({
      display: 'none'
    })).click(function(event) {
      var $ifr;
     
                      
      event.preventDefault();
      $ifr = $(this).children('iframe').contents();
      $ifr.find('#photo-upload-btn').click().change(function() {
        return $ifr.find('#photo-upload').submit();
      });
    });
  });

  function showPreview($target, coords) {
    $('.thumbnail-area .preview').each(function(i, e) {
      var $e = $(e);
      var $img = $('img', $e);
      var rx = $e.width() / coords.w;
      var ry = $e.height() / coords.h;

      $img.css({
        width: Math.round(rx * $target.width()) + 'px',
        height: Math.round(ry * $target.height()) + 'px',
        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
        marginTop: '-' + Math.round(ry * coords.y) + 'px'
      });

    });
  }

  window.upload = function(opt) {
    if (opt.name) {
      $('#firbroimg').css({display:'none'});
      $('#broimg').css({display:'block'});
      $('#photo').val(opt.name);
      $('.preview img').attr('src', opt.url);
      var $target = $('#target').Jcrop({
        aspectRatio: 1,
        trackDocument: true,
        onSelect: function (c) {
          $('#clip-x').val(c.x);
          $('#clip-y').val(c.y);
          $('#clip-w').val(c.w);
          $('#clip-h').val(c.h);
          $('#photo-w').val($target.width());
          $('#photo-h').val($target.height());

          showPreview($target, c);
        }
      });
      
    }
  };

}).call(this);
