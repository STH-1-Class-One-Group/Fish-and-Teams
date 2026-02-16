// header 내부의 테마버튼 클릭시,
// 동작을 실행함

const hoverThemeButton = () => {
  // themeList 요소 가져오기
  const themeList = document.getElementById("theme-select");
  //   테마버튼 요소 가져오기
  const themeButton =
    document.querySelector("header").children[1].children[0].children[0];

  // themeList에 호버 이벤트 추가
  // mouseover: select 위에 커서가 올라오면 표시 버튼에 확대 효과 적용
  themeList.addEventListener("mouseover", function () {
    themeButton.classList.add("scale-up-1-05");
  });
  // themeList에서 마우스가 떠날 때 이벤트 추가
  // mouseout: 커서가 빠져나가면 확대 효과 해제
  themeList.addEventListener("mouseout", function () {
    themeButton.classList.remove("scale-up-1-05");
  });
};
// export 하기
export default hoverThemeButton;
/**
 * [파일 역할]
 * - 테마 select 영역과 표시 버튼의 hover 시각 효과를 연결하는 컨트롤러.
 *
 * [왜 필요한가]
 * - 사용자 포인터는 `select` 위에 올라가지만, 실제 보이는 대상은 표시 버튼이므로
 *   hover 피드백을 버튼에도 동기화해야 UI가 자연스럽다.
 *
 * [핵심 이벤트]
 * - `mouseover`: 마우스를 올렸을 때 버튼 확대 클래스 추가
 * - `mouseout`: 마우스가 벗어났을 때 버튼 확대 클래스 제거
 */
