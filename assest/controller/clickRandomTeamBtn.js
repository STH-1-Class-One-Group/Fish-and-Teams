/**
 * [파일 역할]
 * - "완전 랜덤 팀 배정" 버튼 클릭 이벤트를 처리하는 컨트롤러.
 *
 * [왜 필요한가]
 * - 조건 기반 배정과 랜덤 배정을 분리하면 사용자 선택지가 명확해지고 코드 책임도 분리된다.
 *
 * [핵심 기능]
 * - click 이벤트에서 팀 수/인원 검증
 * - randomArrange 모델 호출
 * - renderTeamResults로 결과 렌더링 및 후속 게임 시작 연결
 */
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
