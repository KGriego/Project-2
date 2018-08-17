$.ajax({
    url: "http://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=ford+fiesta",
    method: "GET"
 
 }).then(function(response){
    var json = response;
    console.log(json);
    //var imageUrl = json.splice(json.indexOf(">"));
    console.log(xmlToJson(json));
 });
 
 