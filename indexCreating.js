
const MongoClient = require('mongodb').MongoClient;
//const urlll = "mongodb://localhost:27017/";
const urlll = "mongodb://junta:rootjunta123@ds163850.mlab.com:63850/insurance_db";

MongoClient.connect(urlll, function(rr, db) {
    if (rr) {isfound=false; return;};
    var dbo = db.db("doc_db");
     dbo.createIndex("doctors",{"Provider First Name":'text'},function(err,op) {
       console.log(err);
     });

 });
