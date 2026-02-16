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
/**
 * [파일 역할]
 * - 현재 테마 값을 localStorage에 저장/조회하는 테마 데이터 모델.
 *
 * [왜 필요한가]
 * - 사용자가 선택한 테마를 새로고침 이후에도 유지하려면 영속 저장소 계층이 필요하다.
 */
