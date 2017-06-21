import chai from "chai";
import { add } from "../StringCalculator";

let should = chai.should();
describe("String Calculator", () => {
  describe("add()", () => {
    describe("Requirement 1: The method can take 0, 1 or 2 numbers separated by comma (,)", () => {
      // it("MoreThan2NumbersAreUsed", () => {
      //   add("1,2,3").should.be.false;
      // });
      it('add("1,x")should throw error', () => {
        (() => {
          add("1,x");
        }).should.throw(Error, "error");
      });
    });

    describe("Requirement 2: For an empty string the method will return 0", () => {
      it('add("") should be equal 0', () => {
        add("").should.be.equal(0);
      });
    });

    describe("Requirement 3: Method will return their sum of numbers", () => {
      it('add("3") should be equal 3', () => {
        add("3").should.be.equal(3);
      });
      it('add("3,6") should be equal 3 + 6', () => {
        add("3,6").should.be.equal(3 + 6);
      });
    });

    describe("Requirement 4: Allow the Add method to handle an unknown amount of numbers", () => {
      it('add("3,6,15,18,46,33") should be equal 3 + 6 + 15 + 18 + 46 + 33', () => {
        add("3,6,15,18,46,33").should.be.equal(3 + 6 + 15 + 18 + 46 + 33);
      });
    });

    describe("Requirement 5: Allow the Add method to handle new lines between numbers (instead of commas)", () => {
      it('add("3,6\\n15") should be equal 3 + 6 + 15', () => {
        add("3,6\n15").should.be.equal(3 + 6 + 15);
      });
    });

    describe("Requirement 6: Support different delimiters", () => {
      it('add("//;\\n3;6;15") should be equal 3 + 6 + 15', () => {
        add("//;\n3;6;15").should.be.equal(3 + 6 + 15);
      });
    });

    describe("Requirement 7: Negative numbers will be false", () => {
      it('add("3,-6,15,18,46,33") should be false', () => {
        (() => {
          add("3,-6,15,18,46,33");
        }).should.throw(Error, "error", "negativeNumbers error");
      });
      it('add("3,-6,15,-18,46,33") should be false', () => {
        (() => {
          add("3,-6,15,-18,46,33");
        }).should.throw(Error, "error", "negativeNumbers error");
      });
    });

    describe("Requirement 8: Numbers bigger than 1000 should be ignored", () => {
      it('add("3,1000,1001,6,1234") should be equal 3 + 1000 + 6', () => {
        add("3,1000,1001,6,1234").should.be.equal(3 + 1000 + 6);
      });
    });

    describe("Requirement 9: Delimiters can be of any length", () => {
      it('add("//[--]\\n1--2--3") should be equal 1 + 2 + 3', () => {
        add("//[--]\n1--2--3").should.be.equal(1 + 2 + 3);
      });
    });

    describe("Requirement 10: Allow multiple delimiters", () => {
      it('add("//[-][%]\\n1-2%3") should be equal 1 + 2 + 3', () => {
        add("//[-][%]\n1-2%3").should.be.equal(1 + 2 + 3);
      });
    });

    describe("Requirement 11: Make sure you can also handle multiple delimiters with length longer than one char", () => {
      it('add("//[---][%%%]\\n1---2%%%3") should be equal 1 + 2 + 3', () => {
        add("//[---][%%%]\n1---2%%%3").should.be.equal(1 + 2 + 3);
      });
      it('add("//[[---]][[[%%%]\\n1---2%%%3") should be equal 1 + 2 + 3', () => {
        add("//[[---]][[[%%%]\n1---2%%%3").should.be.equal(1 + 2 + 3);
      });
    });

    // describe("Each number in strings", () => {
    //   describe("Typeof number", () => {
    //     strings.forEach((string, index) => {
    //       it("number " + index + " should be a typeof number", () => {
    //         string.should.be.a("number");
    //         string.should.not.be.NaN;
    //       });
    //     });
    //   });
    // });
  });
});
