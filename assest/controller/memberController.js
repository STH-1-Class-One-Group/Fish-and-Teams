/**
 * [파일 역할]
 * - 멤버 CRUD 흐름(조회/전체선택/추가/수정/삭제)을 조정하는 메인 컨트롤러.
 *
 * [왜 필요한가]
 * - Model(LocalStorage)과 View(DOM/팝업) 사이의 조정 계층이 있어야 예외 처리와 UI 갱신이 일관된다.
 *
 * [핵심 기능]
 * - mainFrm: 초기/재렌더 진입점
 * - sumCheckbox: 전체 선택 체크박스 동기화
 * - addMember/modifyMember/delMember: 사용자 액션 검증 후 view/model 호출
 */
import memberModel from "../model/memberModel.js";
import memberView from "../view/memberView.js";

const memberController = {
  // 메인 화면 로드 (mainFrm)
  mainFrm: () => {
    try {
      const members = memberModel.getMembers();
      memberView.renderMembers(members);
    } catch (error) {
      console.error("Error rendering main form:", error);
    }
  },

  // 전체 체크박스 제어 (sumCheckbox)
  sumCheckbox: (masterCheckbox) => {
    const checkboxes = document.getElementsByName("memberCheckbox");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = masterCheckbox.checked;
    }
  },

  // 멤버 추가 팝업 열기 (addMember)
  addMember: () => {
    memberView.openAddPopup();
  },

  // 멤버 수정 팝업 열기 (modifyMember)
  modifyMember: () => {
    const checkedBoxes = document.querySelectorAll(
      'input[name="memberCheckbox"]:checked',
    );

    if (checkedBoxes.length === 0) {
      alert("수정할 멤버를 선택해주세요.");
      return;
    }
    if (checkedBoxes.length > 1) {
      alert("수정은 한 번에 한 명만 가능합니다.");
      return;
    }

    const index = checkedBoxes[0].getAttribute("data-index");
    const members = memberModel.getMembers();

    if (!members[index]) {
      alert("선택한 멤버 정보를 찾을 수 없습니다.");
      return;
    }

    memberView.openModifyPopup(members[index], index);
  },

  // 멤버 삭제 (delMember)
  delMember: () => {
    const checkedBoxes = document.querySelectorAll(
      'input[name="memberCheckbox"]:checked',
    );

    if (checkedBoxes.length === 0) {
      alert("삭제할 내용을 선택하십시오.");
      return;
    }

    const indicesToDelete = Array.from(checkedBoxes)
      .map((cb) => parseInt(cb.getAttribute("data-index"), 10))
      .filter((idx) => !isNaN(idx));

    memberModel.deleteMembers(indicesToDelete);

    memberController.mainFrm();
    memberView.updateMasterCheckbox(false);
  },
};

export default memberController;
