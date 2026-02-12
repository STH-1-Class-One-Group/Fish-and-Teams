import distributeTeamsBalanced from "../model/distributeTeamsBalanced.js";
import renderTeamResults from "../view/renderTeamResult.js";

// [수정] 함수 이름을 명확하게 변경 (이벤트를 '연결'해주는 함수)
const bindDistributeEvents = () => {
  const btn = document.getElementById("btn-assign-teams");
  
  // 버튼이 존재할 때만 이벤트를 연결 (에러 방지)
  if (btn) {
    btn.addEventListener("click", () => {
      // [STEP 1] 몇 팀으로 나눌지 물어보기
      const input = prompt("몇 개의 팀으로 나누시겠습니까?", "2");
      if (!input) return; // 취소하면 종료

      const teamCount = parseInt(input, 10);
      if (isNaN(teamCount) || teamCount < 2) {
        alert("최소 2팀 이상이어야 합니다.");
        return;
      }

      // [STEP 2] LocalStorage에서 멤버 데이터 가져오기
      const members = JSON.parse(localStorage.getItem("teamMembers")) || [];

      // 예외 처리
      if (members.length < teamCount) {
        alert(`인원이 부족합니다. (현재 ${members.length}명 / 필요 ${teamCount}명 이상)`);
        return;
      }

      // [STEP 3] 알고리즘 실행
      const resultTeams = distributeTeamsBalanced(members, teamCount);

      // [STEP 4] 결과 그리기
      renderTeamResults(resultTeams);
    });
  }
};

export default bindDistributeEvents;