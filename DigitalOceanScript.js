var needle = require("needle");
var os   = require("os");

var config = {


	config.token = "";

};

var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};

// Documentation for needle:
// https://github.com/tomas/needle

var client =
{
	listRegions: function( onResponse )
	{
		needle.get("https://api.digitalocean.com/v2/regions", {headers:headers}, onResponse);
	},
	listImages:function(onResponse){
		needle.get("https://api.digitalocean.com/v2/images", {headers:headers}, onResponse);
	},

	createDroplet: function (dropletName, region, imageName, onResponse)
	{
		var data = 
		{
			"name": dropletName,
			"region":region,
			"size":"512mb",
			"image":imageName,
			// Id to ssh_key already associated with account.
			"ssh_keys":[625870],
			//"ssh_keys":null,
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};

		console.log("Attempting to create: "+ JSON.stringify(data) );
		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );

	},

	listDroplet: function(onResponse){
		 needle.get("https://api.digitalocean.com/v2/droplets/6902114", {headers:headers}, onResponse);
	},

	deleteDroplet:function(onResponse){
		needle.delete("https://api.digitalocean.com/v2/droplets/6902114",null,{headers:headers}, onResponse);
	}

};

// #############################################
// #1 Print out a list of available regions
// Comment out when completed.
// https://developers.digitalocean.com/#list-all-regions
// use 'slug' property
/*client.listRegions(function(error, response)
{
	var data = response.body;
	//console.log( JSON.stringify(response.body) );

 if( response.headers )
	{
		console.log( "Calls remaining", response.headers["ratelimit-remaining"] );
	}


//	console.log(data);
	if( data.regions )
	{
		
		for(var i=0; i<data.regions.length; i++)
		{
//			console.log(data.regions[i].slug)
		
		}
}	

});
*/

// #############################################
// #2 Extend the client object to have a listImages method
// Comment out when completed.
// https://developers.digitalocean.com/#images
// - Print out a list of available system images, that are AVAILABLE in a specified region.
// - use 'slug' property
/*client.listImages(function(error,response){

	var data = response.body;
	for(var i=0; i<data.images.length;i++){
		for(var j=0;j<data.images[i].regions.length;j++){


		// specify the city for which slugs are to be retrieved 
				

			if('ams1' === data.images[i].regions[j]){
				console.log(data.images[i].slug);
				break;
			}	

		}
	}	
	
});

*/
// #############################################
// #3 Create an droplet with the specified name, region, and image
// Comment out when completed. ONLY RUN ONCE!!!!!
// Write down/copy droplet id.



/* var name = "ashendg"+ os.hostname();
 var region = "nyc1"; // Fill one in from #1
 var image = "ubuntu-14-04-x32"; // Fill one in from #2
 client.createDroplet(name, region, image, function(err, resp, body)
 {
 	console.log(body);
	// StatusCode 202 - Means server accepted request.
 	if(!err && resp.statusCode == 202)
 	{
 		console.log(JSON.stringify( body, null, 3 ) );
 	}
 });
*/





// #############################################
// #4 Extend the client to retrieve information about a specified droplet.
// Comment out when done.
// https://developers.digitalocean.com/#retrieve-an-existing-droplet-by-id
// REMEMBER POST != GET
// Most importantly, print out IP address!

/*
client.listDroplet(function(error,response){
			var data = response.body;

				console.log(data.droplet.networks.v4);
});
*/


// #############################################
// #5 In the command line, ping your server, make sure it is alive!
// ping xx.xx.xx.xx


// #############################################
// #6 Extend the client to DESTROY the specified droplet.
// Comment out when done.
// https://developers.digitalocean.com/#delete-a-droplet
// HINT, use the DELETE verb.
// HINT #2, needle.delete(url, data, options, callback), data needs passed as null.
// No response body will be sent back, but the response code will indicate success.
// Specifically, the response code will be a 204, which means that the action was successful with no returned body data.

/*client.deleteDroplet(function(err,resp){

 	if(!err && resp.statusCode == 204)
 	{
			console.log("Deleted!");
 	}

 });
*/
// #############################################
// #7 In the command line, ping your server, make sure it is dead!
// ping xx.xx.xx.xx
// It could be possible that digitalocean reallocated your IP address to another server, so don't fret it is still pinging.
