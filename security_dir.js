var fs = require('fs');
var readdirp = require('readdirp');


readdirp({ root: '.', fileFilter: '*.pem' ,directoryFilter:['!node_modules']})
  .on('data', function (entry) {
  		
  	console.log('\nA private key file is present in your project. Commit ABORTED!!');
  	
  	console.log('\nFILE INFORMATION:\nFile name: ' + entry.name + '\nFile relative path: ' + entry.path + '\n');
	console.log('Use caution while commiting Private key file(s)!!');

  	process.exit(1);

  });

readdirp({ root: '.', fileFilter: '\.*id_rsa',directoryFilter:['!node_modules']})
  .on('data', function (entry) {

  	console.log('\nAn "ID_RSA" file is present in your project. Commit ABORTED!!');
  	
  	console.log('\nFILE INFORMATION:\n File name: ' + entry.name + '\nFile relative path: ' + entry.path + '\n');
  	console.log('Use caution while commiting Private key file(s)!!');
  	process.exit(1);

  });


readdirp({ root: '.', fileFilter: 'id_rsa',directoryFilter:['!node_modules']})
  .on('data', function (entry) {

  	console.log('\nAn "ID_RSA" file is present in your project. Commit ABORTED!!');
  	
  	console.log('\nFILE INFORMATION:\nFile name: ' + entry.name + '\nFile relative path: ' + entry.path + '\n');
  	console.log('Use caution while commiting Private key file(s)!!');
  	process.exit(1);

  });