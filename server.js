const express =require('express');
const morgan =require('morgan');
const bodyParser =require('body-parser');
const cookieParser= require('cookie-parser');
const session= require('express-session');
var path =require('path');
var exhbs=require('express-handlebars');

const MongoClient = require('mongodb').MongoClient;
const urlll = "mongodb://localhost:27017/";


const app =express();

// Middlewares
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exhbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//app.use(session());
// Routes
app.get('/insurance',function(req,res){
res.sendFile(__dirname+'/ui.html');
});
app.get('/api/insurance',function(req,res){
  console.log('kkkkkkkkkkkkkkkkkkkkkkS ');
  var searchValue =req.body.search;
//  var searchValue =req.query.search;
  console.log(searchValue);
  var query= { $text: { $search: searchValue } };

  MongoClient.connect(urlll, function(rr, db) {
      if (rr) {isfound=false; return;};
      var dbo = db.db("insurance_db");
      dbo.collection("insurance").find(query).toArray(function(errr, reslts) {
          if (errr) {throw errr;return;}
          console.log(reslts.length);
          db.close();
           //res.jsonp(reslts);
          res.render('hom',reslts);
      });
    })
});
//app.use('/api',require('./routes/routes'));

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
