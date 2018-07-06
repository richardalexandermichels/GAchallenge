//Funtion to return OMDB info for specific movie imdbID
function getInfo(oid){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/info/'+oid, true);
    xhr.onload = function(){
        var infoContainer = document.getElementById('infoContainer');
        var movieTitle = document.getElementById('movieTitle');
        var infoList = document.getElementById('info');
        var posterContainer = document.getElementById('posterContainer');
        var movieInfo = JSON.parse(xhr.response);

        posterContainer.innerHTML = '';
        infoList.innerHTML = '';
        infoContainer.style.display = 'block';
        movieTitle.innerHTML = movieInfo.Title;
        for(var info in movieInfo){
            if(info != 'Title' && info != 'Poster' && info != 'Ratings'){
                var listElement = document.createElement('li');
                listElement.innerHTML = info + ": " + movieInfo[info];
                infoList.appendChild(listElement);
            }else if(info == 'Poster'){
                var poster = document.createElement("img");
                poster.setAttribute('src', movieInfo[info]);
                posterContainer.appendChild(poster);
            }
        }       
    };
    xhr.send(null);
}
//wait to run Javascript until document has finished loaded
document.addEventListener("DOMContentLoaded", function(event) {
    //instantiate some XML request objects to send asynchronous request to the back end
    var xhr = new XMLHttpRequest();
    var xhr2 = new XMLHttpRequest();
    var xhrGetFav = new XMLHttpRequest();
    var favs = {};
    //add on click event to submit button which sends input search string to omdb api
    document.getElementById("submit").onclick = function() {
        var movieTitle = document.getElementById('movieTitle');
        var infoList = document.getElementById('info');
        var posterContainer = document.getElementById('posterContainer');
        var results = document.getElementById('results');
        movieTitle.innerHTML = '';
        infoList.innerHTML = '';
        posterContainer.innerHTML = '';
        results.innerHTML = '';
        //open get request to hit favorites controller
        xhrGetFav.open('GET', '/favorites', true);
        //onload function fires once XML request has finished loading requested data
        xhrGetFav.onload = function() {
            favs = xhrGetFav.response;
            var term = document.getElementById('term').value.trim();
            xhr.open('POST', '/search', true);
            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            if (!!term) {
                xhr.send('term=' + term);
            }
        };
        //XML request send method initiates the call to the controller once request is set up.
        //pass null because this request has no parameters
        xhrGetFav.send(null);       
    };
    //on click defined for favorites button which will list favorites
    document.getElementById("favorite").onclick = function() {
        var movieTitle = document.getElementById('movieTitle');
        var infoList = document.getElementById('info');
        var posterContainer = document.getElementById('posterContainer');
        var results = document.getElementById('results');
        movieTitle.innerHTML = '';
        infoList.innerHTML = '';
        posterContainer.innerHTML = '';
        results.innerHTML = '';
        //XML request retrieves object representing saved favorites and then displays them on the page via html element appending
        xhrGetFav.open('GET', '/favorites', true);
        xhrGetFav.onload = function() {
            favs = xhrGetFav.response;
            if(typeof favs == 'string'){  
                favs = JSON.parse(favs);
            }
            for(fav in favs){
                var listElement = document.createElement('li');
                var linkHtml = '<a href="#" onclick=getInfo("'
                linkHtml = linkHtml.concat(fav);
                linkHtml = linkHtml.concat('")>');
                linkHtml = linkHtml.concat(favs[fav]);
                linkHtml = linkHtml.concat('</a>');
                listElement.innerHTML = linkHtml
                results.appendChild(listElement);
        }
        };
        xhrGetFav.send(null); 
    }
    //XML post request onreadystatechange detects the state of the request
    xhr.onreadystatechange = function() {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState == DONE) {
            console.log("DONE");
            if (xhr.status == OK) {
                
                var results = document.getElementById('results');
                results.innerHTML = '';
                //XML request once state is DONE and OK retrieve response body which contains data for search term from omdbapi
                var responseObj = JSON.parse(xhr.response);
                if(typeof favs == 'string'){  
                    favs = JSON.parse(favs);
                }
                //loop over retrieveed information appending films to list on index.html
                for (var i = 0; i < responseObj.Search.length; i++) {
                    var listElement = document.createElement('li');
                    var buttonText = 'add to favorites';
                    var disabled = ''
                    if(!!favs[responseObj.Search[i].imdbID]){
                        buttonText = 'added'
                        disabled = 'disabled';
                    }
                    var linkHtml = '<a href="#" onclick=getInfo("'
                    linkHtml = linkHtml.concat(responseObj.Search[i].imdbID);
                    linkHtml = linkHtml.concat('")>');
                    linkHtml = linkHtml.concat(responseObj.Search[i].Title);
                    linkHtml = linkHtml.concat('</a>');
                    listElement.innerHTML = linkHtml + ' <input value="'+buttonText+'" name="' + responseObj.Search[i].Title + "|" + responseObj.Search[i].imdbID + '" type="button" class="favorites" '+disabled+'/>';
                    results.appendChild(listElement);
                }
                var favorites = document.getElementsByClassName("favorites");
                //add onclick event for each button to send post request to favorite desired movie
                for (var idx = 0; idx < favorites.length; idx++) {
                    favorites[idx].onclick = function() {
                        var self = this;
                        var fav = self.name.split("|");
                        xhr2.open('POST', '/favorites', true);
                        //Send the proper header information along with the request
                        xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        if (!!term) {
                            xhr2.send("name=" + fav[0] + "&oid=" + fav[1]);
                        }
                        xhr2.onreadystatechange = function() {
                            if (xhr.readyState == DONE) {
                                if (xhr.status == OK) { 
                                    self.disabled = true;
                                    self.value = 'added';
                                }
                            }
                        }
                    };
                }

            } else {
                console.log("ERROR: " + xhr.status);
            }
        }
    };
});