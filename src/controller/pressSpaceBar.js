const pressSpaceBar = () => {
  // 키 입력 이벤트
  document.addEventListener("keydown", (e) => {
    // 미니게임 화면이 열려있을 때 스페이스바 기본 동작(스크롤) 차단
    if (e.code === "Space") {
      const overlay = document.getElementById("minigame-overlay");
      if (overlay && overlay.style.display === "block") {
        e.preventDefault();
      }
    }
  });
};

// 출력
export default pressSpaceBar;
