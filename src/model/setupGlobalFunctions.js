/**
 * [파일 역할]
 * - HTML의 onclick에서 호출할 전역 함수(window.*)를 한 번에 등록하는 초기화 모듈.
 *
 * [왜 필요한가]
 * - 모듈 스코프 함수는 HTML 인라인 이벤트에서 직접 접근할 수 없으므로, 브리지 레이어가 필요하다.
 *
 * [핵심 기능]
 * - startFishingGame: 게임 초기 세팅 + 오버레이 표시
 * - skipGame: 미니게임 즉시 종료 후 최종 모달 표시
 * - closeGameAndShowResult: 게임 오버레이 닫고 결과 모달 표시
 * - closeResultModal: 결과 모달 닫기
 */
import fishingGameModel from "./fishingGameModel.js";
import fishingGameState from "./fishingGameState.js";
import fishingGameView from "../view/fishingGameView.js";
import fishLoopController from "./fishLoopController.js";

const setupGlobalFunctions = () => {
  // 1. 게임 시작
  window.startFishingGame = (calculatedTeams) => {
    fishingGameModel.init(calculatedTeams);
    fishingGameView.renderScreens();
    fishingGameView.toggleOverlay(true);
    fishingGameView.toggleResultOverlay(false);
    fishingGameView.initSwiper();
    fishLoopController.start();
  };

  // 2. 게임 스킵
  window.skipGame = () => {
    fishLoopController.stop();
    fishingGameState.isFishing = false;
    fishingGameState.isTransitioning = false;

    fishingGameView.toggleOverlay(false);
    fishingGameView.toggleResultOverlay(false);
    fishingGameView.toggleFinalModal(true);
  };

  // 3. 결과 확인 후 닫기
  window.closeGameAndShowResult = () => {
    fishLoopController.stop();
    fishingGameView.toggleOverlay(false);
    fishingGameView.toggleFinalModal(true);
  };

  // 4. 최종 결과창 닫기
  window.closeResultModal = () => {
    fishingGameView.toggleFinalModal(false);
  };
};

export default setupGlobalFunctions;
