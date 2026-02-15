import fishingGameState from "../model/fishingGameState.js";
import processFishing from "../model/processFishing.js";

// [이벤트 리스너] 스페이스바
const setupEventListeners = () => {
  window.addEventListener("keydown", (e) => {
    const overlay = document.getElementById("minigame-overlay");
    const resultOverlay = document.getElementById("game-result-overlay");

    // 조건:
    // 1. 스페이스바 누름
    // 2. 게임 화면이 켜져 있음 (overlay block)
    // 3. 결과창이 꺼져 있음 (resultOverlay none)
    // 4. [★핵심★] 현재 로직이 진행 중이 아님 (!isProcessing)
    if (
      e.code === "Space" &&
      overlay.style.display === "block" &&
      resultOverlay.style.display !== "block" &&
      !fishingGameState.isProcessing // 진행 중이면 절대 실행 안 됨
    ) {
      e.preventDefault();
      processFishing();
    }
  });
};

export default setupEventListeners;