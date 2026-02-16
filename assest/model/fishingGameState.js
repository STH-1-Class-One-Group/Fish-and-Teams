/**
 * [파일 역할]
 * - 낚시 미니게임에서 여러 모듈이 함께 참조하는 "공유 상태 저장소" 객체.
 *
 * [왜 필요한가]
 * - 모델/뷰/컨트롤러가 각각 상태를 따로 들고 있으면 동기화 오류가 생기기 쉽다.
 * - 진행 중 여부, 총 인원/낚은 인원, 인터벌 핸들 등을 한 곳에서 관리해 충돌을 방지한다.
 *
 * [핵심 데이터]
 * - teams: 팀별 남은 멤버 목록
 * - isProcessing: 현재 낚시 시퀀스 실행 중인지(중복 입력 차단용)
 * - totalFished / totalMembers: 게임 종료 판정용 카운터
 * - fishInterval: 반복 동작 정리를 위한 interval 참조값
 */
const fishingGameState = {
  teams: [],
  // [핵심 변경] 복잡한 상태 변수 대신 'isProcessing' 하나로 "현재 바쁨 상태"를 통제합니다.
  isProcessing: false,
  totalFished: 0,
  totalMembers: 0,
  fishInterval: null,
};

export default fishingGameState;
