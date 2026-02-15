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
