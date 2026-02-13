// [수정 1] import 구문 삭제하고, 경로를 문자열로 직접 배열에 저장
// 주의: 경로는 index.html 파일 기준으로 작성해야 합니다.
// index.html이 최상위에 있고 img 폴더가 같은 위치에 있다면 "img/fish1.png"입니다.
const fishArr = [
  "img/fish1.png",
  "img/fish2.png",
  "img/fish3.png",
  "img/fish4.png",
  "img/fish5.png",
  "img/fish6.png",
];

const popupFish = () => {
  const HALF = "50%";
  const body = document.querySelector("body");

  // 1. 팝업 컨테이너 생성
  const popupFishElement = document.createElement("div");

  // 팝업 스타일 지정
  const popupFishElementStyle = (e) => {
    e.style.width = "600px";
    e.style.height = "400px";
    // 이미지를 꽉 차게 보여주려면 flex나 background 설정을 추천하지만 일단 유지
    e.style.display = "flex"; 
    e.style.justifyContent = "center";
    e.style.alignItems = "center";
    
    e.style.backgroundColor = "#fff";
    e.style.borderRadius = "10px";
    e.style.border = "3px solid #222";
    e.style.position = "fixed";
    e.style.left = HALF;
    e.style.top = HALF;
    // 처음 위치 (약간 아래에서 시작)
    e.style.transform = `translate(-${HALF},-30%)`;
    e.style.transition = "all 0.5s ease-out"; // 부드러운 감속 추가
    e.style.zIndex = "10"; // 다른 요소 위에 뜨도록
  };

  popupFishElementStyle(popupFishElement);

  // 2. [중요 수정] 이미지 요소 '생성' 하기
  // 기존 코드: document.querySelector("img") -> 이건 화면에 있는 엄한 이미지를 가져옵니다.
  // 수정 코드: document.createElement("img") -> 새 이미지를 만들어야 합니다.
  const fishImg = document.createElement("img");
  
  // 랜덤 인덱스 추출
  const fishIndex = Math.floor(Math.random() * fishArr.length);
  
  // 이미지 경로 할당
  fishImg.src = fishArr[fishIndex];
  
  // 이미지 크기 조절 (팝업 안에 예쁘게 들어가게)
  fishImg.style.maxWidth = "90%";
  fishImg.style.maxHeight = "90%";
  fishImg.style.objectFit = "contain";

  // 팝업에 이미지 넣기
  popupFishElement.appendChild(fishImg);

  // body에 팝업 넣기
  body.appendChild(popupFishElement);

  // 3. 애니메이션 로직
  const spawnFish = (e) => {
    // 등장 위치 (중앙)
    e.style.transform = `translate(-${HALF},-${HALF})`;
    e.style.opacity = "1";

    // 1초 뒤에 사라짐
    setTimeout(() => {
      // 위로 올라가면서 사라지기
      e.style.transform = `translate(-${HALF},-70%)`;
      e.style.opacity = "0";
      
      // 애니메이션 시간(0.5s) 뒤에 요소 삭제
      setTimeout(() => {
        if (e.parentNode) { // 안전장치: 부모가 있을 때만 삭제
            e.remove();
        }
      }, 500);
    }, 1000);
  };

  // 다음 프레임에 애니메이션 실행 (등장 효과)
  requestAnimationFrame(() => spawnFish(popupFishElement));
};

export default popupFish;