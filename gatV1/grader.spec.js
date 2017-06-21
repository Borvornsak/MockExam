import debugModule from 'debug';

import * as grader from './grader';
import { exam } from '../constant';
import '../utils/string';
import {
  GAT_CONNECT_PART1_SHEET_CODE, GAT_CONNECT_PART2_SHEET_CODE,
  GAT_ENGLISH_SHEET_CODE
} from '../constant';

const debug = debugModule('node-csv:grading');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const should = chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

/* eslint-disable no-unused-expressions, arrow-body-style */
describe('grading', () => {
  describe('toRawAnswer', () => {
    let cb;
    let connect1Answer = {
      "File name": "GAT-C1-V1_90001",
      "[ans1_1] 1": "0",
      "[ans1_1] 2": "3",
      "[ans1_1] 3": "A",
      "[ans1_2] 1": "0",
      "[ans1_2] 2": "5",
      "[ans1_2] 3": "A",
      "[ans1_3] 1": "",
      "[ans1_3] 2": "",
      "[ans1_3] 3": "",
      "[ans1_4] 1": "",
      "[ans1_4] 2": "",
      "[ans1_4] 3": "",
      "[ans2_1] 1": "0",
      "[ans2_1] 2": "3",
      "[ans2_1] 3": "F",
      "[ans2_2] 1": "0",
      "[ans2_2] 2": "5",
      "[ans2_2] 3": "F",
      "[ans2_3] 1": "",
      "[ans2_3] 2": "",
      "[ans2_3] 3": "",
      "[ans2_4] 1": "",
      "[ans2_4] 2": "",
      "[ans2_4] 3": "",
      "[ans3_1] 1": "9",
      "[ans3_1] 2": "9",
      "[ans3_1] 3": "H",
      "[ans3_2] 1": "",
      "[ans3_2] 2": "",
      "[ans3_2] 3": "",
      "[ans3_3] 1": "",
      "[ans3_3] 2": "",
      "[ans3_3] 3": "",
      "[ans3_4] 1": "",
      "[ans3_4] 2": "",
      "[ans3_4] 3": "",
      "[ans4_1] 1": "0",
      "[ans4_1] 2": "3",
      "[ans4_1] 3": "A",
      "[ans4_2] 1": "0",
      "[ans4_2] 2": "5",
      "[ans4_2] 3": "A",
      "[ans4_3] 1": "",
      "[ans4_3] 2": "",
      "[ans4_3] 3": "",
      "[ans4_4] 1": "",
      "[ans4_4] 2": "",
      "[ans4_4] 3": "",
      "[ans5_1] 1": "9",
      "[ans5_1] 2": "9",
      "[ans5_1] 3": "H",
      "[ans5_2] 1": "",
      "[ans5_2] 2": "",
      "[ans5_2] 3": "",
      "[ans5_3] 1": "",
      "[ans5_3] 2": "",
      "[ans5_3] 3": "",
      "[ans5_4] 1": "",
      "[ans5_4] 2": "",
      "[ans5_4] 3": "",
      "[ans6_1] 1": "9",
      "[ans6_1] 2": "9",
      "[ans6_1] 3": "H",
      "[ans6_2] 1": "",
      "[ans6_2] 2": "",
      "[ans6_2] 3": "",
      "[ans6_3] 1": "",
      "[ans6_3] 2": "",
      "[ans6_3] 3": "",
      "[ans6_4] 1": "",
      "[ans6_4] 2": "",
      "[ans6_4] 3": "",
      "[ans7_1] 1": "9",
      "[ans7_1] 2": "9",
      "[ans7_1] 3": "H",
      "[ans7_2] 1": "",
      "[ans7_2] 2": "",
      "[ans7_2] 3": "",
      "[ans7_3] 1": "",
      "[ans7_3] 2": "",
      "[ans7_3] 3": "",
      "[ans7_4] 1": "",
      "[ans7_4] 2": "",
      "[ans7_4] 3": "",
      "[ans8_1] 1": "0",
      "[ans8_1] 2": "1",
      "[ans8_1] 3": "A",
      "[ans8_2] 1": "0",
      "[ans8_2] 2": "2",
      "[ans8_2] 3": "A",
      "[ans8_3] 1": "0",
      "[ans8_3] 2": "4",
      "[ans8_3] 3": "A",
      "[ans8_4] 1": "1",
      "[ans8_4] 2": "0",
      "[ans8_4] 3": "A",
      "[ans9_1] 1": "0",
      "[ans9_1] 2": "1",
      "[ans9_1] 3": "D",
      "[ans9_2] 1": "0",
      "[ans9_2] 2": "6",
      "[ans9_2] 3": "D",
      "[ans9_3] 1": "0",
      "[ans9_3] 2": "7",
      "[ans9_3] 3": "D",
      "[ans9_4] 1": "",
      "[ans9_4] 2": "",
      "[ans9_4] 3": "",
      "[ans10_1] 1": "0",
      "[ans10_1] 2": "3",
      "[ans10_1] 3": "A",
      "[ans10_2] 1": "0",
      "[ans10_2] 2": "5",
      "[ans10_2] 3": "A",
      "[ans10_3] 1": "",
      "[ans10_3] 2": "",
      "[ans10_3] 3": "",
      "[ans10_4] 1": "",
      "[ans10_4] 2": "",
      "[ans10_4] 3": "",
      "[seat] 1": "9",
      "[seat] 2": "0",
      "[seat] 3": "0",
      "[seat] 4": "5",
      "[seat] 5": "0",
      "[code] 1": "0",
      "[code] 2": "0",
      "[code] 3": "0",
      "corners": "{\"BOTTOM_RIGHT\":{\"x\":2216.0,\"y\":3169.0},\"TOP_RIGHT\":{\"x\":2215.0,\"y\":275.0},\"BOTTOM_LEFT\":{\"x\":245.0,\"y\":3171.0},\"TOP_LEFT\":{\"x\":243.0,\"y\":277.0}}",
    };
    let connect2Answer = {
      "File name": "GAT-C1-V1_90001",
      "[ans1_1] 1": "0",
      "[ans1_1] 2": "3",
      "[ans1_1] 3": "A",
      "[ans1_2] 1": "0",
      "[ans1_2] 2": "5",
      "[ans1_2] 3": "A",
      "[ans1_3] 1": "",
      "[ans1_3] 2": "",
      "[ans1_3] 3": "",
      "[ans1_4] 1": "",
      "[ans1_4] 2": "",
      "[ans1_4] 3": "",
      "[ans2_1] 1": "0",
      "[ans2_1] 2": "3",
      "[ans2_1] 3": "F",
      "[ans2_2] 1": "0",
      "[ans2_2] 2": "5",
      "[ans2_2] 3": "F",
      "[ans2_3] 1": "",
      "[ans2_3] 2": "",
      "[ans2_3] 3": "",
      "[ans2_4] 1": "",
      "[ans2_4] 2": "",
      "[ans2_4] 3": "",
      "[ans3_1] 1": "9",
      "[ans3_1] 2": "9",
      "[ans3_1] 3": "H",
      "[ans3_2] 1": "",
      "[ans3_2] 2": "",
      "[ans3_2] 3": "",
      "[ans3_3] 1": "",
      "[ans3_3] 2": "",
      "[ans3_3] 3": "",
      "[ans3_4] 1": "",
      "[ans3_4] 2": "",
      "[ans3_4] 3": "",
      "[ans4_1] 1": "0",
      "[ans4_1] 2": "3",
      "[ans4_1] 3": "A",
      "[ans4_2] 1": "0",
      "[ans4_2] 2": "5",
      "[ans4_2] 3": "A",
      "[ans4_3] 1": "",
      "[ans4_3] 2": "",
      "[ans4_3] 3": "",
      "[ans4_4] 1": "",
      "[ans4_4] 2": "",
      "[ans4_4] 3": "",
      "[ans5_1] 1": "9",
      "[ans5_1] 2": "9",
      "[ans5_1] 3": "H",
      "[ans5_2] 1": "",
      "[ans5_2] 2": "",
      "[ans5_2] 3": "",
      "[ans5_3] 1": "",
      "[ans5_3] 2": "",
      "[ans5_3] 3": "",
      "[ans5_4] 1": "",
      "[ans5_4] 2": "",
      "[ans5_4] 3": "",
      "[ans6_1] 1": "9",
      "[ans6_1] 2": "9",
      "[ans6_1] 3": "H",
      "[ans6_2] 1": "",
      "[ans6_2] 2": "",
      "[ans6_2] 3": "",
      "[ans6_3] 1": "",
      "[ans6_3] 2": "",
      "[ans6_3] 3": "",
      "[ans6_4] 1": "",
      "[ans6_4] 2": "",
      "[ans6_4] 3": "",
      "[ans7_1] 1": "9",
      "[ans7_1] 2": "9",
      "[ans7_1] 3": "H",
      "[ans7_2] 1": "",
      "[ans7_2] 2": "",
      "[ans7_2] 3": "",
      "[ans7_3] 1": "",
      "[ans7_3] 2": "",
      "[ans7_3] 3": "",
      "[ans7_4] 1": "",
      "[ans7_4] 2": "",
      "[ans7_4] 3": "",
      "[ans8_1] 1": "0",
      "[ans8_1] 2": "1",
      "[ans8_1] 3": "A",
      "[ans8_2] 1": "0",
      "[ans8_2] 2": "2",
      "[ans8_2] 3": "A",
      "[ans8_3] 1": "0",
      "[ans8_3] 2": "4",
      "[ans8_3] 3": "A",
      "[ans8_4] 1": "1",
      "[ans8_4] 2": "0",
      "[ans8_4] 3": "A",
      "[ans9_1] 1": "0",
      "[ans9_1] 2": "1",
      "[ans9_1] 3": "D",
      "[ans9_2] 1": "0",
      "[ans9_2] 2": "6",
      "[ans9_2] 3": "D",
      "[ans9_3] 1": "0",
      "[ans9_3] 2": "7",
      "[ans9_3] 3": "D",
      "[ans9_4] 1": "",
      "[ans9_4] 2": "",
      "[ans9_4] 3": "",
      "[ans10_1] 1": "0",
      "[ans10_1] 2": "3",
      "[ans10_1] 3": "A",
      "[ans10_2] 1": "0",
      "[ans10_2] 2": "5",
      "[ans10_2] 3": "A",
      "[ans10_3] 1": "",
      "[ans10_3] 2": "",
      "[ans10_3] 3": "",
      "[ans10_4] 1": "",
      "[ans10_4] 2": "",
      "[ans10_4] 3": "",
      "[seat] 1": "9",
      "[seat] 2": "0",
      "[seat] 3": "0",
      "[seat] 4": "5",
      "[seat] 5": "0",
      "[code] 1": "0",
      "[code] 2": "0",
      "[code] 3": "1",
      "corners": "{\"BOTTOM_RIGHT\":{\"x\":2223.0,\"y\":3169.0},\"TOP_RIGHT\":{\"x\":2215.0,\"y\":275.0},\"BOTTOM_LEFT\":{\"x\":245.0,\"y\":3171.0},\"TOP_LEFT\":{\"x\":243.0,\"y\":277.0}}",
    };
    let englishAnswer = {
      'File name': 'GAT-ENG-V1_99001',
      '[ans] 1': '1',
      '[ans] 10': '1',
      '[ans] 11': '1',
      '[ans] 12': '1',
      '[ans] 13': '2',
      '[ans] 14': '2',
      '[ans] 15': '2',
      '[ans] 16': '2',
      '[ans] 17': '2',
      '[ans] 18': '2',
      '[ans] 19': '2',
      '[ans] 2': '1',
      '[ans] 20': '2',
      '[ans] 21': '2',
      '[ans] 22': '2',
      '[ans] 23': '2',
      '[ans] 24': '2',
      '[ans] 25': '3',
      '[ans] 26': '3',
      '[ans] 27': '3',
      '[ans] 28': '3',
      '[ans] 29': '3',
      '[ans] 3': '1',
      '[ans] 30': '3',
      '[ans] 31': '3',
      '[ans] 32': '3',
      '[ans] 33': '3',
      '[ans] 34': '3',
      '[ans] 35': '3',
      '[ans] 36': '3',
      '[ans] 37': '4',
      '[ans] 38': '4',
      '[ans] 39': '4',
      '[ans] 4': '1',
      '[ans] 40': '4',
      '[ans] 41': '4',
      '[ans] 42': '4',
      '[ans] 43': '4',
      '[ans] 44': '4',
      '[ans] 45': '4',
      '[ans] 46': '4',
      '[ans] 47': '4',
      '[ans] 48': '4',
      '[ans] 49': '5',
      '[ans] 5': '1',
      '[ans] 50': '5',
      '[ans] 51': '5',
      '[ans] 52': '5',
      '[ans] 53': '5',
      '[ans] 54': '5',
      '[ans] 55': '5',
      '[ans] 56': '5',
      '[ans] 57': '5',
      '[ans] 58': '5',
      '[ans] 59': '5',
      '[ans] 6': '1',
      '[ans] 60': '5',
      '[ans] 7': '1',
      '[ans] 8': '1',
      '[ans] 9': '1',
      '[code] 1': '0',
      '[code] 2': '0',
      '[code] 3': '2',
      '[seat] 1': '9',
      '[seat] 2': '9',
      '[seat] 3': '0',
      '[seat] 4': '0',
      '[seat] 5': '1',
      'corners': "{\"BOTTOM_RIGHT\":{\"x\":2200.0,\"y\":3169.0},\"TOP_RIGHT\":{\"x\":2215.0,\"y\":275.0},\"BOTTOM_LEFT\":{\"x\":245.0,\"y\":3171.0},\"TOP_LEFT\":{\"x\":243.0,\"y\":277.0}}",
    };

    beforeEach(async () => {
      cb = sinon.spy();
    });
    // assumed that rawAnswer from FormScanner will have value in every questions and will be
    // ''(empty string) by default.
    // Therefore toRawAnswer() do not need to add default record.
    it('should return connect1 rawAnswer', async () => {
      grader.toRawAnswer({ exam })(connect1Answer, cb);
      cb.should.have.been.calledWith(sinon.match.typeOf('null'), {
          examId: 'c4754a00-0236-11e7-8160-a5070a0fca65',
          seat: 90050,
          sheetCode: GAT_CONNECT_PART1_SHEET_CODE,
          filename: 'GAT-C1-V1_90001',
          answer: {
            1: ['03A', '05A', '', ''],
            2: ['03F', '05F', '', ''],
            3: ['99H', '', '', ''],
            4: ['03A', '05A', '', ''],
            5: ['99H', '', '', ''],
            6: ['99H', '', '', ''],
            7: ['99H', '', '', ''],
            8: ['01A', '02A', '04A', '10A'],
            9: ['01D', '06D', '07D', ''],
            10: ['03A', '05A', '', '']
          },
          hasWarning: false,
          insight: {},
          corners: "{\"BOTTOM_RIGHT\":{\"x\":2216.0,\"y\":3169.0},\"TOP_RIGHT\":{\"x\":2215.0,\"y\":275.0},\"BOTTOM_LEFT\":{\"x\":245.0,\"y\":3171.0},\"TOP_LEFT\":{\"x\":243.0,\"y\":277.0}}",
        }
      );
    });
    it('should return connect2 rawAnswer', async () => {
      grader.toRawAnswer({ exam })(connect2Answer, cb);
      cb.should.have.been.calledWith(sinon.match.typeOf('null'), {
          examId: 'c4754a00-0236-11e7-8160-a5070a0fca65',
          seat: 90050,
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          filename: 'GAT-C1-V1_90001',
          answer: {
            1: ['03A', '05A', '', ''],
            2: ['03F', '05F', '', ''],
            3: ['99H', '', '', ''],
            4: ['03A', '05A', '', ''],
            5: ['99H', '', '', ''],
            6: ['99H', '', '', ''],
            7: ['99H', '', '', ''],
            8: ['01A', '02A', '04A', '10A'],
            9: ['01D', '06D', '07D', ''],
            10: ['03A', '05A', '', '']
          },
          hasWarning: false,
          insight: {},
          corners: "{\"BOTTOM_RIGHT\":{\"x\":2223.0,\"y\":3169.0},\"TOP_RIGHT\":{\"x\":2215.0,\"y\":275.0},\"BOTTOM_LEFT\":{\"x\":245.0,\"y\":3171.0},\"TOP_LEFT\":{\"x\":243.0,\"y\":277.0}}",
        }
      );
    });
    it('should return english rawAnswer', async () => {
      grader.toRawAnswer({ exam })(englishAnswer, cb);
      cb.should.have.been.calledWith(sinon.match.typeOf('null'), {
          examId: 'c4754a00-0236-11e7-8160-a5070a0fca65',
          seat: 99001,
          sheetCode: GAT_ENGLISH_SHEET_CODE,
          filename: 'GAT-ENG-V1_99001',
          answer: {
            1: '1',
            10: '1',
            11: '1',
            12: '1',
            13: '2',
            14: '2',
            15: '2',
            16: '2',
            17: '2',
            18: '2',
            19: '2',
            2: '1',
            20: '2',
            21: '2',
            22: '2',
            23: '2',
            24: '2',
            25: '3',
            26: '3',
            27: '3',
            28: '3',
            29: '3',
            3: '1',
            30: '3',
            31: '3',
            32: '3',
            33: '3',
            34: '3',
            35: '3',
            36: '3',
            37: '4',
            38: '4',
            39: '4',
            4: '1',
            40: '4',
            41: '4',
            42: '4',
            43: '4',
            44: '4',
            45: '4',
            46: '4',
            47: '4',
            48: '4',
            49: '5',
            5: '1',
            50: '5',
            51: '5',
            52: '5',
            53: '5',
            54: '5',
            55: '5',
            56: '5',
            57: '5',
            58: '5',
            59: '5',
            6: '1',
            60: '5',
            7: '1',
            8: '1',
            9: '1',
          },
          hasWarning: false,
          insight: {},
          corners: "{\"BOTTOM_RIGHT\":{\"x\":2200.0,\"y\":3169.0},\"TOP_RIGHT\":{\"x\":2215.0,\"y\":275.0},\"BOTTOM_LEFT\":{\"x\":245.0,\"y\":3171.0},\"TOP_LEFT\":{\"x\":243.0,\"y\":277.0}}",
        }
      );
    });
    it('empty seat should return connect1 rawAnswer', async () => {
      grader.toRawAnswer({ exam })({
        ...connect1Answer,
        "[seat] 1": "",
        "[seat] 2": "",
        "[seat] 3": "",
        "[seat] 4": "",
        "[seat] 5": "",
      }, cb);
      cb.should.have.been.calledWith(sinon.match.typeOf('null'), {
          examId: 'c4754a00-0236-11e7-8160-a5070a0fca65',
          seat: 0,
          sheetCode: GAT_CONNECT_PART1_SHEET_CODE,
          filename: 'GAT-C1-V1_90001',
          answer: {
            1: ['03A', '05A', '', ''],
            2: ['03F', '05F', '', ''],
            3: ['99H', '', '', ''],
            4: ['03A', '05A', '', ''],
            5: ['99H', '', '', ''],
            6: ['99H', '', '', ''],
            7: ['99H', '', '', ''],
            8: ['01A', '02A', '04A', '10A'],
            9: ['01D', '06D', '07D', ''],
            10: ['03A', '05A', '', '']
          },
          hasWarning: true,
          insight: { seat: 'value' },
          corners: "{\"BOTTOM_RIGHT\":{\"x\":2216.0,\"y\":3169.0},\"TOP_RIGHT\":{\"x\":2215.0,\"y\":275.0},\"BOTTOM_LEFT\":{\"x\":245.0,\"y\":3171.0},\"TOP_LEFT\":{\"x\":243.0,\"y\":277.0}}",
        }
      );
    });
    it('invalid sheetCode should return connect1 rawAnswer', async () => {
      grader.toRawAnswer({ exam })({
        ...connect1Answer,
        "[code] 1": "3",
        "[code] 2": "3",
        "[code] 3": "3",
      }, cb);
      cb.should.have.been.calledWith(sinon.match.typeOf('null'), {
          examId: 'c4754a00-0236-11e7-8160-a5070a0fca65',
          seat: 90050,
          sheetCode: "333",
          filename: 'GAT-C1-V1_90001',
          answer: {},
          hasWarning: true,
          insight: { sheetCode: 'value' },
          corners: "{\"BOTTOM_RIGHT\":{\"x\":2216.0,\"y\":3169.0},\"TOP_RIGHT\":{\"x\":2215.0,\"y\":275.0},\"BOTTOM_LEFT\":{\"x\":245.0,\"y\":3171.0},\"TOP_LEFT\":{\"x\":243.0,\"y\":277.0}}",
        }
      );
    });
  });
  describe('checkSeat', () => {
    let result;
    beforeEach(async () => {
      result = {};
    });
    describe('seat is five digit number', () => {
      it('seat = 10000 should return result = {hasWarning=false,insight={}}', () => {
        const seat = grader.checkSeat('10000', result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
        seat.should.equal(10000);
      });
      it('seat = 99999 should return result = {hasWarning=false,insight={}}', () => {
        const seat = grader.checkSeat('99999', result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
        seat.should.equal(99999);
      });
    });
    describe('seat not five digit number', () => {
      let seats = [NaN, undefined, null, {}, [], '', '0', '91', '900', '9001', '100000'], qNum = 1,
        aNum = 1;
      for (let x = 0; x < seats.length; x += 1) {
        it(`'${seats[x]}' then result = {hasWarning=true,insight={seat: \'value\'}}`, async () => {
          const seat = grader.checkSeat(seats[x], result);
          result.should.have.property('hasWarning', true);
          result.should.have.deep.property('insight.seat', 'value');
          console.log('seat', seat);
          if (typeof seats[x] === 'string') {
            if (seats[x] === '')
              seat.should.equal(0);
            else
              seat.should.equal(parseInt(seats[x]));
          } else {
            seat.should.equal(0);
          }
        });
      }
    });
  });
  describe('checkSheetCode', () => {
    let result;
    beforeEach(async () => {
      result = {};
    });
    it('sheetCode = \'000\' should return result = {hasWarning=false,insight={}}', () => {
      grader.checkSheetCode('000', result);
      result.should.have.property('hasWarning', false);
      result.insight.should.deep.equal({});
    });
    it('sheetCode = \'001\' should return result = {hasWarning=false,insight={}}', () => {
      grader.checkSheetCode('001', result);
      result.should.have.property('hasWarning', false);
      result.insight.should.deep.equal({});
    });
    it('sheetCode = \'002\' should return result = {hasWarning=false,insight={}}', () => {
      grader.checkSheetCode('002', result);
      result.should.have.property('hasWarning', false);
      result.insight.should.deep.equal({});
    });
    it('sheetCode = \'003\' should return result = {hasWarning=true,insight={sheetCode:\'value\'}}', () => {
      grader.checkSheetCode('003', result);
      result.should.have.property('hasWarning', true);
      result.should.have.deep.property('insight.sheetCode', 'value');
    });
  });
  describe('checkConnectAnswerItem', () => {
    let result;
    beforeEach(async () => {
      result = {};
    });
    describe('empty string', () => {
      let answer = '', qNum = 1, aNum = 1;
      it("then result.hasWarning equal false", async () => {
        grader.checkConnectAnswerItem(qNum, aNum, answer, result);
        result.should.have.property('hasWarning', false);
      });
      it("then result.insight is empty", async () => {
        grader.checkConnectAnswerItem(qNum, aNum, answer, result);
        result.insight.should.deep.equal({});
      });
    });
    describe('correct answer', () => {
      let qNum = 1, aNum = 1;
      for (let x = 1; x <= 20; x += 1) {
        let answer = `${x}A`.padZero(3);
        it(`${answer} then result = {hasWarning=false,insight={}}`, async () => {
          grader.checkConnectAnswerItem(qNum, aNum, answer, result);
          result.should.have.property('hasWarning', false);
          result.insight.should.deep.equal({});
        });
        let answer2 = `${x}D`.padZero(3);
        it(`${answer2} then result = {hasWarning=false,insight={}}`, async () => {
          grader.checkConnectAnswerItem(qNum, aNum, answer2, result);
          result.should.have.property('hasWarning', false);
          result.insight.should.deep.equal({});
        });
        let answer3 = `${x}F`.padZero(3);
        it(`${answer3} then result = {hasWarning=false,insight={}}`, async () => {
          grader.checkConnectAnswerItem(qNum, aNum, answer3, result);
          result.should.have.property('hasWarning', false);
          result.insight.should.deep.equal({});
        });
      }
      let answer4 = '99H';
      it(`${answer4} then result = {hasWarning=false,insight={}}`, async () => {
        grader.checkConnectAnswerItem(qNum, aNum, answer4, result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
      });
    });
    describe('incorrect length', () => {
      let answers = ['A', '1A', '123A'], qNum = 1, aNum = 1;
      for (let x = 0; x < answers.length; x += 1) {
        it(`${answers[x]} then result = {hasWarning=true,insight={1:{1:\'length\'}}}`, async () => {
          grader.checkConnectAnswerItem(qNum, aNum, answers[x], result);
          result.should.have.property('hasWarning', true);
          result.should.have.deep.property('insight.1.1', 'length');
        });
      }
    });
    describe('incorrect value', () => {
      let qNum = 1, aNum = 1;
      let answers = ['00A', '00D', '00F', '00H', // lower
        '21A', '21D', '21F', '21H', // over
        '01B', '01C', '01E', '01G', '01I', '01J', // type
        '_1A', '2_D', '20_', '___', // partial empty
      ];
      for (let x = 0; x < answers.length; x += 1) {
        it(`${answers[x]} then result = {hasWarning=true,insight={1:{1:\'value\'}}}`, async () => {
          grader.checkConnectAnswerItem(qNum, aNum, answers[x], result);
          result.should.have.property('hasWarning', true);
          result.should.have.deep.property('insight.1.1', 'value');
        });
      }
    });
  });
  describe('checkConnectAnswer', () => {
    let result, qNum = 1;
    beforeEach(async () => {
      result = {};
      qNum = 1;
    });
    describe('correct answer', () => {
      it(`['01A','','',''] then result = {hasWarning=false,insight={}}`, async () => {
        grader.checkConnectAnswer(qNum, ['01A', '', '', ''], result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
      });
      it(`['','01A','',''] then result = {hasWarning=false,insight={}}`, async () => {
        grader.checkConnectAnswer(qNum, ['', '01A', '', ''], result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
      });
      it(`['','','01A',''] then result = {hasWarning=false,insight={}}`, async () => {
        grader.checkConnectAnswer(qNum, ['', '', '01A', ''], result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
      });
      it(`['','','','01A'] then result = {hasWarning=false,insight={}}`, async () => {
        grader.checkConnectAnswer(qNum, ['', '', '', '01A'], result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
      });
    });
    describe('incorrect length', () => {
      it(`[''] then result = {hasWarning=true,insight={1:{value:\'length\'}}}`, async () => {
        grader.checkConnectAnswer(qNum, [''], result);
        result.should.have.property('hasWarning', true);
        result.should.have.deep.property('insight.1.value', 'length');
      });
      it(`['','','','',''] then result = {hasWarning=true,insight={1:{value:\'length\'}}}`, async () => {
        grader.checkConnectAnswer(qNum, ['', '', '', '', ''], result);
        result.should.have.property('hasWarning', true);
        result.should.have.deep.property('insight.1.value', 'length');
      });
    });
    describe('incorrect value', () => {
      let qNum = 1;
      it(`['','','',''] then result = {hasWarning=true,insight={1:{value:\'value/blank\'}}}`, async () => {
        grader.checkConnectAnswer(qNum, ['', '', '', ''], result);
        result.should.have.property('hasWarning', true);
        result.should.have.deep.property('insight.1.value', 'value/blank');
      });
      it(`not array then result = {hasWarning=true,insight={1:{value:\'value/notArray\'}}}`, async () => {
        grader.checkConnectAnswer(qNum, '', result);
        result.should.have.property('hasWarning', true);
        result.should.have.deep.property('insight.1.value', 'value/notArray');
      });
    });
  });
  describe('checkEnglishAnswer', () => {
    let result, qNum = 1;
    beforeEach(async () => {
      result = {};
      qNum = 1;
    });
    describe('correct answer', () => {
      it(`'1' then result = {hasWarning=false,insight={}}`, async () => {
        grader.checkEnglishAnswer(qNum, '1', result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
      });
      it(`'2' then result = {hasWarning=false,insight={}}`, async () => {
        grader.checkEnglishAnswer(qNum, '2', result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
      });
      it(`'3' then result = {hasWarning=false,insight={}}`, async () => {
        grader.checkEnglishAnswer(qNum, '3', result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
      });
      it(`'4' then result = {hasWarning=false,insight={}}`, async () => {
        grader.checkEnglishAnswer(qNum, '4', result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
      });
      it(`'5' then result = {hasWarning=false,insight={}}`, async () => {
        grader.checkEnglishAnswer(qNum, '5', result);
        result.should.have.property('hasWarning', false);
        result.insight.should.deep.equal({});
      });
    });
    describe('incorrect answer', () => {
      let qNum = 1;
      it(`['','','',''] then result = {hasWarning=true,insight={1:{value:\'value\'}}}`, async () => {
        grader.checkEnglishAnswer(qNum, ['', '', '', ''], result);
        result.should.have.property('hasWarning', true);
        result.should.have.deep.property('insight.1.value', 'value');
      });
      it(`'' then result = {hasWarning=true,insight={1:{value:\'value/blank\'}}}`, async () => {
        grader.checkEnglishAnswer(qNum, '', result);
        result.should.have.property('hasWarning', true);
        result.should.have.deep.property('insight.1.value', 'value/blank');
      });
      let answers = ['0', '6', '7'];
      for (let x = 0; x < answers.length; x += 1) {
        it(`${answers[x]} then result = {hasWarning=true,insight={1:{value:\'value\'}}}`, async () => {
          grader.checkEnglishAnswer(qNum, answers[x], result);
          result.should.have.property('hasWarning', true);
          result.should.have.deep.property('insight.1.value', 'value');
        });
      }
    });
  });
  describe('toAnswer', () => {
    let answerKey;
    beforeEach(async () => {
      answerKey = {
        section: 'connect', // could be object or string
        subsection: 'article1', // could be object or string
        description: {
          1: 'การเลือกตั้ง',
          2: 'ความขัดแย้งทางการเมือง',
          3: 'ภาพรวมเศรษฐกิจดีขึ้น',
          4: 'ภาพลักษณ์ประเทศดีขึ้น',
          5: 'ประเทศไทยเกิดเสถียรภาพ',
          6: 'การปรองดองสมานฉันท์',
          7: 'การร่างรัฐธรรมนูญ',
          8: 'ผลโหวตเห็นชอบรับร่างรัฐธรรมนูญ',
          9: 'Roadmap',
          10: 'ภาคธุรกิจโดยรวมขยายตัว',
        },
        answer: {
          1: ['03A', '05A'],
          2: ['03F', '05F'],
          3: ['99H'],
          4: ['03A', '05A'],
          5: ['99H'],
          6: ['99H'],
          7: ['99H'],
          8: ['01A', '02A', '04A', '10A'],
          9: ['01D', '06D', '07D'],
          10: ['03A', '50A']
        },
        fullScore: {
          1: 8.33,
          2: 8.33,
          3: 4.17,
          4: 8.33,
          5: 4.17,
          6: 4.17,
          7: 4.17,
          8: 16.67,
          9: 12.50,
          10: 8.33,
        },
        score: {
          correct: 4.1667,
          wrong: 3,
        },
      };
    });
    describe('no answer', () => {
      it('should return []', async () => {
        grader.toAnswer({}, { exam, answerKey }).should.be.lengthOf(0);
        grader.toAnswer({ answer: [] }, { exam, answerKey }).should.be.lengthOf(0);
        grader.toAnswer({ answer: null }, { exam, answerKey }).should.be.lengthOf(0);
        grader.toAnswer({ answer: undefined }, { exam, answerKey }).should.be.lengthOf(0);
        grader.toAnswer({ answer: {} }, { exam, answerKey }).should.be.lengthOf(0);
      });
    });
    describe('1 connect answer', () => {
      it('should return array length of 1', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART1_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey });
        answer.should.be.lengthOf(1);
      });
      it('should have examId = constant.exam.id', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART1_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey });
        answer[0].should.have.deep.property('examId', exam.id);
      });
      it('should have sheetCode = rawAnswer.sheetCode', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey });
        answer[0].should.have.deep.property('sheetCode', GAT_CONNECT_PART2_SHEET_CODE);
      });

      it('should have section = answerKey.section', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey: { ...answerKey, section: 'connect' } });
        answer[0].should.have.deep.property('section', 'connect');
      });
      it('should have section = answerKey.section.key', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey: { ...answerKey, section: { 1: 'abtesting' } } });
        answer[0].should.have.deep.property('section', 'abtesting');
      });
      it('should have section = null', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey: { ...answerKey, section: undefined } });
        answer[0].should.have.deep.property('section', null);
      });

      it('should have subsection = answerKey.subsection', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey: { ...answerKey, subsection: 'reading' } });
        answer[0].should.have.deep.property('subsection', 'reading');
      });
      it('should have subsection = answerKey.subsection', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey: { ...answerKey, subsection: { 1: 'vocabulary' } } });
        answer[0].should.have.deep.property('subsection', 'vocabulary');
      });
      it('should have subsection = null', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey: { ...answerKey, subsection: undefined } });
        answer[0].should.have.deep.property('subsection', null);
      });

      it('should have question = \'1\'', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey });
        answer[0].should.have.deep.property('question', '1');
      });

      it('should have answer = [\'01A\']', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A'] },
        }, { exam, answerKey });
        answer[0].answer.should.have.deep.equal(['01A']);
      });
      it('should sort answer', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['03A', '01D', '01A'] },
        }, { exam, answerKey });
        answer[0].answer.should.have.deep.equal(['01A', '01D', '03A']);
      });
      it('should sort answer (underscore will the end)', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['03A', '01D', '_1A', ''] },
        }, { exam, answerKey });
        answer[0].answer.should.have.deep.equal(['01D', '03A', '_1A', '']);
      });

      describe('1 correct answer item, full score', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A', '', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01A'] },
            score: { correct: 4.1667, wrong: 3 },
          }
        });
        it('should set score to 4.1667', async () => {
          answer[0].should.have.deep.property('score', 4.1667);
        });
        it('should set note to [\'\',\'\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['', '', '', '']);
        });
        it('should set isCorrect to true', async () => {
          answer[0].should.have.deep.property('isCorrect', true);
        });
      });
      describe('1 correct answer item, full score(2)', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 2: ['99H', '', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 2: ['99H'] },
            score: { correct: 4.1667, wrong: 3 },
          }
        });
        it('should set score to 4.1667', async () => {
          answer[0].should.have.deep.property('score', 4.1667);
        });
        it('should set note to [\'\',\'\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['', '', '', '']);
        });
        it('should set isCorrect to true', async () => {
          answer[0].should.have.deep.property('isCorrect', true);
        });
      });

      describe('1 correct answer item, not full score', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A', '', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01A', '02D'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 4.1667', async () => {
          answer[0].should.have.deep.property('score', 4.1667);
        });
        it('should set note to [\'\',\'M\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['', 'M', '', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });

      describe('2 correct answer items, full score', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A', '02A', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01A', '02A'] },
            score: { correct: 4.1667, wrong: 3 },
          }
        });
        it('should set score to 8.3334', async () => {
          answer[0].should.have.deep.property('score', 8.3334);
        });
        it('should set note to [\'\',\'\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['', '', '', '']);
        });
        it('should set isCorrect to true', async () => {
          answer[0].should.have.deep.property('isCorrect', true);
        });
      });

      describe('1 correct, 1 wrong(type) answer item at first item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A', '02A', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01F', '02A'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 1.1667', async () => {
          answer[0].should.have.deep.property('score', 1.1667);
        });
        it('should set note to [\'I\',\'\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['I', '', '', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });
      describe('1 correct, 1 wrong(missing) answer item at first item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['02A', '', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01F', '02A'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 4.1667', async () => {
          answer[0].should.have.deep.property('score', 4.1667);
        });
        it('should set note to [\'\',\'M\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['', 'M', '', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });
      describe('1 correct, 1 wrong(extra) answer item at first item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A', '03A', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['03A'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 1.1667', async () => {
          answer[0].should.have.deep.property('score', 1.1667);
        });
        it('should set note to [\'E\',\'\',\'\',\'\']', async () => {
          it('should set score to 1.1667', async () => {
            answer[0].note.should.have.deep.equal(['E', '', '', '']);
          });
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });

      describe('1 correct, 1 wrong(type) answer item at second item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A', '02A', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01A', '02B'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 1.1667', async () => {
          answer[0].should.have.deep.property('score', 1.1667);
        });
        it('should set note to [\'\',\'I\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['', 'I', '', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });
      describe('1 correct, 1 wrong(missing) answer item at second item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A', '', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01A', '02B'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 4.1667', async () => {
          answer[0].should.have.deep.property('score', 4.1667);
        });
        it('should set note to [\'\',\'M\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['', 'M', '', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });
      describe('1 correct, 1 wrong(extra) answer item at second item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A', '03D', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01A'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 1.1667', async () => {
          answer[0].should.have.deep.property('score', 1.1667);
        });
        it('should set note to [\'\',\'E\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['', 'E', '', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });

      describe('1 wrong(type) answer item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A', '', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01D'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 0', async () => {
          answer[0].should.have.deep.property('score', 0);
        });
        it('should set note to [\'I\',\'\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['I', '', '', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });
      describe('1 wrong(missing) answer item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['', '', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01D'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 0', async () => {
          answer[0].should.have.deep.property('score', 0);
        });
        it('should set note to [\'M\',\'\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['M', '', '', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });
      describe('1 wrong(extra) answer item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['02A', '', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01D'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 0', async () => {
          answer[0].should.have.deep.property('score', 0);
        });
        it('should set note to [\'E\',\'M\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['E', 'M', '', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });

      describe('duplicate correct answer (duplicated treat as wrong)', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['01A', '01A', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01A'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 1.1667', async () => {
          answer[0].should.have.deep.property('score', 1.1667);
        });
        it('should set note to [\'\',\'E\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['', 'E', '', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });

      describe('invalid answer item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART2_SHEET_CODE,
          answer: { 1: ['_1A', '', '', ''] },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: ['01A', '02D'] },
            score: { correct: 4.1667, wrong: -3 },
          }
        });
        it('should set score to 0', async () => {
          answer[0].should.have.deep.property('score', 0);
        });
        it('should set note to [\'\',\'E\',\'\',\'\']', async () => {
          answer[0].note.should.have.deep.equal(['E', 'M', 'M', '']);
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });
    });
    // assumed that rawAnswer from FormScanner will have value in every questions and will be
    // ''(empty string) by default.
    // Therefore toAnswer() do not need to add default record.
    describe('2 Connecting answers', () => {
      it('should return array length of 2', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART1_SHEET_CODE,
          answer: { 1: ['01A'], 2: ['99H'] },
        }, { exam, answerKey });
        answer.should.be.lengthOf(2);
      });
      it('should return array length of 2(2)', async () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_CONNECT_PART1_SHEET_CODE,
          answer: { 3: ['02A'], 4: ['01D'] },
        }, { exam, answerKey });
        answer.should.be.lengthOf(2);
      });
    });
    describe('1 English answer', () => {
      let rawAnswer = null;
      beforeEach(async () => {
        rawAnswer = {
          sheetCode: GAT_ENGLISH_SHEET_CODE,
          answer: { 1: '5' },
        };
      });
      it('should return array length of 1', async () => {
        const answer = grader.toAnswer(rawAnswer, { exam, answerKey });
        answer.should.be.lengthOf(1);
      });
      it('should have examId = constant.exam.id', async () => {
        const answer = grader.toAnswer(rawAnswer, { exam, answerKey });
        answer[0].should.have.deep.property('examId', exam.id);
      });
      it('should have sheetCode = rawAnswer.sheetCode', async () => {
        const answer = grader.toAnswer(rawAnswer, { exam, answerKey });
        answer[0].should.have.deep.property('sheetCode', GAT_ENGLISH_SHEET_CODE);
      });

      it('should have section = answerKey.section', async () => {
        const answer = grader.toAnswer(rawAnswer, {
          exam,
          answerKey: { ...answerKey, section: 'english' }
        });
        answer[0].should.have.deep.property('section', 'english');
      });
      it('should have section = answerKey.section.key', async () => {
        const answer = grader.toAnswer(rawAnswer, {
          exam, answerKey: {
            ...answerKey,
            section: { 1: 'conversation' }
          }
        });
        answer[0].should.have.deep.property('section', 'conversation');
      });
      it('should have section = null', async () => {
        const answer = grader.toAnswer(rawAnswer, {
          exam,
          answerKey: { ...answerKey, section: undefined }
        });
        answer[0].should.have.deep.property('section', null);
      });

      it('should have subsection = answerKey.subsection', async () => {
        const answer = grader.toAnswer(rawAnswer, {
          exam,
          answerKey: { ...answerKey, subsection: 'reading' }
        });
        answer[0].should.have.deep.property('subsection', 'reading');
      });
      it('should have subsection = answerKey.subsection', async () => {
        const answer = grader.toAnswer(rawAnswer, {
          exam, answerKey: {
            ...answerKey,
            subsection: { 1: 'vocabulary' }
          }
        });
        answer[0].should.have.deep.property('subsection', 'vocabulary');
      });
      it('should have subsection = null', async () => {
        const answer = grader.toAnswer(rawAnswer, {
          exam,
          answerKey: { ...answerKey, subsection: undefined }
        });
        answer[0].should.have.deep.property('subsection', null);
      });

      it('should have question = \'1\'', async () => {
        const answer = grader.toAnswer(rawAnswer, { exam, answerKey });
        answer[0].should.have.deep.property('question', '1');
      });

      it('should have answer = [\'5\']', async () => {
        const answer = grader.toAnswer(rawAnswer, { exam, answerKey });
        answer[0].answer.should.have.deep.equal('5');
      });
      describe('1 correct answer item, full score', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_ENGLISH_SHEET_CODE,
          answer: { 1: '5' },
        }, {
          exam, answerKey: {
            ...answerKey,
            answer: { 1: '5' },
            score: { correct: 2.5, wrong: 0 },
          }
        });
        it('should set score to 2.5', async () => {
          answer[0].should.have.deep.property('score', 2.5);
        });
        it('should set note to \'\'', async () => {
          answer[0].note.should.have.equal('');
        });
        it('should set isCorrect to true', async () => {
          answer[0].should.have.deep.property('isCorrect', true);
        });
      });
      describe('1 correct answer item, full score(2)', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_ENGLISH_SHEET_CODE,
          answer: { 2: '2' },
        }, {
          exam, answerKey: {
            ...answerKey,
            answer: { 2: '2' },
            score: { correct: 2.5, wrong: 0 },
          }
        });
        it('should set score to 2.5', async () => {
          answer[0].should.have.deep.property('score', 2.5);
        });
        it('should set note to \'\'', async () => {
          answer[0].note.should.have.equal('');
        });
        it('should set isCorrect to true', async () => {
          answer[0].should.have.deep.property('isCorrect', true);
        });
      });

      describe('1 wrong answer item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_ENGLISH_SHEET_CODE,
          answer: { 1: '1' },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: '5' },
            score: { correct: 2.5, wrong: 0 },
          }
        });
        it('should set score to 0', async () => {
          answer[0].should.have.deep.property('score', 0);
        });
        it('should set note to \'\'', async () => {
          answer[0].note.should.have.equal('');
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });
      describe('1 wrong answer item(2)', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_ENGLISH_SHEET_CODE,
          answer: { 2: '4' },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 2: '1' },
            score: { correct: 2.5, wrong: 0 },
          }
        });
        it('should set score to 0', async () => {
          answer[0].should.have.deep.property('score', 0);
        });
        it('should set note to \'\'', async () => {
          answer[0].note.should.have.equal('');
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });

      describe('invalid answer item', () => {
        const answer = grader.toAnswer({
          sheetCode: GAT_ENGLISH_SHEET_CODE,
          answer: { 1: '7' },
        }, {
          exam, answerKey: {
            ...answerKey, answer: { 1: '5' },
            score: { correct: 2.5, wrong: 0 },
          }
        });
        it('should set score to 0', async () => {
          answer[0].should.have.deep.property('score', 0);
        });
        it('should set note to \'\'', async () => {
          answer[0].note.should.have.equal('');
        });
        it('should set isCorrect to false', async () => {
          answer[0].should.have.deep.property('isCorrect', false);
        });
      });
    });
  });
});
