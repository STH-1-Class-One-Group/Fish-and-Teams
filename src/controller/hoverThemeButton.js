// header 내부의 테마버튼 클릭시,
// 동작을 실행함

const hoverThemeButton = () => {
  // themeList 요소 가져오기
  const themeList = document.getElementById("theme-select");
  //   테마버튼 요소 가져오기
  const themeButton =
    document.querySelector("header").children[1].children[0].children[0];

  // themeList에 호버 이벤트 추가
  themeList.addEventListener("mouseover", function () {
    themeButton.classList.add("scale-up-1-05");
    themeButton.classList.add("text-color-fff")
  });
    // themeList에서 마우스가 떠날 때 이벤트 추가
  themeList.addEventListener("mouseout", function () {
    themeButton.classList.remove("scale-up-1-05");
    themeButton.classList.remove("text-color-fff")

  });


};
// export 하기
export default hoverThemeButton;
