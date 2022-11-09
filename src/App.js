const MissionUtils = require("@woowacourse/mission-utils");

class App {
  play() {
    this.inputMoney();
  }

  inputMoney() {
    MissionUtils.Console.readLine("구입금액을 입력해 주세요.\n", (money) => {
      if (money % 1000 !== 0 || money === "0")
        throw new Error("[ERROR] 구입 금액은 1000원 단위 입니다.");
    });
  }
}

const app = new App();
app.play();
module.exports = App;
