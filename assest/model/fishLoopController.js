import fishingGameState from "./fishingGameState.js";

// [물고기 자동 팝업 루프 제어]
// 수정: 팝업은 이제 '낚시 성공 결과창'으로 쓰이므로, 
// 배경에서 자동으로 뜨는 루프 기능은 제거합니다.
const fishLoopController = {
  start: () => {
    // 기존의 자동 팝업 로직 제거 (빈 함수로 유지하여 에러 방지)
    // 만약 나중에 배경에 물고기가 지나가는 등 다른 효과를 넣고 싶다면 여기에 작성하세요.
    if (fishingGameState.fishInterval) clearInterval(fishingGameState.fishInterval);
  },
  
  stop: () => {
    if (fishingGameState.fishInterval) {
      clearInterval(fishingGameState.fishInterval);
      fishingGameState.fishInterval = null;
    }
  },
};

export default fishLoopController;
/**
 * [파일 역할]
 * - 낚시 게임에서 반복 동작(interval) 시작/종료를 제어하는 보조 컨트롤러.
 *
 * [왜 필요한가]
 * - 게임 종료/스킵 시 interval 정리를 놓치면 메모리 누수나 중복 동작이 발생할 수 있다.
 */
