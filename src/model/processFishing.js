import fishingGameModel from "./fishingGameModel.js";
import fishingGameState from "./fishingGameState.js";
import fishingGameView from "../view/fishingGameView.js";
import fishLoopController from "./fishLoopController.js";
import popupFish from "../view/popupfish.js";

// [핵심 로직] 낚시 진행
// 흐름: 스페이스바 → 즉시 잠금 → 애니메이션 → 애니메이션 종료 후 팝업 → 슬라이드 이동 → 잠금 해제
const processFishing = () => {
  // 1. [진입 차단] 이미 진행 중이거나 게임이 끝났으면 무시
  if (fishingGameState.isProcessing || fishingGameModel.isGameFinished())
    return;

  // 2. [★잠금 시작★] 이 순간부터 모든 스페이스바 입력은 절대 동작하지 않음
  fishingGameState.isProcessing = true;

  const swiperIdx = fishingGameView.swiper.realIndex;

  // --- [애니메이션 1단계] 낚싯줄 내리기 ---
  fishingGameView.animateFishingAction(swiperIdx, "down");

  // 0.8초 후 (낚싯줄 내려간 상태)
  setTimeout(() => {
    // --- [애니메이션 2단계] 낚아올리기 (물고기 보임) ---
    fishingGameView.animateFishingAction(swiperIdx, "catch");

    // 0.7초 후 (물고기가 올라온 상태에서 데이터 처리)
    setTimeout(() => {
      // 데이터 처리
      const caughtMember = fishingGameModel.catchMember(swiperIdx);

      if (!caughtMember) {
        // [실패 - 이미 낚음]
        alert("이 팀은 이미 만선입니다!");
        fishingGameView.animateFishingAction(swiperIdx, "reset");
        fishingGameState.isProcessing = false;
        return;
      }

      // [성공] 화면에 이름 기록 (record box)
      fishingGameView.updateRecord(swiperIdx, caughtMember.name);

      // --- [애니메이션 3단계] 낚시 연출 정리 ---
      // 0.8초 대기 후 낚싯줄과 물고기를 리셋
      setTimeout(() => {
        fishingGameView.animateFishingAction(swiperIdx, "reset");

        // [★★★ 팝업은 여기서만! ★★★]
        // 낚시 애니메이션이 완전히 종료된 이 시점에서만 팝업을 띄웁니다.
        popupFish(caughtMember.name);

        // 팝업 애니메이션이 보이는 동안 잠시 대기 (1.5초) 후 다음 진행
        setTimeout(() => {
          // 게임 종료 체크
          if (fishingGameModel.isGameFinished()) {
            fishLoopController.stop();
            fishingGameView.toggleResultOverlay(true);
            fishingGameState.isProcessing = false;
          } else {
            // 다음 슬라이드로 이동
            fishingGameView.swiper.slideNext();

            // [★잠금 해제★] 슬라이드가 완전히 넘어간 후 (0.7초 뒤)에야 입력 활성화
            setTimeout(() => {
              fishingGameState.isProcessing = false;
            }, 700);
          }
        }, 1500);
      }, 800);
    }, 700);
  }, 800);
};

export default processFishing;
/**
 * [파일 역할]
 * - 스페이스바 입력 1회에 대응하는 낚시 1회 처리 시퀀스(애니메이션 + 데이터 + 화면 전환)를 통합 실행.
 *
 * [왜 필요한가]
 * - 낚싯줄 내리기 -> 낚기 -> 기록 -> 팝업 -> 다음 슬라이드 이동 흐름이 비동기(setTimeout)로 연결되므로,
 *   단일 함수로 관리해야 중복 입력 차단과 상태 복구를 안정적으로 보장할 수 있다.
 */
