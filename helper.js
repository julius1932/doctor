const levenshtein = require('fast-levenshtein');
const fields=['Provider First Name','Provider Last Name (Legal Name)'];

function sortMyArrays(a,b) {
    return parseInt(a.distance) - parseInt(b.distance);
}
function cleanResults(results,searchValue,regxz){
  regxz = regxz.split(' ').join('|');
  regxz=new RegExp(searchValue+'|'+regxz)
  console.log(regxz);
  var arr1=[];// to holds start with
  var arr2=[];// to hold contains but not start with
  results.forEach(function(row){
    var drts=['dr','d.r','d.r.'];

    if(row['Provider Credential Text'] && isNaN(row['Provider Credential Text'])&&drts.includes(row['Provider Credential Text'].toLowerCase())){
         row['Provider Credential Text']= "M.D.";
    }
    fields.forEach(function(field){

      if(row[field] && row[field].toLowerCase().startsWith(searchValue)){
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
        //&& regxz.test(row[field].toLowerCase())
        if(row[field] ){
            //console.log('=============');
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
      if(row.needed){
      }else{
        row.needed=row['Provider First Name']+'<>'+row['Provider Last Name (Legal Name)']
      }
       arr2.push(row);
    }
  });
  arr1=arr1.sort(sortMyArrays);
  arr2=arr2.sort(sortMyArrays);
  return arr1.concat(arr2);
}
module.exports = cleanResults;
