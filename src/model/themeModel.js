// LocalStorage 키 값 상수화
const STORAGE_KEY = "app-theme";

const themeModel = {
  // 저장된 테마 가져오기 (없으면 기본값 'ocean')
  getStoredTheme: () => {
    return localStorage.getItem(STORAGE_KEY) || "ocean";
  },

  // 테마 저장하기
  saveTheme: (themeName) => {
    localStorage.setItem(STORAGE_KEY, themeName);
  },
};


export default themeModel;