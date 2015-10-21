var fs = require('fs');
var esprima = require('esprima');

var addNumbers = function(base) {
	
	var sum = 0;
	for (var i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] === 'number') {
			sum += arguments[i];
		} else {
			return undefined;
		}
	}
	

	return sum;
};

var divideNumbers = function(base) {
	if (arguments.length > 2) {
		return 0;
	} else if (arguments.length == 2) {
		if (arguments[0] > arguments[1]) {
			return arguments[0]/arguments[1];
		} else if (arguments[0] < arguments[1]) {
			return arguments[1]/arguments[0];
		} else if (arguments[0] === arguments[1]) {
			return 1;
		}
	} else {
		return undefined;
	}
};

var compareNumbers = function(base) {
	if (arguments.length < 2) {
		return -2;
	}
	if (arguments.length == 2) {
		if (arguments[0] > arguments[1]) {
			return -1;
		} else if (arguments[1] > arguments[0]) {
			return 1;
		} else {
			return 0;
		}
	} else {
		return 2;
	}
};

function main () {
	var first = 34;
	var second = 45;
	var third = 56;
	var fourth = 67;

	var answer = addNumbers(first, second, third,fourth);
	//var answer = divideNumbers(23,45);
	console.log(answer);
}

//main();

exports.addNumbers = addNumbers;
exports.divideNumbers = divideNumbers;
exports.compareNumbers = compareNumbers;
