const { Console } = require("@woowacourse/mission-utils");
const { LOTTO_RANGE, INPUT_MESSAGE, OUTPUT_MESSAGE } = require("./constants");
const BonusNumber = require("./domain/BonusNumber");
const ProfitRate = require("./domain/ProfitRate.");
const Payment = require("./domain/Payment");
const WinnerNumber = require("./domain/WinnerNumber");
const Statistics = require("./domain/Statistics");

class App {
  constructor() {
    this.totalLottoNumber = [];
    this.winnerNumber = [];
    this.payMoney = 0;
    this.bonusNumber = 0;
  }

  play() {
    this.inputMoney();
  }

  inputMoney() {
    Console.readLine(INPUT_MESSAGE.paymentAmount, (money) => {
      const lottoTickets = money / LOTTO_RANGE.pricePerLotto;

      this.payMoney = money;
      this.totalLottoNumber = new Payment(this.payMoney).getLottoNumber(lottoTickets);

      Console.print(OUTPUT_MESSAGE.amountLotto(lottoTickets));
      this.inputWinnerNumber();
    });
  }

  inputWinnerNumber() {
    Console.readLine(INPUT_MESSAGE.winnerNumber, (number) => {
      this.winnerNumber = new WinnerNumber(number).getNumberWithoutSpace();
      this.inputBonusNumber();
    });
  }

  inputBonusNumber() {
    Console.readLine(INPUT_MESSAGE.bonusNumber, (number) => {
      this.bonusNumber = new BonusNumber(number).getBonusNumberWithoutSpace(number);
      this.loadStatisticsAboutLotto();
    });
  }

  loadStatisticsAboutLotto() {
    Console.print(OUTPUT_MESSAGE.lottoResultAlarm);
    const statistics = new Statistics(this.totalLottoNumber, this.winnerNumber, this.bonusNumber);
    const lottoResult = statistics.getResultOfThreeToFiveMatchingNumbers();
    statistics.printLottoResult(lottoResult);
    this.loadLottoProfitRate(lottoResult);
  }

  loadLottoProfitRate(lottoResult) {
    const lottoProfitRate = new ProfitRate(lottoResult, this.payMoney).getProfitRate();
    Console.print(OUTPUT_MESSAGE.profitRate(lottoProfitRate));
    Console.close();
  }
}

const app = new App();
app.play();
module.exports = App;
