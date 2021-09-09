'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//   movement > 0
//     ? console.log(`${i + 1}:Użytkownik wpłacił ${movement}`)
//     : console.log(`${i + 1}:Użytkownik wypłacił ${Math.abs(movement)}`);
// }

// movements.forEach((movement, index) =>
//   movement > 0
//     ? console.log(`${index + 1}: Użytkownik wpłacił ${movement}`)
//     : console.log(`${index + 1}: Użytkownik wypłacił ${Math.abs(movement)}`)
// );

//forEach on Maps and Sets:

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((value, key, map) => {
//   console.log(`${key}: ${value}`);
// });

// //Set:
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((movement, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${movement} €</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
const calcDisplaySummary = function (account) {
  const deposits = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${deposits} €`;
  const withdrawals = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)} €`;
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} €`;
};
// const displayMovements = function (movements) {
//   containerMovements.innerHTML = '';
//   movements.forEach((movement, i) => {
//     const type = movement > 0 ? 'deposit' : 'withdrawal';
//     const html = `<div class="movements__row">
//     <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
//     <div class="movements__date">3 days ago</div>
//     <div class="movements__value">${movement}</div>
//   </div>`;
//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };
// displayMovements(account1.movements);
const updateUI = acc => {
  //Display movements

  displayMovements(acc.movements);
  //Display balance

  calcPrintBalance(acc);
  //Display summary

  calcDisplaySummary(acc);
};

//Event handlers:
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value))
    //Display UI and welcome message
    containerApp.style.opacity = '1';
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;

  updateUI(currentAccount);

  //Cleaning inputs:
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  //Clean inputs
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  console.log(amount, recieverAccount);
  if (
    amount > 0 &&
    recieverAccount &&
    amount <= currentAccount.balance &&
    recieverAccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement:
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }
});
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// const julia1 = [3, 5, 2, 12, 7];
// const kate1 = [4, 1, 15, 8, 3];
// const julia2 = [9, 16, 6, 8, 3];
// const kate2 = [10, 5, 6, 1, 4];

// const checkDogs = function (arr1, arr2) {
//   const copyOfArr1 = arr1.slice();
//   copyOfArr1.splice(0, 1);
//   copyOfArr1.splice(-1);
//   const dogs = [...copyOfArr1, ...arr2];
//   dogs.forEach((dog, i) => {
//     console.log(
//       `Dog number ${i + 1} ${
//         dog >= 3
//           ? `is an adult and it is ${dog} years old`
//           : ` is still a puppy`
//       }`
//     );
//   });
// };
// checkDogs(julia1, kate1);
// checkDogs(julia2, kate2);

const eurToUsd = 1.1;

// const movementsUsd = movements.map(mov => Math.trunc(mov * eurToUsd));
// console.log(movementsUsd);

// movements.map((mov, i) =>
//   console.log(
//     `${i + 1}. ${Math.abs(mov)} euro is equal to ${Math.abs(
//       mov + eurToUsd
//     )} dollars`
//   )
// );

const createInitials = function (arr) {
  arr.forEach(array => {
    array.username = array.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createInitials(accounts);

// const user = 'Steven Thomas Williams';
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(word => word[0])
//   .join('');
// console.log(username);

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// const balance = movements.reduce(function (acc, mov) {
//   return acc + mov;
// }, 0);
// console.log(balance);

// const juliasDogs = [5, 2, 4, 1, 15, 8, 3];
// const katesDogs = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const dogAges = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18);
//   console.log(dogAges);
//   const avrAge =
//     dogAges.reduce((acc, cur, i, arr) => acc + cur, 0) / dogAges.length;
//   return avrAge;
// };
// const julia = calcAverageHumanAge(juliasDogs);
// const kate = calcAverageHumanAge(katesDogs);
// console.log(julia);
// console.log(kate);

// const totalDepisitsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(`${totalDepisitsUSD}} US dollars`);

// const juliasDogs = [5, 2, 4, 1, 15, 8, 3];
// const katesDogs = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = ages => {
//   const avrAge = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
//   return avrAge;
// };
// // const dogAges = ages
// //   .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
// //   .filter(age => age >= 18);
// // console.log(dogAges);
// // const avrAge =
// //   dogAges.reduce((acc, cur, i, arr) => acc + cur, 0) / dogAges.length;
// // return avrAge;

// const julia = calcAverageHumanAge(juliasDogs);
// const kate = calcAverageHumanAge(katesDogs);
// console.log(julia);
// console.log(kate);

// const findMethod = movements.find(mov => mov < 0);
// console.log(findMethod);
// let jessAccount = '';
// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') jessAccount = acc;
// }
// console.log(jessAccount);

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

const answer =
  sarahDog.curFood > sarahDog.recommendedFood
    ? `Sarah's dog eats too much`
    : `Sarah's dog eats too little`;
console.log(answer);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(' and ')}'s dog eats too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dog eats too little`);

// ownersEatTooMuch.forEach(owner => {
//   console.log(`${owner.join(' and ')}'s dog eats too much`);
// });
// ownersEatTooLittle.forEach(owner => {
//   console.log(`${owner.join(' and ')}'s dog eats too little`);
// });

console.log(dogs.some(dog => dog.recommendedFood === dog.curFood));

console.log(
  dogs.some(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);
console.log(
  dogs.filter(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);
// console.log(
//   ownersEatTooMuch
//     .concat(ownersEatTooLittle)
//     .some(
//       dog =>
//         dog.curFood > dog.recommendedFood * 0.9 &&
//         dog.curFood < dog.recommendedFood * 1.1
//     )
// );
// console.log(
//   ownersEatTooMuch
//     .concat(ownersEatTooLittle)
//     .filter(
//       dog =>
//         dog.curFood > dog.recommendedFood * 0.9 &&
//         dog.curFood < dog.recommendedFood * 1.1
//     )
// );

const dogsCopy = dogs.slice();
dogsCopy.sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);
