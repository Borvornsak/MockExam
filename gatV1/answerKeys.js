import path from 'path';
import {
  GAT_CONNECT_PART1_SHEET_CODE, GAT_CONNECT_PART2_SHEET_CODE,
  GAT_ENGLISH_SHEET_CODE
} from '../constant';

// initial value
const answerKeys = {
  // GAT connect part 1
  [GAT_CONNECT_PART1_SHEET_CODE]: {
    section: 'connect', // could be object or string
    subsection: 'article1', // could be object or string
    title: '',
    description: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
    },
    answer: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
    },
    totalScore: 70.83,
    fullScore: {
      1: 12.50,
      2: 16.67,
      3: 4.17,
      4: 4.17,
      5: 4.17,
      6: 4.17,
      7: 8.33,
      8: 8.33,
      9: 4.17,
      10: 4.17,
    },
    score: {
      correct: 4.1667,
      wrong: -3,
    },
    suggestion: {
      I: "",
      M: "",
      E: "",
      IM: "",
      EI: "",
      EM: "",
      EIM: "",
      "": "",
    }
  },
  // GAT connect part 2
  [GAT_CONNECT_PART2_SHEET_CODE]: {
    section: 'connect', // could be object or string
    subsection: 'article2', // could be object or string
    title: '',
    description: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
    },
    answer: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
    },
    totalScore: 70.83,
    fullScore: {
      1: 12.50,
    },
    score: {
      correct: 4.1667,
      wrong: -3,
    },
    suggestion: {
      I: "",
      M: "",
      E: "",
      IM: "",
      EI: "",
      EM: "",
      EIM: "",
      "": "",
    }
  },
  // GAT english
  [GAT_ENGLISH_SHEET_CODE]: {
    section: 'english',
    subsection: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      11: '',
      12: '',
      13: '',
      14: '',
      15: '',
      16: '',
      17: '',
      18: '',
      19: '',
      20: '',
      21: '',
      22: '',
      23: '',
      24: '',
      25: '',
      26: '',
      27: '',
      28: '',
      29: '',
      30: '',
      31: '',
      32: '',
      33: '',
      34: '',
      35: '',
      36: '',
      37: '',
      38: '',
      39: '',
      40: '',
      41: '',
      42: '',
      43: '',
      44: '',
      45: '',
      46: '',
      47: '',
      48: '',
      49: '',
      50: '',
      51: '',
      52: '',
      53: '',
      54: '',
      55: '',
      56: '',
      57: '',
      58: '',
      59: '',
      60: '',
    },
    title: '',
    answer: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      11: '',
      12: '',
      13: '',
      14: '',
      15: '',
      16: '',
      17: '',
      18: '',
      19: '',
      20: '',
      21: '',
      22: '',
      23: '',
      24: '',
      25: '',
      26: '',
      27: '',
      28: '',
      29: '',
      30: '',
      31: '',
      32: '',
      33: '',
      34: '',
      35: '',
      36: '',
      37: '',
      38: '',
      39: '',
      40: '',
      41: '',
      42: '',
      43: '',
      44: '',
      45: '',
      46: '',
      47: '',
      48: '',
      49: '',
      50: '',
      51: '',
      52: '',
      53: '',
      54: '',
      55: '',
      56: '',
      57: '',
      58: '',
      59: '',
      60: '',
    },
    totalScore: 150.00,
    conversationScore: 37.5,
    vocabularyScore: 37.5,
    structureAndWritingScore: 37.5,
    readingScore: 37.5,
    score: {
      correct: 2.5,
      wrong: 0,
    },
    suggestion: {
      30: "",
      90: "",
      150: "",
    }
  },
  reportInfo: {
    totalScore: 300.00,
    associateSolutionImage1: 'img/associate-solution-1.png',
    associateSolutionImage2: 'img/associate-solution-2.png',
  },
};

try {
  answerKeys[GAT_CONNECT_PART1_SHEET_CODE] = require(path.join(__dirname, '../../resources/gatV1/connectPart1.json'));
} catch (e) {
  console.log('No connectPart1 answer sheets found used default one');
}

try {
  answerKeys[GAT_CONNECT_PART2_SHEET_CODE] = require(path.join(__dirname, '../../resources/gatV1/connectPart2.json'));
} catch (e) {
  console.log('No connectPart2 answer sheets found used default one');
}

try {
  answerKeys[GAT_ENGLISH_SHEET_CODE] = require(path.join(__dirname, '../../resources/gatV1/english.json'));
} catch (e) {
  console.log('No english answer sheets found used default one');
}

try {
  answerKeys.reportInfo = require(path.join(__dirname, '../../resources/gatV1/reportInfo.json'));
} catch (e) {
  console.log('No report info found used default one');
}

export default answerKeys;