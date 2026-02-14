//  bindDistributeEvents 가져오기
import bindDistributeEvents from "../controller/bindDistributeEvents.js";
// clickRandomTeamBtn 가져오기
import clickRandomTeamBtn from "../controller/clickRandomTeamBtn.js";
// renderTeamResults 가져오기
import pressSpaceBar from "../controller/pressSpaceBar.js";
// clickThemeButton 가져오기
import hoverThemeButton from "../controller/hoverThemeButton.js";
// themeController 가져오기
import themeController from "../controller/themeController.js"; 


// 가져온 것 테스트

// ===========================================================
// 1. LocalStorage 폴리필 (Polyfill)
// ===========================================================
// 브라우저에 localStorage 기능이 없거나 차단된 경우를 대비한 안전장치입니다.
// 만약 localStorage가 없다면, 메모리 상에 임시 객체(store)를 만들어
// 마치 localStorage가 있는 것처럼 흉내 냅니다.
if (typeof localStorage === "undefined") {
  // 데이터를 저장할 임시 저장소
  let store = {};

  // localStorage의 핵심 기능들을 가짜로 구현
  let localStorageMock = {
    getItem: function (key) {
      return store[key] || null; // 키로 값 가져오기
    },
    setItem: function (key, value) {
      store[key] = value.toString(); // 키와 값을 문자열로 저장
    },
    removeItem: function (key) {
      delete store[key]; // 해당 키 삭제
    },
    clear: function () {
      store = {}; // 저장소 초기화
    },
  };

  // window 객체에 가짜 localStorage를 정의하여 에러 방지
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
}

// ===========================================================
// 2. 메인 화면 렌더링 함수 (Read)
// ===========================================================
/**
 * [함수: mainFrm]
 * 역할: localStorage에 저장된 멤버 데이터를 불러와서, HTML 테이블로 화면에 그려줍니다.
 * 실행 시점: 페이지 로드 시, 멤버 추가/수정/삭제 후 화면 갱신 시
 */

function mainFrm() {
  try {
    let members = JSON.parse(localStorage.getItem("teamMembers")) || [];

    const valueToStars = (value) => {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue) || numValue < 0 || numValue > 4) return "";
      return "⭐️".repeat(numValue + 1);
    };

    // [수정 1] 새로운 HTML 구조(li.table-data-list)에 맞춰서 리스트 아이템 생성
    let listItems = members
      .map((member, index) => {
        return `
            <li class="table-data-list">
                <ul class="table-row">
                    <li class="table-cells tc-checkbox center">
                        <input type="checkbox" name="memberCheckbox" data-index="${index}" />
                    </li>
                    <li class="table-cells tc-number">
                        <p>${index + 1}</p>
                    </li>
                    <li class="table-cells tc-etc">
                        <p>${member.name}</p>
                    </li>
                    <li class="table-cells tc-etc">
                        <p>${member.age}</p>
                    </li>
                    <li class="table-cells tc-etc">
                        <p>${member.sex}</p>
                    </li>
                    <li class="table-cells tc-etc">
                        <p>${valueToStars(member.value)}</p>
                    </li>
                </ul>
            </li>
        `;
      })
      .join("");

    // [수정 2] 데이터를 넣을 타겟 요소 찾기 (.table-data)
    // 기존에는 #app을 통째로 갈아엎었지만, 이제는 리스트 영역만 갱신합니다.
    const tableDataContainer = document.querySelector(".table-data");

    if (tableDataContainer) {
      tableDataContainer.innerHTML = listItems;
    } else {
      console.error("HTML에서 .table-data 요소를 찾을 수 없습니다!");
    }

    // [수정 3] 이벤트 리스너 재연결 (컨트롤러 기능 활성화)
    // *주의: HTML 파일에 ID가 제대로 부여되어 있어야 작동합니다.
    bindDistributeEvents();
    clickRandomTeamBtn();
  } catch (error) {
    console.error("Error rendering main form:", error);
  }
}

/**
 * [함수: sumCheckbox]
 * 역할: 헤더의 체크박스를 누르면, 아래 모든 멤버의 체크박스를 켜거나 끕니다.
 */
