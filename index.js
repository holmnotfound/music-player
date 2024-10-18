console.log("hello world")


let playlist = [
    "/music/Taylor Swift - Florida!!! (feat. Florence + The Machine) (Official Lyric Video) [ ezmp3.cc ].mp3",
    "/music/Taylor Swift - I Can Do It With a Broken Heart (Official Lyric Video) [ ezmp3.cc ].mp3",
    "/music/Taylor Swift - Who’s Afraid of Little Old Me_ (Official Lyric Video) [ ezmp3.cc ].mp3"
];

let audioPlayer = document.getElementById('audioPlayer');
let playButton = document.getElementById('playButton');
let pauseButton = document.getElementById('pauseButton');
let progressBar = document.getElementById('progressBar');
let prevButton = document.getElementById('prevButton');
let nextButton = document.getElementById('nextButton');
let source = audioPlayer.querySelector('source');

// man börjar räkna på noll, så första track är nr 0
let currentTrack = 0;

// knapp för att starta ljudet
playButton.addEventListener('click', function(){
    audioPlayer.play();
});

// knapp för att pausa ljudet
pauseButton.addEventListener('click', function(){
    audioPlayer.pause();
});

// Funktion för att ladda och spela en ny låt
function loadTrack(trackIndex) {
    source.src = playlist[trackIndex]; 
    audioPlayer.load(); 
    audioPlayer.play(); 
}

// Nästa låt knapp
nextButton.addEventListener('click', function() {
    currentTrack++;
    if (currentTrack >= playlist.length) {
        currentTrack = 0;
    }
    loadTrack(currentTrack);
});

// Föregående låt knapp
prevButton.addEventListener('click', function() {
    currentTrack--;
    if (currentTrack < 0) {
        currentTrack = playlist.length - 1;
    }
    loadTrack(currentTrack);
});

// uppdaterar reglaget baserat på ljudest uppspelningstid
audioPlayer.addEventListener('timeupdate', function () {
    let value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = value;
})

// när du drar i reglaget flyttat ljudets tid
progressBar.addEventListener('input', function () {
    let time = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = time;
})

// function för när en låt slutar börjar en annan
audioPlayer.addEventListener('ended', function () {
    currentTrack++;
    if (currentTrack < playlist.length) {
        audioPlayer.src = playlist[currentTrack];
        audioPlayer.play();
    }
});