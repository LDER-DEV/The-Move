const editButton = document.querySelector('.editButton');
const players = document.getElementsByClassName('player-container');
const progressContainer = document.querySelector('.progressContainer');
const progressBar = document.querySelector('.progBar');
const audios = document.getElementsByClassName('audio');
const banner = document.querySelector('.editBanner');
const backBtn = document.querySelector('#prev');
const playBtn = document.getElementsByClassName('playBtn');
const forwardBtn = document.querySelector('#next');
const AudioArray = Array.from(audios);
const playerArray = Array.from(players);

function editBanner() {
  const editModal = document.getElementById('editModal');
  const modalObj = new bootstrap.Modal(editModal);
  modalObj.show();
}

function back() {
  // Implementation for back function
}

function forward() {
  // Implementation for forward function
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

editButton.addEventListener('click', () => {
  const editModal = document.getElementById('Modal');
  const modalObj = new bootstrap.Modal(editModal);
  modalObj.show();
});

banner.addEventListener('click', editBanner);

// for each player, play button and audio element
for(let i = 0; i < playerArray.length; i++) {
  let player = playerArray[i];
  let playButton = playBtn[i];
  let audio = AudioArray[i];

  playButton.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if (isPlaying) {
      player.classList.remove('play');
      playButton.querySelector('i').classList.add('fa-play');
      playButton.querySelector('i').classList.remove('fa-pause');
      audio.pause();
    } else {
      player.classList.add('play');
      playButton.querySelector('i').classList.remove('fa-play');
      playButton.querySelector('i').classList.add('fa-pause');
      audio.play();
    }
  });

  // add progress event for each audio
  audio.addEventListener('timeupdate', updateProgress);
}

backBtn.addEventListener('click', back);
forwardBtn.addEventListener('click', forward);