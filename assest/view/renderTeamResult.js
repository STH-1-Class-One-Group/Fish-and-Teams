/**
 * [함수: renderTeamResults]
 * 역할: 결과를 HTML에 그리고, 낚시 게임을 트리거합니다.
 */
function renderTeamResults(teams) {
  // 1. 결과 영역에 데이터 그리기 (일단 그려두고 나중에 팝업으로 띄움)
  const resultArea = document.getElementById("team-result-content"); // ID 변경됨 주의
  if(resultArea) {
      resultArea.innerHTML = "";
      
      teams.forEach((team, index) => {
        // 평균 능력치 계산
        const totalAbility = team.reduce((sum, m) => sum + parseInt(m.value || 0), 0);
        const avgAbility = (totalAbility / team.length).toFixed(1);
        
        // 카드 생성
        const teamCard = document.createElement("div");
        teamCard.className = "team-result-card";
        teamCard.style.border = "2px solid #333";
        teamCard.style.borderRadius = "10px";
        teamCard.style.padding = "15px";
        teamCard.style.margin = "10px";
        teamCard.style.background = "#fff";
        teamCard.style.boxShadow = "3px 3px 10px rgba(0,0,0,0.1)";
        teamCard.style.width = "calc(50% - 20px)"; // 2열 배치

        let memberListHTML = team.map(m => `
            <li style="margin: 5px 0;">
                <strong class="dark-text">${m.name}</strong> 
                <span style="color:#666; font-size:0.9em;">
                    (${m.age}세, ${m.sex}, ⭐${parseInt(m.value)+1})
                </span>
            </li>
        `).join('');

        teamCard.innerHTML = `
            <h3 style="border-bottom:1px solid #ddd; padding-bottom:5px; margin-top:0;" class="dark-text">Team ${index + 1}</h3>
            <div style="color:blue; margin:10px 0px; font-weight:bold;" class="dark-text">
                👥 ${team.length}명 | 💪 평균: ${avgAbility}
            </div>
            <ul style="list-style:none; padding:0;">${memberListHTML}</ul>
        `;
        resultArea.appendChild(teamCard);
      });
  }

  // 2. [수정] 알림 없이 바로 낚시 게임 시작
  if (typeof window.startFishingGame === "function") {
      window.startFishingGame(teams);
  }
}

export default renderTeamResults;
/**
 * [파일 역할]
 * - 계산된 팀 배열을 최종 결과 카드 UI로 렌더링하고, 이어서 미니게임 시작을 트리거하는 View 함수.
 *
 * [왜 필요한가]
 * - 팀 배정 결과를 사용자가 바로 이해할 수 있는 카드 형태로 제공하고,
 *   같은 데이터로 다음 단계(낚시 게임)로 자연스럽게 이어지게 하기 위해 필요하다.
 *
 * [핵심 기능]
 * - 팀별 인원/평균 능력 계산 후 카드 DOM 생성
 * - 최종 결과 영역(team-result-content) 갱신
 * - window.startFishingGame 호출로 후속 플로우 시작
 */
