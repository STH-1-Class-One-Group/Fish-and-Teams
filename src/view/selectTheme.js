function selectTheme() {
    // 모든 테마 버튼을 선택합니다.
    const themeButtons = document.querySelectorAll('.theme-list button');

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. 버튼의 data-theme 값(light, dark, ocean)을 가져옵니다.
            const theme = button.getAttribute('data-theme');

            // 2. body의 기존 클래스를 모두 제거하고 새로운 테마 클래스를 추가합니다.
            // (다른 클래스가 섞여있지 않다면 classList.replace 대신 아래 방식을 사용합니다.)
            document.body.className = theme;
            
            // 💡 만약 body에 다른 클래스가 유지되어야 한다면?
            // document.body.classList.remove('light', 'dark', 'ocean');
            // document.body.classList.add(theme);
        });
    });
}

export default selectTheme;