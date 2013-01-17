
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.andex = function(req, res){
  res.render('andex', { title: 'Express' });
};
