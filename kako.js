function randomArrangeAndShare(teamCount) {
    // --- [STEP 1: 팀 배정 로직 실행] ---
    const resultTeams = executeSnakeDraft(teamCount); 

    // --- [STEP 2: 카톡에 보낼 텍스트 만들기] ---
    let resultText = "조 편성 결과입니다:\n";
    resultTeams.forEach(team => {
        const names = team.members.map(m => m.name).join(', ');
        resultText += `\n[${team.teamName}팀]: ${names}`;
    });

    // --- [STEP 3: 카카오톡 공유 실행] ---
    if (Kakao.isInitialized()) {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '🎉 팀 배치 완료!',
                description: resultText, // 위에서 만든 팀 명단 텍스트가 여기 들어가요
                imageUrl: 'https://cdn.pixabay.com/photo/2017/11/10/05/24/group-2935521_1280.png',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            buttons: [
                {
                    title: '나도 확인하기',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
            ],
        });
    } else {
        alert('카카오 SDK가 초기화되지 않았습니다. 페이지를 새로고침하고 다시 시도해주세요.');
    }
}
