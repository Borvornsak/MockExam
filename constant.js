import mysql from 'mysql';

export const exam = {
  id: 'c4754a00-0236-11e7-8160-a5070a0fca65', // GAT 2017 round 1
  type: 'gatV1', // working folder name
  date: '25 มิถุนายน 2560',
  location: 'ศูนย์สอบกรุงเทพฯ'
};

export const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 4008,
  user: 'mx-api',
  password: 'h65GxCXvWZr7kKas',
  database: 'mock_exam_staging'
});

export const GAT_CONNECT_PART1_SHEET_CODE = '000';
export const GAT_CONNECT_PART2_SHEET_CODE = '001';
export const GAT_ENGLISH_SHEET_CODE = '002';
