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