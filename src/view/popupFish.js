// 이미지 경로 설정 (HTML 파일 위치 기준)
const fishArr = [
  "img/fish1.png", "img/fish2.png", "img/fish3.png",
  "img/fish4.png", "img/fish5.png", "img/fish6.png",
];

const popupFish = () => {
  const HALF = "50%";
  const body = document.querySelector("body");

  // 팝업 컨테이너 생성
  const popupFishElement = document.createElement("div");

  // 스타일 설정
  popupFishElement.style.width = "600px";
  popupFishElement.style.height = "400px";
  popupFishElement.style.display = "flex";
  popupFishElement.style.justifyContent = "center";
  popupFishElement.style.alignItems = "center";
  popupFishElement.style.position = "fixed";
  popupFishElement.style.left = HALF;
  popupFishElement.style.top = HALF;
  popupFishElement.style.transform = `translate(-${HALF},-30%)`;
  popupFishElement.style.transition = "all 0.5s ease-out";
  popupFishElement.style.zIndex = "9995"; // 게임 화면(10000)보다는 뒤에, 배경보다는 앞에
  popupFishElement.style.pointerEvents = "none"; // 클릭 방지

  // 이미지 생성
  const fishImg = document.createElement("img");
  const fishIndex = Math.floor(Math.random() * fishArr.length);
  fishImg.src = fishArr[fishIndex];
  fishImg.style.maxWidth = "80%";
  fishImg.style.maxHeight = "80%";
  fishImg.style.objectFit = "contain";

  popupFishElement.appendChild(fishImg);
  body.appendChild(popupFishElement);

  // 애니메이션 로직
  const spawnFish = (e) => {
    e.style.transform = `translate(-${HALF},-${HALF})`;
    e.style.opacity = "1";

    setTimeout(() => {
      e.style.transform = `translate(-${HALF},-70%)`;
      e.style.opacity = "0";
      setTimeout(() => {
        if (e.parentNode) e.remove();
      }, 500);
    }, 1000); // 1초 동안 보여줌
  };

  requestAnimationFrame(() => spawnFish(popupFishElement));
};

// [중요] HTML의 script 태그에서 호출할 수 있도록 전역 등록
window.popupFish = popupFish;

export default popupFish;