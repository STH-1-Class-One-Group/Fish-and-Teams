// CRUD 관련 Controller
import memberController from "../controller/memberController.js";
import memberModel from "../model/memberModel.js";

// 기타 Controller
import pressSpaceBar from "../controller/pressSpaceBar.js";
import hoverThemeButton from "../controller/hoverThemeButton.js";
import themeController from "../controller/themeController.js";
import setupEventListeners from "../controller/setupEventListener.js";
import setupGlobalFunctions from "../model/setupGlobalFunctions.js";

// ===========================================================
// 초기 실행 (Initialization)
// ===========================================================
function startcurd() {
  // 페이지의 모든 리소스(이미지 등)가 로드된 후 실행
  window.onload = function () {
    // 데이터 초기화
    memberModel.init();
    // 초기 화면 그리기
    memberController.mainFrm();
  };
}

// 앱 시작
startcurd();

// pressSpaceBar 적용
pressSpaceBar();

// hoverThemeButton 적용
hoverThemeButton();

// themeController 적용
themeController();

// [NEW] 낚시 게임 초기화 (전역 함수 등록 및 이벤트 연결)
setupGlobalFunctions();
setupEventListeners();

// [중요] 모듈 스코프 해결을 위한 전역 객체 할당
// ===========================================================
// HTML의 onclick="..." 속성이 이 함수들을 찾을 수 있게 window 객체에 등록합니다.
window.mainFrm = memberController.mainFrm;
window.sumCheckbox = memberController.sumCheckbox;
window.addMember = memberController.addMember;
window.modifyMember = memberController.modifyMember;
window.delMember = memberController.delMember;
/**
 * [파일 역할]
 * - 애플리케이션 초기 진입 파일. 각 컨트롤러/모델 초기화와 전역 함수 바인딩을 수행한다.
 *
 * [왜 필요한가]
 * - 멤버 화면 초기 렌더, 테마/키보드 이벤트, 미니게임 전역 함수 등록은 시작 순서가 중요하다.
 * - 한 파일에서 부트스트랩을 통합해 실행 순서를 명확히 관리한다.
 *
 * [핵심 기능]
 * - window.onload에서 저장소 초기화 + 멤버 테이블 렌더
 * - 스페이스바/테마 hover/테마 변경 이벤트 활성화
 * - 미니게임 전역 함수 및 이벤트 리스너 등록
 * - HTML onclick과 연결할 CRUD 함수(window.*) 노출
 */
