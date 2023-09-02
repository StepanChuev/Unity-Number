'use strict';

class Field{
	constructor(table, collum, line, writeInTdFn = () => " "){
		this.table = table;
		this.collum = collum;
		this.line = line;
		this.writeInTdFn = writeInTdFn;
		this.field = [];
		this.resultMathActions;
		this.changedBgColor = [];
		this.posUnityLine;
		this.posUnityCollum;
	}

	writeFieldInTable(){
		for (let i = 0; i < this.collum; i++){
			let writeInTdArr = [];
			let tr = document.createElement('tr');
			tr.id = `tr-${i}`;
	
			for (let j = 0; j < this.line; j++){
				let td = document.createElement('td');
				td.id = `td-${j}`;
				let writeInTd = this.writeInTdFn();
				writeInTdArr.push(writeInTd);
				td.textContent = writeInTd;
				tr.appendChild(td);
			}
			this.field.push(writeInTdArr);
			this.table.appendChild(tr);
		}
	}

	setUnity(fn = () => {}){
		let {posUnityLine: unityLine, posUnityCollum: unityCollum} = this;

		if (this.posUnityCollum !== undefined){
			this.field[unityCollum][unityLine] = this.field[unityCollum][unityLine].value;
		}

		unityLine = randomInt(0, this.line - 1);
		unityCollum = randomInt(0, this.collum - 1)

		this.posUnityCollum = unityCollum;
		this.posUnityLine = unityLine;
		this.field[unityCollum][unityLine] = {
			value: this.field[unityCollum][unityLine],
			isUnity: true
		};

		fn(unityCollum, unityLine);
	}

	mathActions(operation, operands){
		if (isEmpty(operands)) return;

		this.resultMathActions = operands[0];

		const operations = {
			"+": () => {
				for (let i = 1; i < operands.length; i++){
					this.resultMathActions += operands[i];
				}
			},
			"-": () => {
				for (let i = 1; i < operands.length; i++){
					this.resultMathActions -= operands[i];
				}
			},
			"*": () => {
				for (let i = 1; i < operands.length; i++){
					this.resultMathActions *= operands[i];
				}
			},
			"/": () => {
				for (let i = 1; i < operands.length; i++){
					this.resultMathActions /= operands[i];
				}
			}
		};

		if (!operations.hasOwnProperty(operation)) {
			throw new TypeError(`operations has not property \"${operation}\".\navailable operations: ${Object.keys(operations)}`);
		}

		operations[operation]();

		return this.resultMathActions;
	}

	changeBgColorOfSelector(selector, bgColor){
		this.changedBgColor.push(selector);
		selector.style.backgroundColor = bgColor;
	}

	changeBgColorOfSelectorAll(selectors, bgColor){
		for (let selector of selectors){
			this.changeBgColorOfSelector(selector, bgColor);
		}
	}

	changeBgColorOfChangedAll(bgColor){
		if (isEmpty(this.changedBgColor)) return;
		
		for (let i = 0; i < this.changedBgColor.length; i++){
			this.changedBgColor[i].style.backgroundColor = bgColor;
		}

		this.changedBgColor.length = 0;
	}

	isChangedBgColor(selector){
		for (let i = 0; i < this.changedBgColor.length; i++){
			if (
				this.changedBgColor[i].id === selector.id && 
				this.changedBgColor[i].parentElement.id === selector.parentElement.id
				) return true;
		}

		return false;
	}

	isWin(){
		let tr = this.table.childNodes;

		for (let i = 0; i < tr.length; i++){
			for (let j = 0; j < tr[i].childNodes.length; j++){
				if (+tr[i].childNodes[j].textContent !== this.field[this.posUnityCollum][this.posUnityLine].value){
					return false;
				}
			}
		}

		return true;
	}

	isUnity(selector){
		return (
			selector.id === `td-${this.posUnityLine}` &&
			selector.parentElement.id === `tr-${this.posUnityCollum}`
		);
	}
}