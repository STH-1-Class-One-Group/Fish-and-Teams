// 이미지 경로 설정
const fishArr = [
  "img/fish1.png", "img/fish2.png", "img/fish3.png",
  "img/fish4.png", "img/fish5.png", "img/fish6.png",
];

// [수정] 인자로 memberName을 받습니다.
const popupFish = (memberName) => {
  // [★중요★] 안전장치: 게임 오버레이가 켜져있지 않으면 실행하지 않음
  const gameOverlay = document.getElementById("minigame-overlay");
  if (!gameOverlay || getComputedStyle(gameOverlay).display === "none") {
      return; 
  }

  const HALF = "50%";
  const body = document.querySelector("body");

  // 팝업 컨테이너 생성
  const popupFishElement = document.createElement("div");

  // 스타일 설정
  popupFishElement.style.width = "300px"; // 크기 조금 줄임 (가독성 위해)
  popupFishElement.style.height = "300px";
  popupFishElement.style.display = "flex";
  popupFishElement.style.flexDirection = "column"; // 세로 정렬
  popupFishElement.style.justifyContent = "center";
  popupFishElement.style.alignItems = "center";
  popupFishElement.style.position = "fixed";
  popupFishElement.style.background = "rgba(255, 255, 255, 0.9)"; // 약간 투명
  popupFishElement.style.border = "3px solid #333";
  popupFishElement.style.borderRadius = "50%"; // 원형으로 변경
  popupFishElement.style.left = HALF;
  popupFishElement.style.top = HALF;
  popupFishElement.style.transform = `translate(-${HALF},-30%)`;
  popupFishElement.style.transition = "all 0.5s ease-out";
  popupFishElement.style.zIndex = "10002"; // 게임 오버레이(10000)보다 확실히 위에
  popupFishElement.style.pointerEvents = "none";
  popupFishElement.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";

  // 이미지 생성
  const fishImg = document.createElement("img");
  const fishIndex = Math.floor(Math.random() * fishArr.length);
  fishImg.src = fishArr[fishIndex];
  fishImg.style.width = "120px";
  fishImg.style.height = "120px";
  fishImg.style.objectFit = "contain";
  fishImg.style.marginBottom = "10px";

  // [NEW] 이름 텍스트 생성
  const nameText = document.createElement("div");
  // 이름이 있으면 이름 출력, 없으면 기본 텍스트
  nameText.innerHTML = memberName ? `<span style="color:#007bff">${memberName}</span> 님을<br>낚았습니다!` : "월척이다!";
  nameText.style.fontSize = "1.2rem";
  nameText.style.fontWeight = "bold";
  nameText.style.textAlign = "center";
  nameText.style.lineHeight = "1.4";
  nameText.style.color = "#333";

  popupFishElement.appendChild(fishImg);
  popupFishElement.appendChild(nameText); // 텍스트 추가
  body.appendChild(popupFishElement);

  // 애니메이션 로직
  const spawnFish = (e) => {
    // 등장 (가운데)
    e.style.transform = `translate(-${HALF},-${HALF}) scale(1.1)`; // 살짝 커짐
    e.style.opacity = "1";

    setTimeout(() => {
      // 퇴장 (위로)
      e.style.transform = `translate(-${HALF},-100%) scale(0.8)`;
      e.style.opacity = "0";
      setTimeout(() => {
        if (e.parentNode) e.remove();
      }, 500);
    }, 500); // 0.5초 동안 보여줌
  };

  requestAnimationFrame(() => spawnFish(popupFishElement));
};

// 전역 등록
window.popupFish = popupFish;

export default popupFish;
/**
 * [파일 역할]
 * - 낚시 성공 시 "누가 잡혔는지"를 물고기 이미지와 함께 잠시 보여주는 연출 팝업 View.
 *
 * [왜 필요한가]
 * - 단순 텍스트 갱신만으로는 피드백이 약하므로, 시각적 보상(애니메이션 팝업)으로 게임감을 강화한다.
 *
 * [핵심 기능]
 * - 랜덤 물고기 이미지 선택
 * - 멤버 이름 포함 문구 렌더
 * - requestAnimationFrame 기반 등장/퇴장 애니메이션 후 자동 제거
 */
