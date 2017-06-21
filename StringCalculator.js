function add(strings) {
  let delimiter = /,|\n/;
  let stringsWithoutDelimiter = strings;
  if (strings.startsWith("//")) {
    let delimiterIndex = strings.indexOf("//") + 2;
    delimiter = strings
      //slice string between // and \n i.e. //[--][%]\n => [--][%]
      .slice(delimiterIndex, strings.indexOf("\n"))
      //split [] i.e. [--][%] => '',--,'',%,''
      .split(/\[|\]/)
      //filter '' out i.e. '',--,'',%,'' => --,%
      .filter(key => key != "")
      //join array with | i.e. --,% => --|%
      .join("|");
    //create regular expression i.e. --|% => /--|%/
    delimiter = new RegExp(delimiter);
    stringsWithoutDelimiter = strings.slice(strings.indexOf("\n") + 1);
  }
  // console.log(
  //   "stringsWithoutDelimiter => " +
  //     stringsWithoutDelimiter +
  //     "\ndelimiter => " +
  //     delimiter
  // );
  return addWithDelimiter(stringsWithoutDelimiter, delimiter);
}

function addWithDelimiter(strings, delimiter) {
  let numbersArray = strings.split(delimiter).map(number => Number(number));
  //console.log("numbersArray => " + numbersArray);
  //if (numbersArray.length > 2) return false;
  for (let i = 0; i < numbersArray.length; i++) {
    if (isNaN(numbersArray[i])) throw new Error("nonNumbers error");
  }
  let sum = numbersArray
    .filter(val => val > 0 && val <= 1000)
    .reduce((prev, curr) => prev + curr, 0);
  //console.log("sum => " + sum);
  let negativeNumbers = numbersArray.filter(val => val < 0);
  //console.log(negativeNumbers);
  if (negativeNumbers.length > 0) {
    //console.log(`          [${negativeNumbers}]`);
    throw new Error("negativeNumbers error");
  }
  return sum;
}

export { add };
