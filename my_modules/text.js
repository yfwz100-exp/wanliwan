var mgs = require("mongoose");

var textSchema = new mgs.Schema({
  content : String,    
  time    : Date,
  email   : String
});
