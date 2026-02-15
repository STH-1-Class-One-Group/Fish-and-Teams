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