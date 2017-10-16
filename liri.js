/*
Latest documetation of the twitter npm package is on github
[https://github.com/desmondmorris/node-twitter]
Fun tutorial on how to create at twitter bot
[https://www.youtube.com/watch?v=GQC2lJIAyzM]

twitter api doc on paths
[https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list]
client.get(path, params, callback);

How to create a twitter bot
[https://dzone.com/articles/how-to-use-twitter-api-using-nodejs]

http://www.tutorialsteacher.com/nodejs/nodejs-module-exports
https://github.com/RyanSy/LIRI/blob/master/liri.js
*/


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

//test to see if i can get the keys
//console.log(apiKey);

//twitter keys
var tweetKeys = apiKey.twitterKeys;

//spotify keys
var spotifyKeys = apiKey.spotifyKeys;

//test if I can see the keys
/*
console.log(tweetKeys);
console.log(sKeys);
*/
/*

var parameter = process.argv[3];
*/

var parmetersArgs = process.argv;
var commands = parmetersArgs[2];

//console.log(commands);

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
    //console.log(response);
     //console.log(JSON.stringify(tweets, null, 2));
     for(var i =0 ; i<tweets.length; i++){
     	console.log(JSON.stringify(tweets[i].text, null, 2));
     	console.log(JSON.stringify(tweets[i].created_at, null, 2));
     }

  }
});
}

}

function mySpotify(parmetersArr){
	//console.log(parmetersArr);

	if (commands === "spotify-this-song") {	

	//var parameter;
	var parameter="";
	for(var i =3; i<parmetersArr.length;i++){
		//parameter = parmetersArr[i] + "+";
		parameter = parameter + parmetersArr[i] + "+" ;
		console.log(parameter);

	}//end of for loop

	console.log("This is the url query " + parameter);
	
	var spotify = new Spotify(spotifyKeys);
     
	spotify.search({ type: 'track', query: parameter }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
 	 }
 	
 	//string the object that the callback recieves
	var myStr = JSON.stringify(data, null, 2); 

	//create a javascript object from the spotify data
	var myObj = JSON.parse(myStr);

	//console.log(myObj);

	//print out the number of track 'items' recieved by spotify
	//console.log(myObj.tracks.items.length);

	//grab the info from spotify tracks
	var spotifyTracks = myObj.tracks.items;
	console.log(spotifyTracks);
	var spotifyTracksLength= myObj.tracks.items.length;
	

	 for(var i =0 ; i<spotifyTracksLength; i++){
	 	console.log("working")
     	//console.log(JSON.stringify(data[i], null, 2));
     	//console.log(JSON.stringify(tweets[i].created_at, null, 2));
     }
	//var myData = JSON.parse(data);
	//var myData =JSON.stringify(data, null, 2);
	//console.log(myData.album);
	}); //end of spotify function loop
	
	}//end of command if statemnet
	

}

function movieMagic(parmetersArr){

	if (commands === "movie-this") {
	//console.log(parmetersArgs[3]);
	
	var parameter ="";
	if(parmetersArr[3] === undefined){
		parameter ="Mr.+Nobody";

 	 }else{
	
	for(var i =3; i<parmetersArr.length;i++){
		parameter = parameter + " "+ parmetersArr[i];
		console.log(parameter);
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
    	var ratingRotten = JSON.parse(body).Ratings[1].source;
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


    	/*

    	  * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie

		*/

  		}
	});
	}
}


myTweets();
mySpotify(parmetersArgs);
movieMagic(parmetersArgs);






if (commands === "do-what-it-says") {

	try {  
   	 	var textData = fs.readFileSync('random.txt', 'utf8');
    	console.log(textData);   
    	var dataArr = textData.split(",");
    	console.log(dataArr);
    	var innerCommands = dataArr[0];
    	/*
    	var str = '"a string"';
		str = str.replace(/^"|"$/g, '');
		*/
		
if (innerCommands === "spotify-this-song") {

    var spotify = new Spotify(spotifyKeys);
 
	spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
 	 }
 
	console.log(JSON.stringify(data, null, 2)); 
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



	} //end of try
	catch(e) {
    	console.log('Error:', e.stack);
	}

}







//get arguments from the user
//then execute this function



 /*`my-tweets`
   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

   * `spotify-this-song`
   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * `movie-this`
    * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

   * `do-what-it-says`
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.
     */