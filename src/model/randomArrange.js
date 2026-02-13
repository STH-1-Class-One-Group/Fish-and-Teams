// 팀명을 알파벳으로 지정했을 때 
// 이 부분은 추후 서로 이야기 해보기


// /**
//  * [목적]
//  *   지정된 수만큼의 팀 이름을 생성합니다.
//  *   (예: TeamA, TeamB, ..., TeamZ, TeamAA, TeamAB, ...)
//  *
//  * @param {number} count - 생성할 팀 이름의 수
//  * @returns {string[]|null} 생성된 팀 이름 배열 또는 너무 많을 경우 null
//  */
// function generateTeamNames(count) {
//   const names = [];
//   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//   // Single letter (A-Z)
//   for (let i = 0; i < alphabet.length; i++) {
//     if (names.length >= count) return names;
//     names.push(`Team${alphabet[i]}`);
//   }

//   // Double letters (AA, AB, ...)
//   for (let i = 0; i < alphabet.length; i++) {
//     for (let j = 0; j < alphabet.length; j++) {
//       if (names.length >= count) return names;
//       names.push(`Team${alphabet[i]}${alphabet[j]}`);
//     }
//   }

//   // 요청된 팀 수가 너무 많은 경우
//   if (count > names.length) {
//     alert("팀 수가 너무 많습니다. (최대 702개까지 가능)");
//     return null;
//   }

//   return names;
// }



/**
 * [목적]
 *   랜덤으로 팀을 배정하는 함수입니다.
 * [순수 함수: randomArrange]
 * 역할: 멤버 리스트와 팀 개수를 받아 무작위로 섞어서 팀을 나눕니다.
 * 반환값: [[팀1멤버들], [팀2멤버들], ...] 형태의 2차원 배열
 */
const randomArrange = (members, teamCount) => {
  // 1. 원본 보호를 위해 배열 복사 (Deep Copy까지는 필요 없지만 얕은 복사)
  const shuffledMembers = [...members];

  // 2. 피셔-예이츠 셔플 (Fisher-Yates Shuffle) - 가장 완벽한 랜덤 섞기 알고리즘
  for (let i = shuffledMembers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledMembers[i], shuffledMembers[j]] = [
      shuffledMembers[j],
      shuffledMembers[i],
    ];
  }

  // 3. 빈 팀 생성 (2차원 배열)
  const teams = Array.from({ length: teamCount }, () => []);

  // 4. 순서대로 배정 (이미 섞였으므로 앞에서부터 하나씩 넣으면 됨)
  shuffledMembers.forEach((member, index) => {
    const teamIndex = index % teamCount; // 0, 1, 2, 0, 1, 2 ...
    teams[teamIndex].push(member);
  });

  return teams;
};

export default randomArrange;