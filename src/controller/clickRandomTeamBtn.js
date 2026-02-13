import randomArrange from "../model/randomArrange.js";
import renderTeamResults from "../view/renderTeamResult.js";

const clickRandomTeamBtn = () => {
  const btn = document.getElementById("btn-random-teams");

  // 버튼이 있을 때만 이벤트 연결
  if (btn) {
    btn.addEventListener("click", () => {
      // [핵심 수정] 버튼을 누르자마자 포커스를 해제합니다.
      // 이제 스페이스바를 눌러도 이 버튼이 다시 눌리지 않습니다.
      btn.blur(); 

      // 1. 팀 수 가져오기 (기존 input 재사용)
      const inputCount = document.getElementById("input-team-count").value;
      const teamCount = parseInt(inputCount, 10);

      // 유효성 검사
      if (isNaN(teamCount) || teamCount < 2) {
        alert("최소 2팀 이상이어야 합니다.");
        return;
      }

      // 2. 데이터 가져오기
      const members = JSON.parse(localStorage.getItem("teamMembers")) || [];

      if (members.length < teamCount) {
        alert(
          `인원이 부족합니다. (현재 ${members.length}명 / 필요 ${teamCount}명 이상)`
        );
        return;
      }

      // 3. ★ 모델 실행 (랜덤 로직) ★
      const resultTeams = randomArrange(members, teamCount);

      // 4. 결과 출력
      console.log("랜덤 배정 결과:", resultTeams);

      // 5. ★ 뷰 실행 (결과 그리기 - 기존 뷰 재사용!) ★
      renderTeamResults(resultTeams);
    });
  }
};

export default clickRandomTeamBtn;