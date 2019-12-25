'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Typo = {};
Typo.pluralize = function (wordsSet) {
	if (arguments.length < 1) throw new Error('The parameter is missed');
	if (!Array.isArray(wordsSet)) throw new Error('The parameter is not an array');
	if (wordsSet.length !== 3) throw new Error('Length of the parameter is not equal to 3');
	wordsSet.forEach(function (element, i) {
		var type = typeof element === 'undefined' ? 'undefined' : _typeof(element);
		if (type !== 'string') throw new Error('The parameter contains non-string elements');
		if (element.length === 0) throw new Error('The parameter contains empty strings');
	});

	return function (numberParam) {
		if (arguments.length < 1) throw new Error('The number is missed');
		if (!Number.isInteger(numberParam)) throw new Error('The number is not integer');

		var number = Math.abs(numberParam);
		var remainder10 = number % 10;
		var remainder100 = number % 100;

		var word1 = wordsSet[0];
		var word3 = wordsSet[1];
		var word9 = wordsSet[2];

		var word = word9;

		if (remainder100 < 10 || remainder100 > 20) {
			if (remainder10 == 1) word = word1;
			if (remainder10 > 1 && remainder10 < 5) word = word3;
		}

		return word;
	};
};

if (typeof module === 'undefined') {
	if (typeof window !== 'undefined') window.Typo = Typo;
} else {
	module.exports = Typo;
}