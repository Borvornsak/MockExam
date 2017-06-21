import debugModule from 'debug';
import * as number from '../utils/number';
import stream from 'stream';
import util from 'util';
import dotProp from 'dot-prop';
import '../utils/string';
import answerKeys from './answerKeys';
import {
  GAT_CONNECT_PART1_SHEET_CODE, GAT_CONNECT_PART2_SHEET_CODE,
  GAT_ENGLISH_SHEET_CODE
} from '../constant';

const Readable = stream.Readable;

const debug = debugModule('node-csv:getConV1');

const seatRegex = /\d{5}/;


/**
 * Initialize validation result value
 * @param result
 */
function defaultValidationResult(result) {
  if (!result) throw new Error('ValidationResult is undefined');

  if (!result.insight) {
    result.hasWarning = false;
    result.insight = {};
  } else if (Object.keys(result.insight).length === 0) {
    result.hasWarning = false;
    result.insight = {};
  }
}

/**
 * Compare GAT connect answer item
 * this should sort '' to the end of array
 * @param a
 * @param b
 * @return {number}
 */
function compareConnectAnswerItem(a, b) {
  if (a === b) {
    return 0;
  }
  if (a === '') {
    return 1;
  }
  if (b === '') {
    return -1;
  }
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

/**
 * Grade GAT connect answer
 * @param key {String}
 * @param answerObj {Object}
 * @param answerKey {Object}
 * @return {{answer: Array, score: number, note: Array, isCorrect: boolean}}
 */
function gradeConnectAnswer(key, answerObj, answerKey) {
  // answer
  let answer = [];
  if (Array.isArray(answerObj[key])) answer = answerObj[key].sort(compareConnectAnswerItem);
  else answer = answerObj[key];

  // score, note
  let score = 0;
  let note = [];
  let clonedAnswer = [...answer];
  let clonedAnswerKey = [...(answerKey.answer[key])];
  for (let i = 0; i < clonedAnswer.length; i += 1) {
    if (clonedAnswer[i] === '') {
      const remainingKeyIdx = clonedAnswerKey.findIndex((e) => e !== null);
      if (remainingKeyIdx < 0) {
        note.push('');
      } else {
        clonedAnswerKey[remainingKeyIdx] = null; // clear value so it can match only once.
        note.push('M');
      }
      continue;
    }

    const idx = clonedAnswerKey
      .findIndex((e) => {
        if (!e) return false;
        return clonedAnswer[i].substr(0, 2) === e.substr(0, 2)
      });
    if (idx > -1) {
      if (clonedAnswer[i].substr(2, 1) === clonedAnswerKey[idx].substr(2, 1)) {
        score += answerKey.score.correct;
        note.push('');
      } else {
        score += answerKey.score.wrong;
        note.push('I');
      }
    } else {
      score += answerKey.score.wrong;
      note.push('E');
    }
    clonedAnswerKey[idx] = null; // clear value so it can match only once.
  }
  // rounding
  score = number.round(score, 4);
  // lower bound at 0
  score = score < 0 ? 0 : score;

  return {
    answer,
    score,
    note,
    isCorrect: !note.some((e) => e !== ''), // if no note, will imply answer is correct
  };
}

function gradeEnglishAnswer(key, answerObj, answerKey) {
  // answer
  let answer = answerObj[key];

  // score, note
  let score = 0;
  let note = '';
  let isCorrect = false;
  if (answer === answerKey.answer[key]) {
    score = answerKey.score.correct;
    isCorrect = true;
  } else {
    score = answerKey.score.wrong;
  }

  return {
    answer,
    score,
    note,
    isCorrect,
  };
}

// API
/**
 * Validate GAT connect answer's item value
 * @param {Number} qNumber question number
 * @param {Number} aNumber answer number
 * @param {String} answer answer
 * @param {Object} result
 */
export function checkConnectAnswerItem(qNumber, aNumber, answer, result) {
  defaultValidationResult(result);

  if (answer === '') return;

  if (answer.length > 0 && answer.length !== 3) {
    result.hasWarning = true;
    dotProp.set(result.insight, `${qNumber}.${aNumber}`, 'length');
    return;
  }

  const number = parseInt(answer.substr(0, 2));
  const type = answer.substr(2, 1);
  debug('number', number);
  debug('type', type);
  if ((answer !== '99H' && (number < 1 || number > 20))
    || (['A', 'D', 'F', 'H'].includes(type) === false)
    || /[0-9A-Z]{3}/.test(answer) === false) {
    result.hasWarning = true;
    dotProp.set(result.insight, `${qNumber}.${aNumber}`, 'value');
  }
}

/**
 * Validate GAT connect answer value
 * @param {Number} qNumber question number
 * @param {String[]} answer answer
 * @param {Object} result
 */
export function checkConnectAnswer(qNumber, answer, result) {
  defaultValidationResult(result);

  if (!(answer instanceof Array)) {
    result.hasWarning = true;
    dotProp.set(result.insight, `${qNumber}.value`, 'value/notArray');
    return;
  }

  if (answer.join(',') === ',,,') {
    result.hasWarning = true;
    dotProp.set(result.insight, `${qNumber}.value`, 'value/blank');
  }

  if (answer.length !== 4) {
    result.hasWarning = true;
    dotProp.set(result.insight, `${qNumber}.value`, 'length');
  }
}

export function checkEnglishAnswer(qNumber, answer, result) {
  defaultValidationResult(result);

  if (answer === '') {
    result.hasWarning = true;
    dotProp.set(result.insight, `${qNumber}.value`, 'value/blank');
  } else if (['1', '2', '3', '4', '5'].includes(answer) === false) {
    result.hasWarning = true;
    dotProp.set(result.insight, `${qNumber}.value`, 'value');
  }
}

/**
 *
 * @param {String} seat
 * @param {Object} result
 */
export function checkSeat(seat, result) {
  defaultValidationResult(result);

  if (typeof seat !== 'string') {
    result.hasWarning = true;
    result.insight = { seat: 'value' };
    return 0;
  }
  const parsed = parseInt(seat);
  if (isNaN(parsed)) {
    result.hasWarning = true;
    result.insight = { seat: 'value' };
    return 0;
  }
  if (parsed < 10000 || parsed > 99999) {
    result.hasWarning = true;
    result.insight = { seat: 'value' };
    return parsed;
  }
  return parsed;
}

export function checkSheetCode(sheetCode, result) {
  defaultValidationResult(result);
  if (['000', '001', '002'].indexOf(sheetCode) < 0) {
    result.hasWarning = true;
    result.insight = { sheetCode: 'value' };
  }
}

/**
 * Transform FormScanner output to rawAnswer
 * syntax conform with stream-transform
 *
 * if there is no answer this function create empty answer for every key in answerKey
 * @param options
 * @param options.exam exam model (required)
 * @return {Function}
 */
export function toRawAnswer(options) {
  return (record, callback) => {
    let validationResult = {
      hasWarning: false,
      insight: {},
    };
    // seat
    const seat = checkSeat(`${record["[seat] 1"]}${record["[seat] 2"]}${record["[seat] 3"]}${record["[seat] 4"]}${record["[seat] 5"]}`, validationResult);

    // sheetCode
    const sheetCode = `${record["[code] 1"]}${record["[code] 2"]}${record["[code] 3"]}`;
    checkSheetCode(sheetCode, validationResult);
    // if sheetCode is not error then process grading
    let answer = {};
    const answerKey = answerKeys[sheetCode];
    if (!validationResult.insight.sheetCode) {
      if (sheetCode === GAT_CONNECT_PART1_SHEET_CODE || sheetCode === GAT_CONNECT_PART2_SHEET_CODE) {
        for (let i = 1; i <= Object.keys(answerKey.answer).length; i += 1) {
          let answerList = [];
          for (let j = 1; j <= 4; j += 1) {
            const c1 = record[`[ans${i}_${j}] 1`];
            const c2 = record[`[ans${i}_${j}] 2`];
            const c3 = record[`[ans${i}_${j}] 3`];
            let childAnswer = `${c1 || '_'}${c2 || '_'}${c3 || '_'}`;
            childAnswer = childAnswer === '___' ? '' : childAnswer;
            checkConnectAnswerItem(i, j, childAnswer, validationResult);
            answerList.push(childAnswer === '___' ? '' : childAnswer);
          }
          answer[`${i}`] = answerList;
          checkConnectAnswer(i, answerList, validationResult);
        }
      } else if (sheetCode === GAT_ENGLISH_SHEET_CODE) {
        for (let i = 1; i <= Object.keys(answerKey.answer).length; i += 1) {
          const c = record[`[ans] ${i}`];
          answer[`${i}`] = c;
          checkEnglishAnswer(i, c, validationResult);
        }
      }
    }
    const rawAnswer = {
      examId: options.exam.id,
      seat,
      sheetCode,
      filename: record["File name"],
      answer,
      corners: record["corners"],
      ...validationResult,
    };

    callback(null, rawAnswer);
  };
}

/**
 *
 * @param rawAnswer
 * @param options
 * @param options.exam exam model (required)
 * @param [options.answerKey] {Object} to override default answerKey
 * @return {Array} Answer list
 */
export function toAnswer(rawAnswer, options) {

  // important this prevent code to mutate original object.
  const myRawAnswer = JSON.parse(JSON.stringify(rawAnswer));

  const answerObj = myRawAnswer.answer;
  const answerList = [];
  const answerKey = options.answerKey || answerKeys[myRawAnswer.sheetCode];

  if (!answerObj) return answerList;

  if (!answerKey) return answerList;

  Object.keys(answerObj)
    .forEach((key) => {

      // section
      let section = null;
      if (typeof(answerKey.section) === 'string') section = answerKey.section;
      else if (answerKey.section && answerKey.section[key] !== null) section = answerKey.section[key];

      // subsection
      let subsection = null;
      if (typeof(answerKey.subsection) === 'string') subsection = answerKey.subsection;
      else if (answerKey.subsection && answerKey.subsection[key] !== null) subsection = answerKey.subsection[key];

      // answer, score, note, isCorrect
      let result = {};
      if (myRawAnswer.sheetCode === GAT_CONNECT_PART1_SHEET_CODE || myRawAnswer.sheetCode === GAT_CONNECT_PART2_SHEET_CODE) {
        result = gradeConnectAnswer(key, answerObj, answerKey);
      } else if (myRawAnswer.sheetCode === GAT_ENGLISH_SHEET_CODE) {
        result = gradeEnglishAnswer(key, answerObj, answerKey);
      }

      answerList.push({
        examId: options.exam.id,
        seat: myRawAnswer.seat,
        sheetCode: myRawAnswer.sheetCode,
        // question section or default section
        section,
        // question subsection or default section
        subsection,
        question: key,
        ...result,
      });
    });
  return answerList;
}


// Generator
function Generator(options = {}) {
  if (!(this instanceof Generator)) return new Generator(options);
  options.objectMode = true;
  Readable.call(this, options);

  this.counter = options.counter || 100;
  this.section = options.section;
  if (!this.section) throw new Error('Must specific GAT\'s section to generate');
}

util.inherits(Generator, Readable);

Generator.prototype.genAt100 = function (sheetCode, callback) {
  const record = {};
  const seat = 90000 + this.counter;
  record["File name"] = `GAT-C1-V1_${seat}`;

  const answer = answerKeys[sheetCode].answer;

  if (sheetCode === GAT_CONNECT_PART1_SHEET_CODE || sheetCode === GAT_CONNECT_PART2_SHEET_CODE) {
    for (let i = 1; i <= 10; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        const qAnswer = answer[i];
        if (qAnswer.length > j && Math.random() > 0.2) {
          record[`[ans${i}_${j + 1}] 1`] = qAnswer[j].charAt(0);
          record[`[ans${i}_${j + 1}] 2`] = qAnswer[j].charAt(1);
          record[`[ans${i}_${j + 1}] 3`] = qAnswer[j].charAt(2);
        } else {
          record[`[ans${i}_${j + 1}] 1`] = '';
          record[`[ans${i}_${j + 1}] 2`] = '';
          record[`[ans${i}_${j + 1}] 3`] = '';
        }
      }
    }
  } else if (sheetCode === GAT_ENGLISH_SHEET_CODE) {
    for (let i = 1; i <= 60; i += 1) {
      if (Math.random() > 0.2) {
        record[`[ans] ${i}`] = answer[i];
      }
    }
  }

  record[`[seat] 1`] = seat.toString().charAt(0);
  record[`[seat] 2`] = seat.toString().charAt(1);
  record[`[seat] 3`] = seat.toString().charAt(2);
  record[`[seat] 4`] = seat.toString().charAt(3);
  record[`[seat] 5`] = seat.toString().charAt(4);

  record[`[code] 1`] = sheetCode.charAt(0);
  record[`[code] 2`] = sheetCode.charAt(1);
  record[`[code] 3`] = sheetCode.charAt(2);

  callback(null, record);
};

Generator.prototype._read = function read() {
  const self = this;

  if (self.section === 'Connect') {
    self.genAt100(GAT_CONNECT_PART1_SHEET_CODE, (error, record) => {
      if (error) self.emit('error', error);
      else if (this.counter === 0) { // stop the stream
        this.push(null);
      } else {
        self.push(record);
      }
    });

    self.genAt100(GAT_CONNECT_PART2_SHEET_CODE, (error, record) => {
      if (error) self.emit('error', error);
      else if (this.counter === 0) { // stop the stream
        this.push(null);
      } else {
        self.push(record);
      }
    });
  } else if (self.section === 'English') {
    self.genAt100(GAT_ENGLISH_SHEET_CODE, (error, record) => {
      if (error) self.emit('error', error);
      else if (this.counter === 0) { // stop the stream
        this.push(null);
      } else {
        self.push(record);
      }
    });
  }

  this.counter -= 1;
};

export { Generator };