function sumCheckbox(masterCheckbox) {
  // memberCheckbox이 달린 name을 찾음
  // 각 멤버에 체크박스를 설정하는 요소 = memberCheckbox
  //memberCheckbox가 name인 요소들을 모두 모음
  const checkboxes = document.getElementsByName("memberCheckbox");
  //   name이 memberCheckbox인 모든 체크박스를 체크
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = masterCheckbox.checked;
  }
}

// ===========================================================
// 3. 멤버 추가 기능 (Create)
// ===========================================================
/**
 * [함수: addMember]
 * 역할: 새 창(팝업)을 열어서 정보를 입력받고 저장합니다.
 */
function addMember() {
  // 1. 빈 팝업창 열기 (400x400 크기)
  const addWindow = window.open("", "_blank", "width=400,height=400");

  // 2. 팝업창 안에 HTML 내용 채워넣기 (동적 생성)
  addWindow.document.write(`
        <html>
        <head>
            <title>멤버 추가</title>
            <script>
                // [내부 함수] 팝업창에서 '추가' 버튼 누르면 실행됨
                function submitAdd() {
                    // 입력값 가져오기
                    const name = document.getElementById('name').value;
                    const age = document.getElementById('age').value;
                    // 성별은 체크되어있는 값을 기준
                    const sex = document.querySelector('input[name="sex"]:checked');
                    // 클릭한 별점의 개수에 따라
                    // 해당 별점의 값을 가져옴
                    const value = document.getElementById('ability').value;

                    // 유효성 검사: 빈 값이 있으면 경고
                    if (!name || !age || !sex || value === "") {
                        alert('모든 값을 입력하거나 선택해주세요.');
                        return;
                    }
                    // 유효성 검사: 나이는 숫자여야 하고 3자리 이하
                    if (isNaN(age) || age.length > 3) {
                        alert('나이는 3자리 이하의 숫자로 입력해주세요.');
                        return;
                    }

                    // 저장할 객체 생성
                    // 이름, 나이, 성별, (등급)값
                    const newMember = { name, age, sex: sex.value, value };

                    // ★ 핵심: 부모창(window.opener)의 localStorage에 접근
                    // 1. 부모창의 데이터를 가져와서 배열로 변환
                    let members = JSON.parse(window.opener.localStorage.getItem('teamMembers')) || [];
                    // 2. 새 멤버 추가
                    members.push(newMember);
                    // 3. 다시 문자열로 바꿔서 저장
                    window.opener.localStorage.setItem('teamMembers', JSON.stringify(members));
                    // 4. 부모창의 화면을 새로고침 (mainFrm 실행)
                    window.opener.mainFrm();
                    // 5. 팝업창 닫기
                    window.close();
                }
            </script>
        </head>
        <body>
            <h2>멤버 추가</h2>
            <p>이름: <input type="text" id="name"></p>
            <p>나이: <input type="text" id="age" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 3)"></p>
            <p>성별: 
                <input type="radio" name="sex" value="남자"> 남자
                <input type="radio" name="sex" value="여자"> 여자
            </p>
            <p>능력: 
                <select id="ability">
                    <option value="" disabled selected>선택하십시오</option>
                    <option value="0">⭐️</option>
                    <option value="1">⭐️⭐️</option>
                    <option value="2">⭐️⭐️⭐️</option>
                    <option value="3">⭐️⭐️⭐️⭐️</option>
                    <option value="4">⭐️⭐️⭐️⭐️⭐️</option>
                </select>
            </p>
            <button onclick="submitAdd()">추가</button>
        </body>
        </html>
    `);
}

// ===========================================================
// 4. 멤버 수정 기능 (Update)
// ===========================================================
/**
 * [함수: modifyMember]
 * 역할: 선택된 멤버의 기존 정보를 팝업창에 띄우고, 수정된 내용을 저장합니다.
 */
/**
 * [함수: modifyMember]
 * 역할: 선택된 멤버의 기존 정보를 팝업창에 띄우고, 수정된 내용을 저장합니다.
 */
