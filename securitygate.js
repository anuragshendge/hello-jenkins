var fs = require("fs");
var readdirp = require('readdirp');
var fileCounter=0;

var fileNameArray = [];

readdirp({ root: '.', fileFilter: '*.js*',directoryFilter:['!node_modules']})
  .on('data', function (entry) {
  
   var fileName =entry.path;
   

fs.exists(fileName, function(exists) {
  if (exists) {
    fs.stat(fileName, function(error, stats) {
      fs.open(fileName, "r", function(error, fd) {
        var buffer = new Buffer(stats.size);

        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
        var data = buffer.toString("utf8", 0, buffer.length);

 

        if(data.indexOf("accessKeyId:")!=-1||data.indexOf("secretAccessKey:")!=-1 || data.indexOf("token =")!=-1)
          {

            
            var index=data.indexOf("accessKeyId:");
            var index1=data.indexOf("secretAccessKey:");
            var index2=data.indexOf("token =");
          //  console.log(data[index+13]);
          
            if((data[index+13]=="'"&&data[index+14]!="'")||(data[index1+17]=="'"&&data[index1+18]!="'") || (data[index2 + 8] == '"' && data[index2 + 9] != '"'))
            {
              console.log('Private token found in file: " '+ entry.name +' " Security breach!! Rejecting the commit') 
                process.exit(1);

            }
          }
          else
          {
  //          console.log("not found");
          }
          fs.close(fd);
        });
      });
    });
  }
});













});











/*



//Implementing the Security gate feature so that it rejects the commits if there are any
//security tkens left hardocded in the file


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
*/