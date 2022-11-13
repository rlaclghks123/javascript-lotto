const { Console, Random } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const WinnerNumber = require("./WinnerNumber");
const MatchingNumber = require("./MatchingNumber");
const ProfitRate = require("./ProfitRate.");

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
    Console.readLine("구입금액을 입력해 주세요.\n", (money) => {
      this.payMoney = money;
      this.validateInputMoney(this.payMoney);
      this.getLottoNumber(this.payMoney / 1000);
      this.inputWinnerNumber();
    });
  }

  validateInputMoney(payMoney) {
    if (payMoney % 1000 !== 0 || payMoney === "0") {
      throw new Error("[ERROR] 구입 금액은 1000원 단위 입니다.");
    }
  }

  getLottoNumber(lottoTickets) {
    Console.print(`\n${lottoTickets}개를 구매했습니다.`);
    for (let i = 0; i < lottoTickets; i++) {
      const randomNumber = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(randomNumber);
      this.totalLottoNumber.push(lotto.sortLotto(randomNumber));
    }
  }

  inputWinnerNumber() {
    Console.readLine("\n당첨 번호를 입력해 주세요.\n", (number) => {
      this.winnerNumber = new WinnerNumber(number).getNumberWithoutSpace();
      this.inputBonusNumber();
    });
  }

  inputBonusNumber() {
    Console.readLine("\n보너스 번호를 입력해 주세요.\n", (number) => {
      this.bonusNumber = number.replace(/\s/g, "").split(",");
      this.validateInputBonusNumber(this.bonusNumber);
      this.loadMatchingNumberAboutLotto();
    });
  }

  validateInputBonusNumber(number) {
    if (number < 1 || number > 45 || !new RegExp("^[0-9]+$").test(number)) {
      throw new Error("[ERROR] 1에서 45까지의 번호를 입력해주세요");
    }
  }

  loadMatchingNumberAboutLotto() {
    Console.print("\n당첨 통계\n---");
    const matchingNumber = new MatchingNumber(
      this.totalLottoNumber,
      this.winnerNumber,
      this.bonusNumber
    );
    const lottoResult = matchingNumber.getResultOfThreeToFiveMatchingNumbers();
    matchingNumber.printLottoResult(lottoResult);
    this.loadLottoProfitRate(lottoResult);
  }

  loadLottoProfitRate(lottoResult) {
    const lottoProfitRate = new ProfitRate(lottoResult, this.payMoney).getProfitRate();
    Console.print(`총 수익률은 ${lottoProfitRate}%입니다.`);
    Console.close();
  }
}

const app = new App();
app.play();
module.exports = App;
