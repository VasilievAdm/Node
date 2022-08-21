require('colors');

const Colors = {
  green: 0,
  yellow: 1,
  red: 2
};
const firstNum = process.argv[2];
const lastNum = process.argv[3];
let setColor = Colors.green;
let noPrimeNum = true;

const isPrimeNum = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++)
    if (num % i === 0) return false;
  return true;
};

const changeColor = () => {
  setColor++;
  if (setColor > 2) setColor = 0;
}

const colorPrint = (num) => {
  if (noPrimeNum) noPrimeNum = false;
  switch (setColor) {
    case Colors.green:
      console.log(`${num}`.green);
      break;
    case Colors.yellow:
      console.log(`${num}`.yellow);
      break;
    case Colors.red:
      console.log(`${num}`.red);
      break;
  }
  changeColor();
};

if (isNaN(firstNum) || isNaN(lastNum)) {
  console.log('Ведите корректные данные'.red);
  return;
}
for (let i = firstNum; i <= lastNum; i++) {
  if (isPrimeNum(i)) colorPrint(i);
}
if (noPrimeNum)
  console.log(`Нет простых чисел в диапазоне ${firstNum} - ${lastNum}`.blue);