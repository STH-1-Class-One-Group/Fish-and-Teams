function toggleThemeDropdown() {
    document.addEventListener('DOMContentLoaded', function() {
        const toggleBtn = document.querySelector('.theme-toggle-btn');
        const themeList = document.querySelector('.theme-list');

        toggleBtn.addEventListener('click', function() {
            // 1. 버튼에 active 클래스 토글 (화살표 회전용)
            this.classList.toggle('active');

            // 2. 슬라이드 토글 로직
            if (themeList.style.maxHeight) {
                // 열려있는 경우 -> 닫기
                themeList.style.maxHeight = null;
                themeList.style.opacity = 0;
            } else {
                // 닫혀있는 경우 -> 열기 (scrollHeight는 요소의 실제 콘텐츠 높이)
                themeList.style.maxHeight = themeList.scrollHeight + "px";
                themeList.style.opacity = 1; // 부드러운 전환을 위해 opacity도 조절
            }
        });
    });
}

export default toggleThemeDropdown;
