/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import {
  allPass,
  andThen,
  curryN,
  length,
  pipe,
  pipeWith,
  prop,
  split,
  tap,
  tryCatch,
  __,
} from "ramda";
import Api from "../tools/api";

const api = new Api();
const toNum = (x) => +x;
const apiNumbersBase = (num) =>
  pipe(
    api.get("https://api.tech/numbers/base", {
      from: 10,
      to: 2,
      number: num,
    }),
    prop("result")
  );
const apiAnimalsId = (num) => api.get(`https://animals.tech/${num}/name`);
/**
 * Я – пример, удали меня
 */
const wait = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  /**
   * Я – пример, удали меня
   */
  api
    .get("https://api.tech/numbers/base", { from: 10, to: 2, number: 10 })
    .then((result) => {
      console.log(result);
    });
  const log = pipe(tap(console.log), tap(writeLog));

  const validate = tryCatch(allPass([]), (err) => console.log("error" + err));
  pipe(
    log,
    toNum,
    Math.round,
    log,
    pipeWith(andThen)([
      apiNumbersBase,
      log,
      split,
      length,
      log,
      curryN(4, Math.pow)(__, 2),
      log,
      (x) => x % 3,
      log,
      apiAnimalsId,
      handleSuccess,
    ])
  )(value);
};

export default processSequence;
