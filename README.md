Crawler api
===========
<br />

Introduction
-----------
This is design for the rest application that allows a developer to create a search term and the crawler uses a search term on search websites like google, yahoo, baidu, sogou, yandex and so.

 Basically we are creating methods that post a search term to each search engine and executes depending on the search query of each engine. Since each search engines uses different search queries, to search for the results in for the searched term and then saves them in mongo database.

Thus the design is to create an application that searches a term on the above mentioned search  engines.

<br data-effect="nomal"/>

objectives
------------
1. The API should accept a search term 

2. Design a search query for that matches each search engine

3. Use each search engine’s search query as the base url

4. Design a web crawler that has search queries for each search engine

5. Return results of all the links that match the search term

6.  Save to mongodb

<br data-effect="slide"/>


**Major modules**

 App module – for starting the server to listen to incoming requests  and  also contains paths to the app and nested crawler module 

 Routes module – contains post and get paths , for redirecting the user  to the required functions of the crawler search engine

 Models module -  for saving data and reading data

 Crawler module – for web scraping websites and saving the results to  models module


Pseudocodes
---------------------

**routes module pseudo**


```js:route.js
 route.post(“/search”,function(req,res){
  if (req.body.searchTerm){
      var searchwords= req.body.searchTerm;
                   
 /*iterate the search word over different 
 search queries for different search engines*/
    
                     }
else{
// search term is required
}
  });

route.post(“/find”) .get(function(res,req){
   var getLinks=req.body.searchLinks
//returns results matching the word from the database
})
```

<br data-effect="turn"/>

 **app module pseudo**
Create server, on app module development.

```js:app.js
// create a server
var port =3000;
app.listen(port, function () {
    console.log('Example app listening on port 3000.');
});```


<br \>

**Crawler module pseudo**
Create various scraping functions to select items from each search engine.

```js:crawler.js
Module.exports={
Crawl: async.parallel( // use of request functions and promises.
// execute a crawler function that iterates search queries per each search engine);
SaveDetails: // import save method from Models module
}
```

<br\>

**Models module pseudo**
- Create database connection
- Create model instance
- Save data to mongodb
- Create comparison functions
- Retrieve data from mongodb 
- Export the module


**Structure of the data collection in the db**

| Rows | Data Types | Presence |
| --- | --- | --- |
| \_id | Object ID | automated |
| searchterm | String | required |
| SearchEngine | String | required |
| addresses | Array | required |
| dateCreated | date | required |

End points for search engines
-----------------------------------
(retrieve data )
Nested inside post methods

 Search Engines and the request Method

Google   :   GET “https://www.google.co.zw/search?q=” +searchterm+”&oq=”+searchterm

Yahoo     :   GET “https://search.yahoo.com/search?p=” +searchterm

Baidu      :   GET “http://www.baidu.com/s?ie=utf-8&tn=baidu&wd=” +searchterm

Yandex    :  GET “https://yandex.com/search/?text=” +searchterm

Sogou      :  GET “https://www.sogou.com/web?query=” +searchterm

So            :   GET “https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome&q=” +searchterm

These are iterated on entering the search term, it will retrieve all the results from various search engines.
 Results will be stored in an array before they are saved to the database to avoid saving the similar links from the various search engines.




