// Sample songs data
const songs = [
    { title: "Closer", artist: "Ed Sheeran", file: "Closer.mp3" },
    { title: "FullOfSorrow", artist: "The Weeknd", file: "FullOfSorrow.mp3" },
    { title: "GoodbyeSunshine", artist: "Dua Lipa", file: "GoodbyeSunshine.mp3" },
    { title: "Illusion", artist: "Justin Bieber & The Kid LAROI", file: "Illusion.mp3" },
    { title: "PerfectLife", artist: "Billie Eilish", file: "PerfectLife.mp3" }
  ];
  
  let currentSongIndex = 0;
  const audio = new Audio(songs[currentSongIndex].file);
  const playButton = document.getElementById('play-btn');
  const nextButton = document.getElementById('next-btn');
  const prevButton = document.getElementById('prev-btn');
  const volumeControl = document.getElementById('volume');
  const progressBar = document.getElementById('progress-bar');
  const songTitle = document.getElementById('song-title');
  const songArtist = document.getElementById('song-artist');
  const playlistContainer = document.getElementById('playlist-items');
  const searchInput = document.getElementById('search');
  const currentTimeElement = document.getElementById('current-time');
  
  // Update playlist display
  function updatePlaylist(songList) {
    playlistContainer.innerHTML = '';
    songList.forEach((song, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${song.title} - ${song.artist}`;
      listItem.addEventListener('click', () => loadSong(index));
      playlistContainer.appendChild(listItem);
    });
  }
  
  // Load song data into the UI
  function loadSong(index) {
    const song = songs[index];
    audio.src = song.file;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audio.play();
    playButton.textContent = "Pause";
    updateProgressBar();
  }
  
  // Play/Pause functionality
  function togglePlay() {
    if (audio.paused) {
      audio.play();
      playButton.textContent = "Pause";
    } else {
      audio.pause();
      playButton.textContent = "Play";
    }
  }
  
  // Next song
  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
  }
  
  // Previous song
  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
  }
  
  // Volume control
  volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
  });
  
  // Update progress bar as the song plays
  function updateProgressBar() {
    setInterval(() => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progress;
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      currentTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);
  }
  
  // Search functionality
  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song =>
      song.title.toLowerCase().includes(searchText) || song.artist.toLowerCase().includes(searchText)
    );
    updatePlaylist(filteredSongs);
  });
  
  // Initialize
  loadSong(currentSongIndex);
  updatePlaylist(songs);
  
  // Event listeners for controls
  playButton.addEventListener('click', togglePlay);
  nextButton.addEventListener('click', nextSong);
  prevButton.addEventListener('click', prevSong);
  progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  });
  