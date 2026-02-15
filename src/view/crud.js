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
