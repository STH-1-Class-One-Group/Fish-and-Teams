import fishingGameState from "./fishingGameState.js";

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