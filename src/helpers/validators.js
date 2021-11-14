import {
  gt,
  lte,
  map,
  sum,
  whereEq,
  composeK,
  pipe,
  values,
  equals,
  all,
  and,
  prop,
  both,
  allPass,
  anyPass,
  complement,
} from "ramda";
/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
const eq =
  (func) =>
  (...args) =>
    all(
      equals(func[0](...args)),
      func.map((a) => a(...args))
    );
const haveWhiteColor = whereEq("white");
const haveGreenColor = whereEq("green");
const haveBlueColor = whereEq("blue");
const haveRedColor = whereEq("red");
const haveOrangeColor = whereEq("orange");
const getCircle = prop("circle");
const getTriangle = prop("triangle");
const getSqare = prop("square");
const getStar = prop("star");
const test = (a) => {
  console.log(a);
  return a;
};
const countByColor = (x) => pipe(values, map(x), sum);
const countByColorGt = (x, y) => pipe(countByColor(x), lte(y));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
  if (triangle !== "white" || circle !== "white") {
    return false;
  }

  return star === "red" && square === "green";
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(countByColorGt(haveGreenColor, 2));

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = eq([
  countByColor(haveRedColor),
  countByColor(haveBlueColor),
]);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([
  pipe(getCircle, haveBlueColor),
  pipe(getStar, haveRedColor),
  pipe(getSqare, haveOrangeColor),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
  countByColorGt(haveBlueColor, 3),
  countByColorGt(haveGreenColor, 3),
  countByColorGt(haveOrangeColor, 3),
  countByColorGt(haveRedColor, 3),
]);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
  pipe(countByColor(haveGreenColor), equals(2)),
  pipe(countByColor(haveRedColor), equals(1)),
  pipe(getTriangle, haveGreenColor),
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = pipe(countByColorGt(haveOrangeColor, 4));

// 8. Не красная и не белая звезда.
export const validateFieldN8 = complement(
  anyPass([pipe(getStar, haveWhiteColor), pipe(getStar, haveRedColor)])
);

// 9. Все фигуры зеленые.
export const validateFieldN9 = pipe(countByColorGt(haveGreenColor, 4));

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([
  eq([getTriangle, getSqare]),
  complement(pipe(getTriangle, haveWhiteColor)),
]);
