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
