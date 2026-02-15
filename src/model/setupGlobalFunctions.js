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
