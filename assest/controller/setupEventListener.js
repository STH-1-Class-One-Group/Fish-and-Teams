/**
 * [파일 역할]
 * - 미니게임 중 스페이스바 입력을 실제 낚시 처리(processFishing)로 연결하는 키 이벤트 컨트롤러.
 *
 * [왜 필요한가]
 * - 아무 상황에서나 입력을 받으면 중복 실행/오동작이 생기므로, 오버레이 상태와 처리 중 상태를
 *   함께 검사하는 관문 로직이 필요하다.
 *
 * [핵심 이벤트]
 * - keydown(Space): 미니게임 화면 활성 + 결과 오버레이 비활성 + 비처리중일 때만 낚시 실행
 */
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
