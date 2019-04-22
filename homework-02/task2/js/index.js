'use strict'

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;
let userPass;

do {
  userPass = prompt('Введите пароль');
  if(userPass !== null) {
    attemptsLeft -= 1;
    if(passwords.includes(userPass)) {
      alert('Добро пожаловать');
      break;
    } else if(attemptsLeft) {
      alert(`Неверный пароль, у вас осталось ${attemptsLeft} попыток`);
    } else {
      alert('У вас закончились попытки, аккаунт заблокирован!');
    }
  } else {
    break;
  }
} while(attemptsLeft)
