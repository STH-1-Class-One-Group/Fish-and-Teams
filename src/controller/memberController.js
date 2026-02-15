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
