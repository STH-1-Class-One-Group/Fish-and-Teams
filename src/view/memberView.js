import memberModel from "../model/memberModel.js";
import bindDistributeEvents from "../controller/bindDistributeEvents.js";
import clickRandomTeamBtn from "../controller/clickRandomTeamBtn.js";

const memberView = {
  renderMembers: (members) => {
    const valueToStars = (value) => {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue) || numValue < 0 || numValue > 4) return "";
      return "⭐️".repeat(numValue + 1);
    };

    const listItems = members
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

    const tableDataContainer = document.querySelector(".table-data");
    if (tableDataContainer) {
      tableDataContainer.innerHTML = listItems;
    } else {
      console.error("HTML에서 .table-data 요소를 찾을 수 없습니다!");
    }

    // 이벤트 리스너 재연결
    bindDistributeEvents();
    clickRandomTeamBtn();
  },

  updateMasterCheckbox: (isChecked) => {
    const masterCheckbox = document.querySelector(
      'input[onclick="sumCheckbox(this)"]',
    );
    if (masterCheckbox) masterCheckbox.checked = isChecked;
  },

  openAddPopup: () => {
    const addWindow = window.open("", "_blank", "width=400,height=400");
    addWindow.document.write(`
            <html>
            <head>
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
                <title>멤버 추가</title>
                <script>
                    function submitAdd() {
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

                        const newMember = { name, age, sex: sex.value, value };
                        
                        let members = JSON.parse(window.opener.localStorage.getItem('teamMembers')) || [];
                        members.push(newMember);
                        window.opener.localStorage.setItem('teamMembers', JSON.stringify(members));
                        window.opener.mainFrm();
                        window.close();
                    }
                </script>
            </head>
            <body>
                <h2>✏️ 멤버 추가</h2>
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
  },

  openModifyPopup: (member, index) => {
    let options = "";
    for (let i = 0; i < 5; i++) {
      const stars = "⭐️".repeat(i + 1);
      const selected = i == member.value ? "selected" : "";
      options += `<option value="${i}" ${selected}>${stars}</option>`;
    }

    const modifyWindow = window.open("", "_blank", "width=400,height=500");
    if (!modifyWindow) {
      alert("팝업 차단을 해제해주세요!");
      return;
    }

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

                        const modifiedMember = { name, age, sex: sex.value, value };
                        
                        let members = JSON.parse(window.opener.localStorage.getItem('teamMembers')) || [];
                        members[${index}] = modifiedMember;

                        window.opener.localStorage.setItem('teamMembers', JSON.stringify(members));
                        window.opener.mainFrm();
                        
                        const masterCheckbox = window.opener.document.querySelector('input[onclick="sumCheckbox(this)"]');
                        if(masterCheckbox) masterCheckbox.checked = false;

                        window.close();
                    }
                <\/script>
            </head>
            <body>
                <h2>✏️ 멤버 수정</h2>
                <p><label>이름:</label> <input type="text" id="name" value="${member.name}"></p>
                <p><label>나이:</label> <input type="text" id="age" value="${member.age}" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 3)"></p>
                <p><label>성별:</label> 
                    <input type="radio" name="sex" value="남자" ${member.sex === "남자" ? "checked" : ""}> 남자
                    <input type="radio" name="sex" value="여자" ${member.sex === "여자" ? "checked" : ""}> 여자
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
  },
};

export default memberView;