function modifyMember() {
  // 1. [수정] 정확히 'memberCheckbox' 이름을 가진 체크박스만 가져오기
  // (밸런스 옵션 체크박스가 선택되는 문제 방지)
  const checkedBoxes = document.querySelectorAll(
    'input[name="memberCheckbox"]:checked',
  );

  // 유효성 검사: 아무것도 선택 안 했을 때
  if (checkedBoxes.length === 0) {
    alert("수정할 멤버를 선택해주세요.");
    return;
  }
  // 유효성 검사: 2명 이상 선택했을 때
  if (checkedBoxes.length > 1) {
    alert("수정은 한 번에 한 명만 가능합니다.");
    return;
  }

  // 2. 수정할 대상 데이터 찾기
  const index = checkedBoxes[0].getAttribute("data-index");
  let members = JSON.parse(localStorage.getItem("teamMembers")) || [];

  // 데이터 유효성 검사
  if (!members[index]) {
    alert("선택한 멤버 정보를 찾을 수 없습니다.");
    return;
  }

  const memberToModify = members[index];

  // 3. 셀렉트 박스(별점) 옵션 미리 만들기
  let options = "";
  for (let i = 0; i < 5; i++) {
    const stars = "⭐️".repeat(i + 1);
    const selected = i == memberToModify.value ? "selected" : "";
    options += `<option value="${i}" ${selected}>${stars}</option>`;
  }

  // 4. [수정] 팝업창 열기
  const modifyWindow = window.open("", "_blank", "width=400,height=500");

  // [중요] 팝업 차단 등으로 창이 안 열렸을 경우 방어 코드
  if (!modifyWindow) {
    alert("팝업 차단을 해제해주세요!");
    return;
  }

  // 5. [중요] 'modifyWindow' 객체에 write를 해야 합니다.
  // 그냥 document.write()를 쓰면 부모 창(현재 사이트)이 하얗게 날아갑니다.
  modifyWindow.document.write(`
        <html>
        <head>
            <title>멤버 수정</title>
            <style>
                body { font-family: sans-serif; padding: 20px; background-color: #f9f9f9; }
                h2 { color: #333; border-bottom: 2px solid #50c878; padding-bottom: 10px; }
                p { margin: 10px 0; }
                label { display: inline-block; width: 60px; font-weight: bold; }
                input[type="text"] { padding: 5px; border: 1px solid #ccc; border-radius: 4px; }
                button { 
                    background-color: #50c878; color: white; border: none; 
                    padding: 10px 20px; border-radius: 4px; cursor: pointer; 
                    font-weight: bold; margin-top: 20px; width: 100%;
                }
                button:hover { background-color: #3cb371; }
            </style>
            <script>
                function submitModify() {
                    const name = document.getElementById('name').value;
                    const age = document.getElementById('age').value;
                    const sex = document.querySelector('input[name="sex"]:checked');
                    const value = document.getElementById('ability').value;

                    if (!name || !age || !sex || value === "") {
                        alert('모든 값을 입력하거나 선택해주세요.');
                        return;
                    }
                     if (isNaN(age) || age.length > 3) {
                        alert('나이는 3자리 이하의 숫자로 입력해주세요.');
                        return;
                    }

                    // 수정된 객체 생성
                    const modifiedMember = { name, age, sex: sex.value, value };

                    // 부모창 데이터 가져오기 (window.opener 사용)
                    let members = JSON.parse(window.opener.localStorage.getItem('teamMembers')) || [];
                    
                    // 해당 인덱스 덮어쓰기
                    // ${index}는 템플릿 리터럴로 넘어온 고정된 숫자입니다.
                    members[${index}] = modifiedMember;

                    // 저장 및 화면 갱신
                    window.opener.localStorage.setItem('teamMembers', JSON.stringify(members));
                    window.opener.mainFrm(); // 부모창 리스트 새로고침
                    
                    // [UX 추가] 전체 선택 체크박스가 켜져있으면 꺼주기
                    const masterCheckbox = window.opener.document.querySelector('input[onclick="sumCheckbox(this)"]');
                    if(masterCheckbox) masterCheckbox.checked = false;

                    window.close(); // 팝업 닫기
                }
            <\/script>
        </head>
        <body>
            <h2>✏️ 멤버 수정</h2>
            <p><label>이름:</label> <input type="text" id="name" value="${memberToModify.name}"></p>
            <p><label>나이:</label> <input type="text" id="age" value="${memberToModify.age}" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 3)"></p>
            <p><label>성별:</label> 
                <input type="radio" name="sex" value="남자" ${memberToModify.sex === "남자" ? "checked" : ""}> 남자
                <input type="radio" name="sex" value="여자" ${memberToModify.sex === "여자" ? "checked" : ""}> 여자
            </p>
            <p><label>능력:</label> 
                <select id="ability" style="padding: 5px;">
                    <option value="" disabled>선택하십시오</option>
                    ${options} 
                </select>
            </p>
            <button onclick="submitModify()">수정 완료</button>
        </body>
        </html>
    `);
}

