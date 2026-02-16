// LocalStorage 폴리필
if (typeof localStorage === "undefined") {
  let store = {};
  let localStorageMock = {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
}

const STORAGE_KEY = "teamMembers";

const memberModel = {
  getMembers: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },

  setMembers: (members) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  },

  init: () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  },

  deleteMembers: (indices) => {
    const members = memberModel.getMembers();
    // indices는 내림차순 정렬되어 있다고 가정하거나 여기서 정렬
    indices.sort((a, b) => b - a);

    for (const index of indices) {
      if (index >= 0 && index < members.length) {
        members.splice(index, 1);
      }
    }
    memberModel.setMembers(members);
  },
};

export default memberModel;
/**
 * [파일 역할]
 * - 멤버 목록을 LocalStorage에 저장/조회/삭제하는 데이터 모델.
 *
 * [왜 필요한가]
 * - 페이지를 새로고침해도 멤버 목록이 유지되어야 하며, CRUD 화면과 저장소를 분리해야 구조가 깔끔해진다.
 *
 * [핵심 기능]
 * - getMembers/setMembers: 저장소 I/O
 * - init: 최초 실행 시 기본 배열 생성
 * - deleteMembers: 체크된 멤버 일괄 삭제(인덱스 역순 처리)
 */
