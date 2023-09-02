'use strict';

const isNull = (value) => value === null;

const randomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEmpty = (arr) => arr.length === 0;

const copyArray = (target, source) => {
	for (let i = 0; i < source.length; i++){
		target.push(source[i]);
	}

	return target;
};

const isEqual = (obj1, obj2) => {
	const propsObj1 = Object.getOwnPropertyNames(obj1);
	const propsObj2 = Object.getOwnPropertyNames(obj2);

	if (propsObj1.length !== propsObj2.length) return false;

	for (let prop of propsObj1){
		const bothAreObjects = typeof(obj1[prop]) === "object" && typeof(obj2[prop]) === "object" && !isNull(obj1[prop]) && !isNull(obj2[prop]);

		if (
			(bothAreObjects && !isEqual(obj1[prop], obj2[prop])) ||
			(!bothAreObjects && obj1[prop] !== obj2[prop])
			) return false;
	}

	return true;
};

const countIf = (arr, callback) => {
	let counter = 0;

	for (let i = 0; i < arr.length; i++){
		if (callback(arr[i])) counter++;
	}

	return counter;
};

const matrixToArray = (mtr) => {
	let arr = [];

	for (let i = 0; i < mtr.length; i++){
		for (let j = 0; j < mtr[i].length; j++){
			arr.push(mtr[i][j]);
		}
	}

	return arr;
};

const getPropertyes = (arr, prop) => {
	let props = [];

	for (let i = 0; i < arr.length; i++){
		props.push(arr[i][prop]);
	}

	return props;
};

const fieldToString = (obj) => { // field, desigUnity, spliterLine, spliterCollum, line, collum, desigSizes: Array of 2 elem, spliterSizes, endSizes, indexCollum, indexLine
	let str = "";
	str += obj.desigSizes[0];
	str += obj.collum;
	str += obj.spliterSizes;
	str += obj.line;
	str += obj.desigSizes[1];
	str += obj.endSizes;

	for (let i = 0; i < obj.field.childNodes.length; i++){
		const tds = obj.field.childNodes[i].childNodes;
		for (let j = 0; j < tds.length; j++){
			if (i === obj.indexCollum && j === obj.indexLine) {
				str += obj.desigUnity;
			}

			str += tds[j].textContent + ((j + 1 < tds.length) ? obj.spliterLine : "");
		}
		str += obj.spliterCollum;
	}

	return str;
};