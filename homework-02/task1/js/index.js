'use strict'

let input;
const numbers = [];
let total = 0;
let numberInput;

do {
  input = prompt('Введите число');
  numberInput = Number(input);
  if(Number.isNaN(numberInput)) {
    alert('Было введено не число, попробуйте еще раз');
  } else {
    numbers.push(Number(input));
  }
} while(input !== null)
if(numbers.length) {
  for(const number of numbers) {
    total = total + number;
  }
  console.log(`Общая сумма чисел равна ${total}`);
}
