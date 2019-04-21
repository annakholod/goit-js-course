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
numbers.pop(numbers[numbers.length - 1]);
if(numbers.length > 0) {
  for(let i = 0; i < numbers.length; i += 1) {
    total = total + numbers[i];
  }
  console.log(`Общая сумма чисел равна ${total}`);
}
