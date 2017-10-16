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
var commands = process.argv[2];
var parameter = process.argv[3];

function myTweets(){
	  //create a twitter client to authenicate my twitter account
var client = new Twitter(tweetKeys);

//the person whose tweets you want to search
var params = {screen_name: 'AmazingSpeciali'};

//get the tweets from the user timeline
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
    //console.log(response);
     console.log(JSON.stringify(tweets, null, 2));

  }
});

}


if (commands === "my-tweets") {
	myTweets();
}


if (commands === "spotify-this-song") {
	console.log(parameter)
	var spotify = new Spotify(spotifyKeys);
 
	spotify.search({ type: 'track', query: parameter }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
 	 }
 
	console.log(JSON.stringify(data, null, 2)); 
	});

}


if (commands === "movie-this") {
	console.log(parameter)
	// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t="+parameter+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});

}


if (commands === "do-what-it-says") {

	try {  
   	 	var data = fs.readFileSync('random.txt', 'utf8');
    	//console.log(data);   
    	var dataArr = data.split(",");
    	console.log(dataArr);

    var spotify = new Spotify(spotifyKeys);
 
	spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
 	 }
 
	console.log(JSON.stringify(data, null, 2)); 
	});

	} catch(e) {
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