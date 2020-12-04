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