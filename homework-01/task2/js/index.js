'use strict'

// task 2
let credits = 23580;
const pricePerDroid = 3000;
let quantityDroid = prompt('Введите количество дроидов');
if(quantityDroid !== null) {
  let totalPrice = quantityDroid * pricePerDroid;
  if(totalPrice > credits) {
    console.log('Недостаточно средств на счету!');
  } else {
    console.log(`Вы купили ${quantityDroid} дроидов, на счету осталось ${credits - totalPrice} кредитов.`);
  }
} else {
  console.log('Отменено пользователем!');
}
