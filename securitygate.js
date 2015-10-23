var fs = require("fs");
var fileName = "securitygatetest.js";

fs.exists(fileName, function(exists) {
  if (exists) {
    fs.stat(fileName, function(error, stats) {
      fs.open(fileName, "r", function(error, fd) {
        var buffer = new Buffer(stats.size);

        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
          var data = buffer.toString("utf8", 0, buffer.length);



        if(data.indexOf("accessKeyId:")!=-1||data.indexOf("secretAccessKey:")!=-1)
          {

            
            var index=data.indexOf("accessKeyId:");
            var index1=data.indexOf("secretAccessKey:");
          //  console.log(data[index+13]);
          
            if((data[index+13]=="'"&&data[index+14]!="'")||(data[index1+17]=="'"&&data[index1+18]!="'"))
            {
            	console.log("token");
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