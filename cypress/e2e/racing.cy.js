import { SELECTORS, ERROR_MESSAGES } from "/src/constants.js";

//Custom Commands
Cypress.Commands.add("shouldShowAlert", (typeVal, selector, err) => {
  cy.on("window:alert", (alertMessage) => {
    expect(alertMessage).to.eq(err);
  });
  if (typeVal) cy.get(selector).type(typeVal);
  cy.get(SELECTORS.CAR_NAME_FORM).submit();
});

describe("intro: 유저가 첫 화면을 정상적으로 볼 수 있는지 테스트한다.", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5501/index.html");
  });

  context("처음 시작했을 때", () => {
    it("자동차 이름 입력 외에 다른 창은 뜨지 않는다", () => {
      cy.get(SELECTORS.CAR_NAME_FORM).should("not.have.class", "hidden");
    });
  });
});

describe("input: 유저가 정상적으로 자동차 이름과 시도 횟수를 입력할 수 있는지 테스트한다.", () => {
  context("경기 시도 횟수를 유저가 입력했을 때", () => {
    // it("시도 횟수 input이 비어있을 경우 경고 메세지를 보낸다.", () => {
    // });
    it("시도 횟수 입력값이 1이상 10이하의 수가 아닐 경우 경고 메세지를 보낸다.", () => {
      cy.shouldShowAlert(
        "",
        SELECTORS.TRIAL_NUM_INPUT,
        ERROR_MESSAGES.NUM_RANGE_ERROR
      );
    });
    it("올바른 횟수를 입력하면 경주 게임 섹션이 화면이 나타난다.", () => {
      cy.get(SELECTORS.TRIAL_NUM_INPUT).then((trial) => {
        if (trial.is(":visible")) {
          trial.type("3");
          cy.get(SELECTORS.GAME_SECTION).should("not.have.class", "hidden");
        }
      });
    });
  });

  context("자동차 이름 입력창에 유저가 값을 입력했을 때,", () => {
    it("자동차 이름의 길이가 0 이하이거나 6자 이상이라면 경고 메세지가 뜬다.", () => {
      // input 에 "" 입력 (if)
      cy.shouldShowAlert(
        "123456",
        SELECTORS.CAR_NAME_INPUT,
        ERROR_MESSAGES.WORD_LENGTH_ERROR
      );
      cy.shouldShowAlert(
        "",
        SELECTORS.CAR_NAME_INPUT,
        ERROR_MESSAGES.WORD_LENGTH_ERROR
      );
    });
    //it("끝이 ','로 끝나지 않는다.(정규식 ~한 형태다)", () => {});
  });
});

describe("play: 게임이 정상적으로 실행되는지 테스트한다.", () => {
  context("두 입력값이 정상적으로 submit 되었을 때", () => {
    it("게임 실행 화면에 자동차 이름이 정상적으로 출력되는 것을 볼 수 있다.", () => {
      cy.get(SELECTORS.CAR_NAME_INPUT).type("WEST,EAST");
      cy.get(SELECTORS.CAR_PLAYER_DIV).then(($names) => {
        expect($names.first()).to.contain("WEST");
        expect($names.second()).to.contain("EAST");
      });
    });

    it("입력한 시도 횟수만큼만 게임이 실행되는 걸 볼 수 있다.", () => {});
  });
});
