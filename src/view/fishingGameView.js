/**
 * [파일 역할]
 * - 낚시 미니게임 화면의 DOM 생성/갱신/애니메이션 상태 표현을 담당하는 View 모듈.
 *
 * [왜 필요한가]
 * - 모델 로직에서 화면 구성까지 섞이면 유지보수가 어려워지므로, 시각 표현을 독립 계층으로 분리한다.
 *
 * [핵심 기능]
 * - renderScreens: 팀별 슬라이드 HTML 생성
 * - initSwiper: 슬라이더 초기화(터치 비활성, 루프)
 * - toggleOverlay/toggleResultOverlay/toggleFinalModal: 레이어 표시 제어
 * - updateRecord: 낚은 멤버 기록 누적
 * - animateFishingAction: 낚싯줄/물고기 상태 단계별 변경
 */
import fishingGameState from "../model/fishingGameState.js";

const fishingGameView = {
  swiper: null,

  // 게임 화면 HTML 생성 및 렌더링
  renderScreens: () => {
    const wrapper = document.getElementById("game-screens-wrapper");
    wrapper.innerHTML = fishingGameState.teams.map((team, idx) => {
        const fishermanImg = idx % 2 === 0 ? "1" : "2";
        return `
            <div class="swiper-slide">
                <div class="game-screen">
                    <div class="team-info">
                        <h2>${team.teamName}</h2>
                        <div class="record-box dark-text" id="record-${idx}">대기 중...</div>
                    </div>
                    <div class="wave-background"><div class="wave-canvas -three"></div></div>
                    <div class="boat-container">
                        <div class="boat"></div>
                        <div class="fishing-line line-style-${idx % 2}" id="line-${idx}">
                            <div class="fish">🐟</div>
                        </div>
                        <img src="../img/fishing_${fishermanImg}.svg" class="fisherman" onerror="this.style.display='none'">
                    </div>
                    <div class="wave-foreground">
                        <div class="wave-canvas -one"></div>
                        <div class="wave-canvas -two"></div>
                    </div>
                </div>
            </div>`;
      })
      .join("");
  },

  // Swiper 초기화
  initSwiper: () => {
    if (fishingGameView.swiper) fishingGameView.swiper.destroy();
    fishingGameView.swiper = new Swiper(".mySwiper", {
      allowTouchMove: false,
      loop: true,
      speed: 600,
      observer: true,
      observeParents: true,
    });
  },

  // 오버레이(게임화면) 보이기/숨기기
  toggleOverlay: (show) => {
    document.getElementById("minigame-overlay").style.display = show ? "block" : "none";
  },

  // 결과 오버레이(게임 내 작은 팝업) 보이기/숨기기
  toggleResultOverlay: (show) => {
    document.getElementById("game-result-overlay").style.display = show ? "block" : "none";
  },

  // 최종 결과 모달 보이기/숨기기
  toggleFinalModal: (show) => {
    document.getElementById("final-result-modal").style.display = show ? "flex" : "none";
  },

  // 낚시 성공 시 기록 업데이트
  updateRecord: (idx, memberName) => {
    const record = document.getElementById(`record-${idx}`);
    if (record.innerHTML === "대기 중...") record.innerHTML = "";
    const item = document.createElement("div");
    item.innerHTML = `&nbsp;🎣 <b class="dark-text">${memberName}</b> 성공!`;
    record.prepend(item);
  },

  // 낚시 애니메이션 DOM 조작 (선과 물고기)
  animateFishingAction: (idx, step) => {
    const activeSlide = fishingGameView.swiper.slides[fishingGameView.swiper.activeIndex];
    if (!activeSlide) return;

    const line = activeSlide.querySelector(`.fishing-line`);
    const fish = activeSlide.querySelector(`.fish`);

    if (step === "down") {
      line.style.height = "420px";
    } else if (step === "catch") {
      fish.style.display = "block";
      line.style.height = "130px";
    } else if (step === "reset") {
      fish.style.display = "none";
      line.style.height = "150px";
    }
  },
};


export default fishingGameView;
