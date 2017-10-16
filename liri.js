//load the twitter package
var Twitter = require('twitter');

//load the spotify package
var Spotify = require('node-spotify-api');

//load the require package
var request = require("request");

//load the require package
var fs = require("fs");

//get the twitter authorization keys from keys.js
var apiKey = require('./keys.js'); 

//twitter keys
var tweetKeys = apiKey.twitterKeys;

//spotify keys
var spotifyKeys = apiKey.spotifyKeys;

//grab all the arguments for this node program
var parmetersArgs = process.argv;

//whatever function the user wants to invoke
var commands = parmetersArgs[2];


//twitter function
//grabs the 20 latest tweets from user account and the date/time
function myTweets(){
	if (commands === "my-tweets") {
	
	//create a twitter client to authenicate my twitter account
	var client = new Twitter(tweetKeys);

	//the person whose tweets you want to search
	var params = {screen_name: 'AmazingSpeciali'};

	//get the tweets from the user timeline
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    //console.log(tweets);
     for(var i =0 ; i<tweets.length; i++){
     	console.log(JSON.stringify(tweets[i].text, null, 2));
     	console.log(JSON.stringify(tweets[i].created_at, null, 2));
     }//end of for loop

  	}//end of if error statemnt
	});//end of get ajax call to twitter api
 
 }//end of entire if command

}//end of function

function mySpotify(parmetersArr){

	//if the command is spotify this song do the rest of this function
	if (commands === "spotify-this-song") {	

	//parameter that will be used for the search query
	var parameter="";

	//variable that holds the user song
	var songName="";

	//loop through parameters array starting where the user will write in their song query
	for(var i =3; i<parmetersArr.length;i++){
		
		//creates a parameter for the query string.
		//spaces are represented by plus signs
		parameter = parameter + parmetersArr[i] + "+" ;

		console.log(parameter);
		songName = songName + " " + parmetersArr[i];

	}//end of for loop

	//console.log("This is the url query " + parameter);
	
	var spotify = new Spotify(spotifyKeys);
     
	spotify.search({ type: 'track', query: parameter }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
 	 }
 	
 	//string the object that the callback recieves
	var myStr = JSON.stringify(data, null, 2); 
	
	
	//create a javascript object from the spotify data
	var myObj = JSON.parse(myStr);

	//grab the info from spotify tracks
	var spotifyTracks = myObj.tracks.items;
	
	//the length of the spotifyTracks object
	var spotifyTracksLength= myObj.tracks.items.length;
	
	//loop through all the tracks and get the value of their properties
	 for(var i =0 ; i<spotifyTracksLength; i++){

	 	console.log("Artist Name: " + spotifyTracks[i].album.artists[0].name);
	 	console.log("\n");
	 	console.log("Song Name:" + songName);
	 	console.log("Name of Album: " + spotifyTracks[i].album.name);
	    console.log("\n");
	 	console.log("Spotify preview url " + spotifyTracks[i].album.external_urls.spotify);
	 	console.log("\n");
     }//end of spotify loop
	
	}); //end of spotify function 
	
	}//end of command if statemnet
	

}

function movieMagic(parmetersArr){

	if (commands === "movie-this") {
	
	var parameter ="";
	if(parmetersArr[3] === undefined){
		parameter ="Mr. Nobody";

 	 }else{
	
	//construct movie parameter for the query string
	for(var i =3; i<parmetersArr.length;i++){
		parameter = parameter + " "+ parmetersArr[i];
		//console.log(parameter);
		}
	}

	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t="+parameter+"&y=&plot=short&apikey=40e9cece", 
	function(error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
  		if (!error && response.statusCode === 200) {

    	// Parse the body of the site and recover just the imdbRating
    	// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    	var title = JSON.parse(body).Title;
    	var year = JSON.parse(body).Year;
    	var ratingIMBD = JSON.parse(body).imdbRating;
    	var ratingRotten = JSON.parse(body).Ratings[1].Value;
       	var country = JSON.parse(body).Country;
    	var lang = JSON.parse(body).Language;
    	var moviePlot = JSON.parse(body).Plot;
    	var movieActors = JSON.parse(body).Actors;

    	console.log("Title of the movie is: " + title);
    	console.log("Year the movie came out is: " + year);
    	console.log("IMDB Rating of the movie is: " + ratingIMBD);
    	console.log("Rotten Tomatoes Rating of the movie is: " + ratingRotten);
    	console.log("Country where the movie was produced is: " + country);
    	console.log("Language of the movie is: " + lang);
    	console.log("Plot of the movie is: " + moviePlot);
    	console.log("Actors in the movie is: " + movieActors);

  		}
	});
	}//end of movie if

}//end of function


if (commands === "do-what-it-says") {

	try {  

		//read in the file
   	 	var textData = fs.readFileSync('random.txt', 'utf8');
    	  
    	//create an array of the first line of random.txt
    	var dataArr = textData.split(",");
    	
    	//get the command 
    	var innerCommands = dataArr[0];

  

	
if (innerCommands === "spotify-this-song") {

    var spotify = new Spotify(spotifyKeys);
 
	spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
 	 }
 
	//console.log(JSON.stringify(data, null, 2)); 

	//parameter that will be used for the search query
	var parameter="";

	//variable that holds the user song
	var songName="";


	//string the object that the callback recieves
	var myStr = JSON.stringify(data, null, 2); 
	//console.log(myStr);
	
	//create a javascript object from the spotify data
	var myObj = JSON.parse(myStr);

	//grab the info from spotify tracks
	var spotifyTracks = myObj.tracks.items;
	
	//the length of the spotifyTracks object
	var spotifyTracksLength= myObj.tracks.items.length;
	
	//loop through all the tracks and get the value of their properties
	 for(var i =0 ; i<spotifyTracksLength; i++){

	 	console.log("Artist Name: " + spotifyTracks[i].album.artists[0].name);
	 	console.log("\n");
	 	console.log("Song Name:" + songName);
	 	console.log("Name of Album: " + spotifyTracks[i].album.name);
	    console.log("\n");
	 	console.log("Spotify preview url " + spotifyTracks[i].album.external_urls.spotify);
	 	console.log("\n");
     }//end of spotify loop
	});

	}//end of spotify
	


	if (commands === "movie-this") {
	
	var parameter =dataArr[1]
	if(parameter === undefined){
		parameter ="Mr.+Nobody";

 	 }

		// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t="+parameter+"&y=&plot=short&apikey=40e9cece", 
	function(error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
  		if (!error && response.statusCode === 200) {

    	// Parse the body of the site and recover just the imdbRating
    	// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    	console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  		}
	});
	}//end of movie

	myTweets();
	

	} //end of try
	catch(e) {
    	console.log('Error:', e.stack);
	}//end of catch

}

myTweets();
mySpotify(parmetersArgs);
movieMagic(parmetersArgs);




