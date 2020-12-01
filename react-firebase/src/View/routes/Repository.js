let audio;

export function playAudio(source) {
    if (audio == null) {
        audio = new Audio(source);
    }
    audio.play();
}

export function pauseAudio() {
    audio.pause();
}

export function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
}

function playsnippet() {
    const audioSource= 'https://firebasestorage.googleapis.com/v0/b/wavbasedb-9a679.appspot.com/o/test_audio%2Ftest_piano.mp3?alt=media&token=e3dce63f-0aab-4d68-be39-39893c759e8e';
    function handlePlay() {
        playAudio(audioSource);
    }

    return (
        <div>
            <button onClick={handlePlay}>Play</button>
            <button onClick={pauseAudio}>Pause</button>
            <button onClick={stopAudio}>Stop</button>
        </div>
    );
}