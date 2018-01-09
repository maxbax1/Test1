'use strict';

let firstNumber = randomInRange(6, 9);
let secondNumber = randomInRange(11, 14) - firstNumber;
let sumNumbers = firstNumber + secondNumber;
let body = document.body;

function randomInRange(min, max) { // Получить случайной число из диапазона;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Выражение
let expression = document.createElement('div');
expression.classList.add('expression');
expression.innerHTML = `
	<span class="first-number">${firstNumber}</span> + <span class="second-number">${secondNumber}</span> <span class="equally-span"> = </span> <span class="amount">?</span>
`;

let expressionFirstNumber = expression.querySelector('.first-number');
let expressionSecondNumber = expression.querySelector('.second-number');
let equallySpan = expression.querySelector('.equally-span');
let amount = expression.querySelector('.amount');

body.insertAdjacentElement('afterBegin', expression);

//Canvas
let convCont = body.querySelector('.cnvs-container');
let canvas = document.querySelector('.cnvs');
let ctx = canvas.getContext('2d');

let rule = body.querySelector('.rule');
let cm = 41.2;


let centerFirstArc = (cm * firstNumber) / 2; //координаты центра первой дуги
let bendFirstArc = -70; // Изгиб первой дуги
let endFirstArc = cm * firstNumber; // Координаты конца первой дуги

let centerSecondArc = ((cm * firstNumber) + ((cm * firstNumber) + (cm * secondNumber))) / 2; //Координаты центра второй дуги
let bendSecondArc = -70 / 2; //Изгиб второй дуги
let endSecondArc = (cm * secondNumber) + (cm * firstNumber); // Координаты конца второй дуги


(function createFirstArc() { //Рисуем первую дугу
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'red';
	ctx.moveTo(0, 85); //левый нижний угол canvas
	ctx.quadraticCurveTo(centerFirstArc, bendFirstArc, endFirstArc, 85);
	ctx.stroke();

	ctx.beginPath(); // Рисуем стрелку первой дуге
	ctx.moveTo(endFirstArc, 85);
	ctx.lineTo(endFirstArc - 15, 80);
	ctx.moveTo(endFirstArc, 85);
	ctx.lineTo(endFirstArc - 2, 72);
	ctx.stroke();
})();

function createSecondArc() { //Рисуем вторую дугу
	ctx.beginPath();
	ctx.moveTo(endFirstArc, 85);
	ctx.quadraticCurveTo(centerSecondArc, bendSecondArc, endSecondArc, 85);
	ctx.stroke();

	ctx.beginPath(); // Рисуем стрелку второй дуге
	ctx.moveTo(endSecondArc, 85);
	ctx.lineTo(endSecondArc - 15, 80);
	ctx.moveTo(endSecondArc, 85);
	ctx.lineTo(endSecondArc - 2, 73);
	ctx.stroke();
};

//Inputs
let firstNumberInput = document.createElement('input');
firstNumberInput.setAttribute("type", "text");
firstNumberInput.setAttribute("maxlength", "1");
firstNumberInput.classList.add('number-input');
convCont.append(firstNumberInput);
firstNumberInput.style.left = ((centerFirstArc - firstNumberInput.clientWidth/2) + 'px');
firstNumberInput.style.top = (bendFirstArc + 'px'); //Расположение первого input над дугой

let secondNumberInput = document.createElement('input');

let equallyInput = document.createElement('input');
equallyInput.setAttribute("type", "text");
equallyInput.setAttribute("maxlength", "2");
equallyInput.classList.add('equallyInput');

function checkValue(inputValue, spanValue, span) { // Проверка значения input
	if (inputValue.value != spanValue) {
		inputValue.classList.add('input--error');
		span.classList.add('span---error');
	} else {
		inputValue.disabled = true;
		inputValue.classList.remove('input--error');
		span.classList.remove('span---error');
		appendInputValue();
	};

	if (firstNumberInput.disabled === true && secondNumberInput.disabled === true) {
		amount.after(equallyInput); //выводим input суммы.
		amount.remove();
	};

};

function appendInputValue() { // Проверка оставшихся input
	let inputs = document.querySelectorAll('input');
	for (let input of inputs) {

		if (!input.disabled) {
			return;
		} else if (input.disabled) {
			secondNumberInput.setAttribute("type", "text");
			secondNumberInput.setAttribute("maxlength", "1");
			secondNumberInput.classList.add('number-input');
			convCont.append(secondNumberInput);
			secondNumberInput.style.left = ((centerSecondArc - secondNumberInput.clientWidth) + 'px');
			secondNumberInput.style.top = (bendFirstArc / 1.5 + 'px'); //Расположение второго input над дугой
			createSecondArc(); // Рисуем дугу
		}
	};
};

function checkSumNumbers() { // Проверка input с суммой
	if (equallyInput.value === String(sumNumbers)) {
		equallyInput.disabled = true;
		equallyInput.classList.remove('input--error');
	} else {
		equallyInput.classList.add('input--error');
	}
};

firstNumberInput.oninput = () => checkValue(firstNumberInput, firstNumber, expressionFirstNumber);
secondNumberInput.oninput = () => checkValue(secondNumberInput, secondNumber, expressionSecondNumber);
equallyInput.oninput = checkSumNumbers;