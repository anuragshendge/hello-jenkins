var fs = require("fs");
var fileName = "commenttest.js";
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

         
         normalcount=split.length-commentcount;
         var ratio=commentcount/normalcount;
         
          if(ratio<0.1||ratio>0.5)
          {
          	
          	process.exit(1);
          }
          fs.close(fd);;
        });
      });
    });
  }
});
