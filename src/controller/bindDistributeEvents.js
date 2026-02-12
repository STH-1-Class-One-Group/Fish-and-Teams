import distributeTeamsBalanced from "../model/distributeTeamsBalanced.js";
import renderTeamResults from "../view/renderTeamResult.js";

const bindDistributeEvents = () => {
  const btn = document.getElementById("btn-assign-teams");

  if (btn) {
    btn.addEventListener("click", () => {
      // 1. 팀 개수 가져오기 (Input 값)
      const inputCount = document.getElementById("input-team-count").value;
      const teamCount = parseInt(inputCount, 10);

      if (isNaN(teamCount) || teamCount < 2) {
        alert("최소 2팀 이상이어야 합니다.");
        return;
      }

      // 2. 체크박스 상태 확인 (사용자가 원하는 조건)
      const options = {
        useAbility: document.getElementById("chk-ability").checked, // 능력 밸런스
        useGender: document.getElementById("chk-gender").checked,   // 성별 밸런스
        useAge: document.getElementById("chk-age").checked          // 나이 밸런스
      };

      // 3. 데이터 가져오기
      const members = JSON.parse(localStorage.getItem("teamMembers")) || [];

      if (members.length < teamCount) {
        alert(`인원이 부족합니다. (현재 ${members.length}명 / 필요 ${teamCount}명 이상)`);
        return;
      }

      // 4. ★ 로직 실행 (옵션과 함께 전달) ★
      const resultTeams = distributeTeamsBalanced(members, teamCount, options);

      // 5. 결과 그리기
      renderTeamResults(resultTeams);
    });
  }
};

export default bindDistributeEvents;