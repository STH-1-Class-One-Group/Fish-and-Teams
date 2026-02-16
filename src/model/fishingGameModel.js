import fishingGameState from "./fishingGameState.js";

/**
 * [파일 역할]
 * - 낚시 게임의 핵심 데이터 처리(초기화, 한 명 낚기, 종료 여부 판정)를 담당하는 모델.
 *
 * [왜 필요한가]
 * - 화면 애니메이션 로직과 실제 데이터 변경 로직을 분리해야 유지보수와 테스트가 쉬워진다.
 */
const fishingGameModel = {
  // 게임 데이터 초기화
  init: (teams) => {
    fishingGameState.teams = teams.map((members, idx) => ({
      teamName: `Team ${idx + 1}`,
      members: [...members],
    }));
    fishingGameState.totalMembers = teams.flat().length;
    fishingGameState.totalFished = 0;
    fishingGameState.isFishing = false;
    fishingGameState.isTransitioning = false;
  },

  // 낚시 성공 처리 (데이터 업데이트)
  catchMember: (teamIdx) => {
    const team = fishingGameState.teams[teamIdx];
    if (team.members.length > 0) {
      const member = team.members.shift(); // 멤버 꺼내기
      fishingGameState.totalFished++;
      return member; // 낚인 멤버 반환
    }
    return null; // 낚을 사람이 없음
  },

  // 게임 종료 여부 확인
  isGameFinished: () => {
    return fishingGameState.totalFished >= fishingGameState.totalMembers;
  },
};

export default fishingGameModel;
