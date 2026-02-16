/**
 * [파일 역할]
 * - 스페이스바의 브라우저 기본 동작(스크롤)을 미니게임 실행 중에는 차단하는 이벤트 컨트롤러.
 *
 * [왜 필요한가]
 * - 스페이스바는 낚시 게임 입력키로 쓰이므로, 페이지 스크롤이 함께 발생하면 UX가 깨진다.
 */
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
