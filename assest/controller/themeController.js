/**
 * [파일 역할]
 * - 테마 초기 적용과 사용자 변경 이벤트를 연결하는 컨트롤러.
 *
 * [왜 필요한가]
 * - 페이지 시작 시 저장된 테마를 즉시 복원하고, 변경 시 model 저장 + view 반영을 동시에 처리해야
 *   테마 상태가 일관되게 유지된다.
 *
 * [핵심 이벤트]
 * - change(theme-select): 선택된 테마를 저장하고 화면 클래스/버튼 텍스트를 갱신
 */
import themeModel from "../model/themeModel.js";
import themeView from "../view/themeView.js";

const themeController = () => {
  const selectBox = document.getElementById("theme-select");

  // [1. 초기화 로직]
  // 페이지 로드 시 LocalStorage에서 테마를 확인하고 적용
  const initTheme = () => {
    const currentTheme = themeModel.getStoredTheme();
    themeView.render(currentTheme);
  };

  // [2. 이벤트 리스너 로직]
  // 사용자가 테마를 변경했을 때 실행
  if (selectBox) {
    selectBox.addEventListener("change", (e) => {
      const newTheme = e.target.value;

      // 1. Model에 저장
      themeModel.saveTheme(newTheme);

      // 2. View 업데이트
      themeView.render(newTheme);

      console.log(`테마가 변경되었습니다: ${newTheme}`);
    });
  }

  // 앱 시작 시 초기화 실행
  initTheme();
};



export default themeController;
