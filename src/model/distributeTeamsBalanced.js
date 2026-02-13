/**
 * [만능 팀 배정 알고리즘 - V4 Average Optimizer]
 * 핵심 변경: '합계(Total Score)'가 아니라 '평균(Average Score)'을 기준으로 트레이드 수행
 * 효과: 1명인 팀과 2명인 팀 사이의 밸런스 격차를 완벽하게 해소
 */
const distributeTeamsBalanced = (members, teamCount, options) => {
  const { useAbility, useGender, useAge } = options;

  // 1. 점수 계산기 (가중치: 능력치 >>> 나이)
  const getScore = (member) => {
    let score = 0;
    // 능력치는 1000단위로 줘서 절대적인 우선순위를 가짐
    if (useAbility) score += parseInt(member.value) * 1000;
    // 나이는 1단위 (능력치가 같을 때 나이로 판별)
    if (useAge) score += parseInt(member.age);
    // 아무 옵션 없으면 랜덤
    if (!useAbility && !useAge) return Math.random();
    return score;
  };

  // 2. 초기 배정 (스네이크 방식 - 인원수 배분을 위해 필수)
  // 일단 인원수를 [2, 2, 1, 1] 처럼 균등하게 맞추는 게 1순위입니다.
  const tempTeams = Array.from({ length: teamCount }, () => []);

  // 대기열 준비 (성별 옵션 있으면 지퍼 정렬, 없으면 통으로 정렬)
  let queue = [...members];
  if (useGender) {
    const males = members.filter((m) => m.sex === "남자").sort((a, b) => getScore(b) - getScore(a));
    const females = members.filter((m) => m.sex === "여자").sort((a, b) => getScore(b) - getScore(a));
    
    queue = [];
    const maxLen = Math.max(males.length, females.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < males.length) queue.push(males[i]);
      if (i < females.length) queue.push(females[i]);
    }
  } else {
    queue.sort((a, b) => getScore(b) - getScore(a));
  }

  // 스네이크 배정 실행
  queue.forEach((member, index) => {
    const round = Math.floor(index / teamCount);
    const isBack = round % 2 === 1;
    const teamIdx = isBack ? teamCount - 1 - (index % teamCount) : index % teamCount;
    tempTeams[teamIdx].push(member);
  });

  // =========================================================
  // [3. 핵심 로직] 평균 점수 기반 트레이드 (Average Swap)
  // 팀의 인원수가 달라도 '평균 능력/나이'가 비슷해지도록 멤버를 교환
  // =========================================================
  
  // 팀의 평균 점수를 구하는 헬퍼 함수
  const getTeamAvg = (teamMembers) => {
    if (teamMembers.length === 0) return 0;
    const total = teamMembers.reduce((sum, m) => sum + getScore(m), 0);
    return total / teamMembers.length;
  };

  // 최대 500번 시도 (충분히 많이 돌려도 됨)
  for (let iter = 0; iter < 500; iter++) {
    // 현재 상태에서 평균 점수가 가장 높은 팀(Max)과 낮은 팀(Min) 찾기
    // *주의: sort는 원본을 바꾸므로 map으로 복사해서 정렬 계산
    const sortedIndices = tempTeams.map((members, idx) => ({ 
        idx, 
        avg: getTeamAvg(members) 
    })).sort((a, b) => a.avg - b.avg);

    const minTeamObj = sortedIndices[0]; // 평균 꼴등 팀
    const maxTeamObj = sortedIndices[teamCount - 1]; // 평균 1등 팀

    const minTeam = tempTeams[minTeamObj.idx];
    const maxTeam = tempTeams[maxTeamObj.idx];

    // 현재 격차 (평균의 차이)
    const currentDiff = maxTeamObj.avg - minTeamObj.avg;
    
    // 격차가 매우 작으면 최적화 종료 (허용 오차 0.5점 미만)
    if (currentDiff < 0.5) break;

    let bestSwap = null;
    let bestNewDiff = currentDiff;

    // Max팀의 멤버와 Min팀의 멤버를 바꿔보는 시뮬레이션
    for (let i = 0; i < maxTeam.length; i++) {
      for (let j = 0; j < minTeam.length; j++) {
        const memMax = maxTeam[i];
        const memMin = minTeam[j];

        // [성별 보호] 성별 옵션 켜져있으면 같은 성별끼리만 교환 가능
        if (useGender && memMax.sex !== memMin.sex) continue;

        // 가상 교환 후 평균 계산
        const maxScorePart = getScore(memMax);
        const minScorePart = getScore(memMin);

        // (중요) 단순히 점수가 높다고 바꾸는 게 아니라, 바꿨을 때 '평균의 격차'가 줄어드는지 확인
        // 현재 합계에서 멤버 빼고 더하기
        const newMaxTotal = (maxTeamObj.avg * maxTeam.length) - maxScorePart + minScorePart;
        const newMinTotal = (minTeamObj.avg * minTeam.length) - minScorePart + maxScorePart;
        
        const newMaxAvg = newMaxTotal / maxTeam.length;
        const newMinAvg = newMinTotal / minTeam.length;

        const newDiff = Math.abs(newMaxAvg - newMinAvg);

        // 격차가 줄어들면 후보 등록
        if (newDiff < bestNewDiff) {
            bestNewDiff = newDiff;
            bestSwap = { maxIdx: i, minIdx: j, maxTeamIdx: maxTeamObj.idx, minTeamIdx: minTeamObj.idx };
        }
      }
    }

    // 더 나은 교환을 찾았으면 실행
    if (bestSwap) {
      const teamA = tempTeams[bestSwap.maxTeamIdx];
      const teamB = tempTeams[bestSwap.minTeamIdx];
      
      const memA = teamA[bestSwap.maxIdx];
      const memB = teamB[bestSwap.minIdx];

      // 교체 실행
      teamA[bestSwap.maxIdx] = memB;
      teamB[bestSwap.minIdx] = memA;
    } else {
      // 더 이상 줄일 수 없으면 루프 종료
      break;
    }
  }

  return tempTeams;
};

export default distributeTeamsBalanced;