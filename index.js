'use strict';

const field = $('.field');
const statistic = $('.statistic');
const saveField = $('.save-field');
const collum = +prompt("Ячеек в колонке таблицы", +localStorage.getItem("collum") || 3);
const line = +prompt("Ячеек в строке таблицы", +localStorage.getItem("line") || 3);
const gameField = new Field(field, collum, line, () => randomInt(2, collum * line));
const colors = ['#DEB887', '#808080'];
// let saveDB = indexedDB.open("save", 1);

localStorage.setItem("collum", collum);
localStorage.setItem("line", line);

if (!localStorage.getItem("amountSave")) {
	localStorage.setItem("amountSave", 0);
}

gameField.writeFieldInTable();

let unityNum, unityLine, unityCollum;

gameField.setUnity((collumUnity, lineUnity) => {
	const unityInfo = $(`#tr-${collumUnity}`).querySelector(`#td-${lineUnity}`);
	unityCollum = collumUnity;
	unityLine = lineUnity;
	unityInfo.style.textDecoration = "underline";
	unityInfo.style.fontStyle = "italic";
	unityNum = +unityInfo.textContent;
	console.log(collumUnity, lineUnity);
});

let counter = 0;
const maxCounter = 2;
let operandsInfo = []; // selectors operands
let operands = []; // number text content operands

deligate(field, 'TD', 'click', (event) => {
	if (gameField.isUnity(event.target)) return alert("Не трожь единое число!!!");
	if (gameField.isChangedBgColor(event.target) && operands.length < maxCounter) return;

	if (counter >= maxCounter){
		gameField.changeBgColorOfChangedAll('#fff');
		counter = 0;
		operandsInfo.length = 0;
		operands.length = 0;
	}

	gameField.changeBgColorOfSelector(event.target, colors[counter]);
	operandsInfo.push(event.target);
	operands.push(+event.target.textContent);
	counter++;
});

let turns = 0;
let scores = collum * line;

statistic.innerHTML = `Ходов: ${turns}<br>Очков: ${scores}`;

window.addEventListener('keypress', (event) => {
	if (operands.length < maxCounter) return;

	gameField.mathActions(event.key, operands);
	turns++;
	operandsInfo[0].textContent = gameField.resultMathActions;
	operands[0] = gameField.resultMathActions;

	if (operands[0] === unityNum) {
		scores++;
	}
	else {
		scores--;
	}

	statistic.innerHTML = `Ходов: ${turns}<br>Очков: ${scores}`;
	if (gameField.isWin()) {
		alert("Ура, ты выиграл!");
		if (confirm("Начать заново")) window.location.reload();
	}
});

// discolor painted

field.oncontextmenu = (event) => {
	gameField.changeBgColorOfChangedAll('#fff');
	counter = 0;
	operandsInfo.length = 0;
	operands.length = 0;
	
	return false;
};

// save field

saveField.addEventListener('click', () => {
	const amountSave = +localStorage.getItem("amountSave");
	localStorage.setItem("save-" + amountSave, fieldToString({
		field,
    	spliterCollum: ";",
    	spliterLine: " ",
    	desigUnity: "*",
    	indexCollum: unityCollum,
    	indexLine: unityLine,
    	line,
    	collum,
    	desigSizes: ["(", ")"],
    	spliterSizes: " ",
    	endSizes: ""
	}));

	localStorage.setItem("amountSave", amountSave + 1);

	console.log("saved");
});