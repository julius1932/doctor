
const MongoClient = require('mongodb').MongoClient;
//const urlll = "mongodb://localhost:27017/";
const urlll ="mongodb://junta:rootjunta123@ds117431.mlab.com:17431/doc_db";

MongoClient.connect(urlll, function(rr, db) {
    if (rr) {isfound=false; return;};
    var dbo = db.db("doc_db");
     dbo.createIndex("doctors",{"Provider First Name":'text','Provider Last Name (Legal Name)':'text'},function(err,op) {
       console.log(err);
     });

 });
