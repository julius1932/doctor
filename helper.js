const levenshtein = require('fast-levenshtein');
const fields=['Provider First Name','Provider Last Name (Legal Name)'];

function sortMyArrays(a,b) {
    return parseInt(a.distance) - parseInt(b.distance);
}
function cleanResults(results,searchValue){
  var arr1=[];
  var arr2=[];
  results.forEach(function(row){
    fields.forEach(function(field){
      if(row[field].toLowerCase().startsWith(searchValue)){
          var distance = levenshtein.get(searchValue, row[field], { useCollator: true});
          if(row.distance){
              if(row.distance>distance){
                  row.needed=row[field]+'  ('+field+')';
                  row.distance=distance;
              }
          }else{
            row.needed=row[field]+'  ('+field+')';
            row.distance=distance;
          }
       }
    });
    if(row.needed){ // it start with the search word
       arr1.push(row);
    }else {  // contains
      fields.forEach(function(field){
        if(row[field].toLowerCase().includes(searchValue)){
            var distance = levenshtein.get(searchValue, row[field], { useCollator: true});
            if(row.distance){
                if(row.distance>distance){
                    row.needed=row[field]+'  ('+field+')';
                    row.distance=distance;
                }
            }else{
              row.needed=row[field]+'  ('+field+')';
              row.distance=distance;
            }
         }
      });
       arr2.push(row);
    }
  });
  arr1=arr1.sort(sortMyArrays);
  arr2=arr2.sort(sortMyArrays);
  return arr1.concat(arr2);
}

module.exports = cleanResults;
