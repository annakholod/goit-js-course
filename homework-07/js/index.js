'use strict';

const users = [
  {
    id: '701b29c3-b35d-4cf1-a5f6-8b12b29a5081',
    name: 'Moore Hensley',
    email: 'moorehensley@indexia.com',
    eyeColor: 'blue',
    friends: ['Sharron Pace'],
    isActive: false,
    balance: 2811,
    skills: ['ipsum', 'lorem'],
    gender: 'male',
    age: 37,
  },
  {
    id: '7a3cbd18-57a1-4534-8e12-1caad921bda1',
    name: 'Sharlene Bush',
    email: 'sharlenebush@tubesys.com',
    eyeColor: 'blue',
    friends: ['Briana Decker', 'Sharron Pace'],
    isActive: true,
    balance: 3821,
    skills: ['tempor', 'mollit', 'commodo', 'veniam', 'laborum'],
    gender: 'female',
    age: 34,
  },
  {
    id: '88beb2f3-e4c2-49f3-a0a0-ecf957a95af3',
    name: 'Ross Vazquez',
    email: 'rossvazquez@xinware.com',
    eyeColor: 'green',
    friends: ['Marilyn Mcintosh', 'Padilla Garrison', 'Naomi Buckner'],
    isActive: false,
    balance: 3793,
    skills: ['nulla', 'anim', 'proident', 'ipsum', 'elit'],
    gender: 'male',
    age: 24,
  },
  {
    id: '249b6175-5c30-44c6-b154-f120923736f5',
    name: 'Elma Head',
    email: 'elmahead@omatom.com',
    eyeColor: 'green',
    friends: ['Goldie Gentry', 'Aisha Tran'],
    isActive: true,
    balance: 2278,
    skills: ['adipisicing', 'irure', 'velit'],
    gender: 'female',
    age: 21,
  },
  {
    id: '334f8cb3-eb04-45e6-abf4-4935dd439b70',
    name: 'Carey Barr',
    email: 'careybarr@nurali.com',
    eyeColor: 'blue',
    friends: ['Jordan Sampson', 'Eddie Strong'],
    isActive: true,
    balance: 3951,
    skills: ['ex', 'culpa', 'nostrud'],
    gender: 'male',
    age: 27,
  },
  {
    id: '150b00fb-dd82-427d-9faf-2879ea87c695',
    name: 'Blackburn Dotson',
    email: 'blackburndotson@furnigeer.com',
    eyeColor: 'brown',
    friends: ['Jacklyn Lucas', 'Linda Chapman'],
    isActive: false,
    balance: 1498,
    skills: ['non', 'amet', 'ipsum'],
    gender: 'male',
    age: 38,
  },
  {
    id: 'e1bf46ab-7168-491e-925e-f01e21394812',
    name: 'Sheree Anthony',
    email: 'shereeanthony@kog.com',
    eyeColor: 'brown',
    friends: ['Goldie Gentry', 'Briana Decker'],
    isActive: true,
    balance: 2764,
    skills: ['lorem', 'veniam', 'culpa'],
    gender: 'female',
    age: 39,
  },
];

//task 1
const getAllNames = users => users.map(user => user.name);
console.log(getAllNames(users));

// task 2
const getUsersByEyeColor = (users, color) => users.filter(user => user.eyeColor === color);
console.log(getUsersByEyeColor(users, 'blue'));

// task 3
const getUserByGender = (users, gender) => users
  .filter(user => user.gender === gender)
  .map(user => user.name);
console.log(getUserByGender(users, 'male'));

// task 4
const getInactiveUsers = users => users.filter(user => !user.isActive);
console.log(getInactiveUsers(users));

// task 5
const getUserByEmail = (users, email) => users.find(user => user.email === email);
console.log(getUserByEmail(users, 'shereeanthony@kog.com'));
console.log(getUserByEmail(users, 'elmahead@omatom.com'));

// task 6
const getUsersWithAge = (users, min, max) => users.filter(user => user.age >= min && user.age <= max);
console.log(getUsersWithAge(users, 20, 30));
console.log(getUsersWithAge(users, 30, 40));

// task 7
const getTotalBalance = users => users.reduce((acc, user) => acc + user.balance, 0);
console.log(getTotalBalance(users));

// task 8
const getUsersByFriend = (users, name) => users
  .filter(user => user.friends.includes(name))
  .map(user => user.name);
console.log(getUsersByFriend(users, 'Briana Decker'));
console.log(getUsersByFriend(users, 'Goldie Gentry'));

// additional task 1
const getUniqueSkills = users => {
  const allSkills = users.reduce((skills, user) => {
    skills.push(...user.skills);
    return skills;
  }, []);
  const uniqueSkills = [];
  // uniqueSkills = allSkills.filter((el, index, arr) => index === arr.indexOf(el)).sort();
  allSkills.forEach((skill) => {
    if(!uniqueSkills.includes(skill)) {
      uniqueSkills.push(skill);
    }
  })
  uniqueSkills.sort();
  return uniqueSkills;
}
console.log(getUniqueSkills(users));

// additional task 2
const getNamesSortedByFriendsCount = users => {
  const copyUsers = [...users];
  copyUsers.sort((user1, user2) => {
    return user1.friends.length - user2.friends.length;
  });
  const usersName = copyUsers.map(user => user.name);
  return usersName;
}
console.log(getNamesSortedByFriendsCount(users));