// ===========================================================
// 5. 멤버 삭제 기능 (Delete)
// ===========================================================
/**
 * [함수: delMember]
 * 역할: 체크된 멤버들을 배열에서 제거하고 저장합니다.
 */
/**
 * [함수: delMember]
 * 역할: 체크된 멤버들을 배열에서 제거하고 저장합니다.
 */
function delMember() {
  // [수정] 모든 체크박스가 아니라, 'memberCheckbox'라는 이름을 가진 체크박스만 선택!
  const checkedBoxes = document.querySelectorAll(
    'input[name="memberCheckbox"]:checked',
  );

  if (checkedBoxes.length === 0) {
    alert("삭제할 내용을 선택하십시오.");
    return;
  }

  // 2. 삭제할 인덱스들 수집
  let members = JSON.parse(localStorage.getItem("teamMembers")) || [];

  const indicesToDelete = Array.from(checkedBoxes).map((cb) =>
    parseInt(cb.getAttribute("data-index"), 10),
  );

  // [안전장치 추가] 혹시라도 NaN이 들어오면 걸러내기
  const validIndices = indicesToDelete.filter((idx) => !isNaN(idx));

  // 3. 내림차순 정렬 (큰 숫자부터 삭제해야 인덱스가 안 꼬임)
  validIndices.sort((a, b) => b - a);

  // 4. 배열에서 삭제 (splice)
  for (const index of validIndices) {
    // 인덱스가 유효한 범위인지 한 번 더 확인하면 완벽합니다.
    if (index >= 0 && index < members.length) {
      members.splice(index, 1);
    }
  }

  // 5. 저장 및 화면 갱신
  localStorage.setItem("teamMembers", JSON.stringify(members));
  mainFrm();

  // [추가] 전체 선택 체크박스가 켜져있을 수 있으니 꺼주기 (UI 센스)
  const masterCheckbox = document.querySelector(
    'input[onclick="sumCheckbox(this)"]',
  );
  if (masterCheckbox) masterCheckbox.checked = false;
}

// ===========================================================
// 6. 초기 실행 (Initialization)
// ===========================================================
function startcurd() {
  // 페이지의 모든 리소스(이미지 등)가 로드된 후 실행
  window.onload = function () {
    // 만약 처음 실행해서 데이터가 아예 없다면, 빈 배열로 초기화
    if (!localStorage.getItem("teamMembers")) {
      const initialMembers = [];
      localStorage.setItem("teamMembers", JSON.stringify(initialMembers));
    }
    // 초기 화면 그리기
    mainFrm();
  };
}

// 앱 시작
startcurd();

// pressSpaceBar 적용
pressSpaceBar();

// hoverThemeButton 적용
hoverThemeButton();

// themeController 적용
themeController();  

// [중요] 모듈 스코프 해결을 위한 전역 객체 할당
// ===========================================================
// HTML의 onclick="..." 속성이 이 함수들을 찾을 수 있게 window 객체에 등록합니다.
window.mainFrm = mainFrm;
window.sumCheckbox = sumCheckbox;
window.addMember = addMember;
window.modifyMember = modifyMember;
window.delMember = delMember;
