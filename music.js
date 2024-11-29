// Get HTML elements
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeControl = document.getElementById('volume');
const progressControl = document.getElementById('progress');
const audio = document.getElementById('audio');
const trackName = document.getElementById('track-name');
const artistName = document.getElementById('artist-name');
const audioSource = document.getElementById('audio-source');

// Playlist (Array of songs)
const playlist = [
    { src: 'track1.mp3', track: 'Song 1', artist: 'Artist 1' },
    { src: 'track2.mp3', track: 'Song 2', artist: 'Artist 2' },
    { src: 'track3.mp3', track: 'Song 3', artist: 'Artist 3' }
];

let currentTrackIndex = 0;

// Set the initial track
function loadTrack(index) {
    audioSource.src = playlist[index].src;
    trackName.textContent = playlist[index].track;
    artistName.textContent = playlist[index].artist;
    audio.load();
}

// Play or Pause the audio
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
}

// Move to the next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

// Move to the previous track
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

// Update progress bar
function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressControl.value = progress;
}

// Seek to a specific time
function seekAudio() {
    audio.currentTime = (progressControl.value / 100) * audio.duration;
}

// Set volume
function setVolume() {
    audio.volume = volumeControl.value / 100;
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
progressControl.addEventListener('input', seekAudio);
volumeControl.addEventListener('input', setVolume);

// Update progress every second
audio.addEventListener('timeupdate', updateProgress);

// Initial setup
loadTrack(currentTrackIndex);
