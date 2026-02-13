import distributeTeamsBalanced from "../model/distributeTeamsBalanced.js";
import renderTeamResults from "../view/renderTeamResult.js";

const bindDistributeEvents = () => {
  const btn = document.getElementById("btn-assign-teams");
  
  // 요소 가져오기
  const abillityCheck = document.getElementById("chk-ability");
  const genderCheck = document.getElementById("chk-gender");
  const ageCheck = document.getElementById("chk-age");

  if (btn) {
    btn.addEventListener("click", () => {
      // [핵심 수정] 여기도 동일하게 포커스를 해제합니다.
      btn.blur();

      // 1. 팀 개수 가져오기
      const inputCount = document.getElementById("input-team-count").value;
      const teamCount = parseInt(inputCount, 10);

      if (isNaN(teamCount) || teamCount < 2) {
        alert("최소 2팀 이상이어야 합니다.");
        return;
      }

      // 2. 버튼을 클릭하는 순간! 값을 읽어옵니다
      const options = {
        useAbility: abillityCheck.checked, // 능력 밸런스
        useGender: genderCheck.checked,    // 성별 밸런스
        useAge: ageCheck.checked,          // 나이 밸런스
      };

      // 3. 유효성 검사 추가
      if (!options.useAbility && !options.useGender && !options.useAge) {
        alert("최소 하나의 밸런스 조건은 선택해야 합니다! (능력, 성별, 나이 중 택1)");
        return; 
      }

      // 4. 데이터 가져오기
      const members = JSON.parse(localStorage.getItem("teamMembers")) || [];

      if (members.length < teamCount) {
        alert(
          `인원이 부족합니다. (현재 ${members.length}명 / 필요 ${teamCount}명 이상)`,
        );
        return;
      }

      // 5. 로직 실행
      const resultTeams = distributeTeamsBalanced(members, teamCount, options);

      // 6. 결과 그리기
      renderTeamResults(resultTeams);
    });
  }
};

export default bindDistributeEvents;