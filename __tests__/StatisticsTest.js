const Statistics = require("../src/Statistics");

const totalLottoNumber = [
  [1, 5, 6, 10, 11, 13],
  [1, 2, 3, 4, 5, 6],
];

const winnerNumber = [1, 5, 6, 10, 11, 12];

const numbers = [1, 5, 6, 10, 11, 13];

describe("compareBonus Number Test", () => {
  test("bonus number가 포함되어 있을경우 결과값이 4인경우 Test", () => {
    const bonusNumber = [12];
    const statistics = new Statistics(totalLottoNumber, winnerNumber, bonusNumber);
    const result = statistics.compareWithBonusNumber(numbers);
    expect(result).toBe(4);
  });

  test("bonus number가 포함되어 있을경우 결과값이 5인경우 Test", () => {
    const bonusNumber = [13];
    const statistics = new Statistics(totalLottoNumber, winnerNumber, bonusNumber);
    const result = statistics.compareWithBonusNumber(numbers);
    expect(result).toBe(5);
  });
});
