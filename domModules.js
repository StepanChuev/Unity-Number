'use strict';

const $ = (selector) => document.querySelector(selector);

const deligate = (selector, innerSelector, eventName, successfully, unsuccessfully = () => {}) => {
	selector.addEventListener(eventName, (event) => {
		if (event.target.tagName === innerSelector){
			successfully(event);
		}
		else {
			unsuccessfully(event);
		}
	});
};

class TableHTML {
	#textInCells = [];
	#table;

	constructor(line, collum, parentElement){
		this.line = line;
		this.collum = collum;
		this.parentElement = parentElement;
		this.#textInCells = new Array(line);
	}

	generate(){
		this.#table = document.createElement('table');

		for (let i = 0; i < this.line; i++){
			const tr = document.createElement('tr');

			for (let j = 0; j < this.collum; j++){
				const td = document.createElement('td');
				td.textContent = "JavaScript";
				tr.appendChild(td);
			}

			this.#table.appendChild(tr);
		}

		this.parentElement.appendChild(this.#table);
	}

	setTableProperty(property, newValue){
		this.#table[property] = newValue;

		return this.#table[property];
	}

	setTableProperties(properties, values){
		for (let i = 0; i < properties.length; i++){
			const property = properties[i];
			this.#table[property] = values[i];
		}

		return this;
	}

	getTableProperty(property){
		return this.#table[property];
	}

	getTable(){
		return this.#table;
	}
};