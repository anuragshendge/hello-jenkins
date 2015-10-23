var fs = require("fs");
var fileName = "securitygatetest.js";

//Implementing the Security gate feature so that it rejects the commits if there are any
//security tkens left hardocded in the file


fs.exists(fileName, function(exists) {
  if (exists) {
    fs.stat(fileName, function(error, stats) {
      fs.open(fileName, "r", function(error, fd) {
        var buffer = new Buffer(stats.size);

        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
          var data = buffer.toString("utf8", 0, buffer.length);

          //console.log(data);

       //   console.log(data.indexOf("token="));

        if(data.indexOf("token=")!=-1||data.indexOf("token:")!=-1)
          {
            
            var index=data.indexOf("token");
          
            if(data[index+6]=='"'&&data[index+7]!='"')
            {
            	//console.log("token");
            	console.log('Private token found. Security breach!! Rejecting the build') 
              process.exit(1);

            }
          }
          else
          {
            console.log("not found");
          }
          fs.close(fd);
        });
      });
    });
  }
});
