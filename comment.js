var fs = require("fs");
var fileName = "./app/sample.js";
var commentcount=0;
var normalcount=0;

fs.exists(fileName, function(exists) {
 	if (exists) {
    	fs.stat(fileName, function(error, stats) {
    	 	fs.open(fileName, "r", function(error, fd) {
    	    	var buffer = new Buffer(stats.size);

    	    	fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
    	     		var data = buffer.toString("utf8", 0, buffer.length);
    	      

    	      		var split=data.split('\n');
    	      
    	      		for(var i=0;i<split.length;i++)
    	      		{
    	      			if(split[i].indexOf('//')>-1)
    	      			{
    	      				commentcount++;
    	      			}
    	      			/*	else
    	      			{
    	      				normalcount++;
    	      			}*/
    	      		}
    	      		var temp;
    	      		for(var i=0;i<split.length;i++)
    	      		{
  		    			if(split[i].indexOf("/*")>-1)
    	      			{
    	      				//temp=1;

    	      				commentcount++;
    	      				if(split[i].indexOf("*/")==-1)
    	      				{
    	      					var j=i+1;
    	      					while(split[j].indexOf("*/")==-1)
    	      					{
    	      						commentcount++;
    	      						j++;
    	      					}
    	      					commentcount++;
    	      				}
    	      			}
    	      		}

    	     
    	     		normalcount=split.length-commentcount - 1;
    	     		var ratio=commentcount/split.length;

					console.log("Comment count: ", commentcount);
					console.log("Lines of code: ", normalcount);
					console.log("Number of lines in the file", split.length - 1);
					console.log("Ratio: ", ratio);
			
    	     
    	      		if(ratio < 0.1)
    	      		{
						console.log("Add more comments in the file for documentation.");
						console.log("Rejecting build.");
    	      			process.exit(1);
    	      		} else if (ratio >= 0.2) {
						console.log("Too many comments.");
						console.log("Rejecting build.");
						process.exit(1);
					}
    	      		fs.close(fd);;
    	    	});
    	  	});
    	});
	}
});
