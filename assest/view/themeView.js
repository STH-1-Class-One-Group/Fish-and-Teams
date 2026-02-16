/**
 * [파일 역할]
 * - 선택된 테마를 실제 DOM(body/select/button 텍스트)에 반영하는 View 모듈.
 *
 * [왜 필요한가]
 * - 테마 저장(model)과 화면 반영(view)을 분리하면 역할이 명확해지고 확장이 쉬워진다.
 *
 * [핵심 기능]
 * - body 클래스 교체(dark/light/ocean)
 * - select 선택값 동기화
 * - 표시 버튼(theme-display-btn) 텍스트를 현재 테마명으로 갱신
 */
const themeView = {
  // DOM 요소 가져오기
  body: document.body,
  selectBox: document.getElementById("theme-select"),
  displayBtn: document.getElementById("theme-display-btn"),

  /**
   * [화면 업데이트 함수]
   * 1. body의 클래스를 변경 (테마 적용)
   * 2. select 박스의 선택값 변경 (동기화)
   * 3. 보여지는 버튼의 텍스트 변경
   */
  render: (themeName) => {
    // 1. Body 클래스 변경 (기존 테마 삭제 후 새 테마 추가)
    document.body.classList.remove("dark", "light", "ocean");
    document.body.classList.add(themeName);

    // 2. Select 박스 값 동기화
    const selectBox = document.getElementById("theme-select");
    if (selectBox) {
      selectBox.value = themeName;
      
      // 3. 버튼 텍스트 변경 (선택된 option의 텍스트로)
      const selectedOption = selectBox.options[selectBox.selectedIndex];
      const displayBtn = document.getElementById("theme-display-btn");
      if (displayBtn && selectedOption) {
        displayBtn.textContent = selectedOption.text;
      }
    }
  },
};


export default themeView;
