/**
 * [수정된 알고리즘: 지퍼형 스네이크 배정]
 * 1. 남/녀 그룹 분리 및 정렬 (기존 동일)
 * 2. ★수정됨★: 남녀를 번갈아가며(지퍼처럼) 하나의 긴 줄로 합침
 * 3. 합쳐진 줄을 스네이크 방식으로 배정
 * -> 이렇게 해야 인원이 적어도 모든 팀에 골고루 퍼집니다.
 */
const distributeTeamsBalanced = (members, teamCount) => {
  // 1. 빈 팀 생성
  const teams = Array.from({ length: teamCount }, () => []);

  // 2. 성별 그룹 분리
  const males = members.filter((m) => m.sex === "남자");
  const females = members.filter((m) => m.sex === "여자");

  // [정렬 로직] 능력치 우선 -> 나이 우선 (기존과 동일)
  const sortStrategy = (a, b) => {
    if (b.value !== a.value) {
      return b.value - a.value; // 능력치 내림차순
    }
    return b.age - a.age; // 나이 내림차순
  };

  males.sort(sortStrategy);
  females.sort(sortStrategy);

  // 3. [★ 핵심 수정 파트] 지퍼(Zipper) 방식으로 합치기
  // 남자 한 명, 여자 한 명 번갈아가며 줄을 세웁니다.
  const combinedMembers = [];
  const maxLength = Math.max(males.length, females.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < males.length) combinedMembers.push(males[i]);
    if (i < females.length) combinedMembers.push(females[i]);
  }

  // 이제 combinedMembers는 [남1등, 여1등, 남2등, 여2등, 남3등...] 순서입니다.

  // 4. 스네이크 배정 (통합된 리스트로 한 번만 수행)
  combinedMembers.forEach((member, index) => {
    // 몇 번째 바퀴인지 (0, 1, 2...)
    const round = Math.floor(index / teamCount);
    
    // 지그재그 방향 결정 (짝수 라운드: 정방향, 홀수 라운드: 역방향)
    const isSnakeBack = round % 2 === 1;

    // 들어갈 팀 인덱스 계산
    const teamIndex = isSnakeBack
      ? teamCount - 1 - (index % teamCount) // 뒤에서 앞으로 ( <-- )
      : index % teamCount;                  // 앞에서 뒤로 ( --> )

    teams[teamIndex].push(member);
  });

  return teams;
};

export default distributeTeamsBalanced;