'use strict'

// task 1
const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message;
let pass = prompt('Введите пароль администратора');
if(pass !== null) {
  if(pass === ADMIN_PASSWORD) {
    message = 'Добро пожаловать!';
  } else {
    message = 'Доступ запрещен, неверный пароль!';
  }
} else {
  message = 'Отменено пользователем!';
}
alert(message);


// task 2
// let credits = 23580;
// const pricePerDroid = 3000;
// let quantityDroid = prompt('Введите количество дроидов');
// if(quantityDroid !== null) {
//   let totalPrice = quantityDroid * pricePerDroid;
//   if(totalPrice > credits) {
//     console.log('Недостаточно средств на счету!');
//   } else {
//     credits = credits - totalPrice;
//     console.log(`Вы купили ${quantityDroid} дроидов, на счету осталось ${credits} кредитов.`);
//   }
// } else {
//   console.log('Отменено пользователем!');
// }


// // task 3
// let country = prompt('Укажите вашу страну');
// let value;
// let message;
// if(country !== null) {
//   country = country.toLocaleLowerCase();
//   switch(country) {
//     case 'китай' :
//     value = 100;
//     message = `Доставка в ${country} будет стоить ${value} кредитов`;
//     break;
//     case 'южная америка' :
//     value = 250;
//     message = `Доставка в ${country} будет стоить ${value} кредитов`;
//     break;
//     case 'австралия' :
//     value = 170;
//     message = `Доставка в ${country} будет стоить ${value} кредитов`;
//     break;
//     case 'индия' :
//     value = 80;
//     message = `Доставка в ${country} будет стоить ${value} кредитов`;
//     break;
//     case 'ямайка' :
//     value = 120;
//     message = `Доставка в ${country} будет стоить ${value} кредитов`;
//     break;
//     default:
//     message = 'В вашей стране доставка не доступна';
//   }
// } else {
//   message = 'Страна не указана';
// }
// alert(message);
