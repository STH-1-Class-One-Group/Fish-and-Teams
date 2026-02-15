const fishingGameState = {
  teams: [],
  // [핵심 변경] 복잡한 상태 변수 대신 'isProcessing' 하나로 "현재 바쁨 상태"를 통제합니다.
  isProcessing: false,
  totalFished: 0,
  totalMembers: 0,
  fishInterval: null,
};

export default fishingGameState;
