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
