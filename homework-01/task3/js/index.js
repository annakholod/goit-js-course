'use strict'

// task 3
let country = prompt('Укажите вашу страну');
const deliveryChina = 100;
const deliverySouthAmerica = 250;
const deliveryAustralia = 170;
const deliveryIndia = 80;
const deliveryJamaica = 120;
if(country !== null) {
  switch(country.toLocaleLowerCase()) {
    case 'китай' :
    alert(`Доставка в ${country} будет стоить ${deliveryChina} кредитов`);
    break;
    case 'южная америка' :
    alert(`Доставка в ${country} будет стоить ${deliverySouthAmerica} кредитов`);
    break;
    case 'австралия' :
    alert(`Доставка в ${country} будет стоить ${deliveryAustralia} кредитов`);
    break;
    case 'индия' :
    alert(`Доставка в ${country} будет стоить ${deliveryIndia} кредитов`);
    break;
    case 'ямайка' :
    alert(`Доставка в ${country} будет стоить ${deliveryJamaica} кредитов`);
    break;
    default:
    alert('В вашей стране доставка не доступна');
  }
} else {
  alert('Страна не указана');
}
