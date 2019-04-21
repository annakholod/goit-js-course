'use strict'

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;
let userPass;
let checkPass = 0;

do {
  userPass = prompt('Введите пароль');
  for(let i = 0; i < passwords.length; i += 1) {
    if(userPass === passwords[i]) {
      alert('Добро пожаловать');
      checkPass = 1;
      break;
    }
  }
  if(checkPass === 0 && userPass !== null) {
    if(attemptsLeft !== 1) {
    attemptsLeft -= 1;
    alert(`Неверный пароль, у вас осталось ${attemptsLeft} попыток`);
  } else {
    alert('У вас закончились попытки, аккаунт заблокирован!');
    break;
  }
  }
} while(userPass !== null && checkPass !== 1 && attemptsLeft !== 0)
