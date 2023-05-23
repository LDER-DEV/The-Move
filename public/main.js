const editButton = document.querySelector('.editButton');
const players = document.getElementsByClassName('player-container');
const progressContainer = document.getElementsByClassName('progressContainer');
const progressBar = document.getElementsByClassName('progBar');
const audios = document.getElementsByClassName('audio');
const banner = document.querySelector('.editBanner');
// const backBtn = document.querySelector('#prev');
const playBtn = document.getElementsByClassName('playBtn');
// const forwardBtn = document.querySelector('#next');
const AudioArray = Array.from(audios);
const playerArray = Array.from(players);
const progArray = Array.from(progressBar)
const progressUpdateArray = Array.from(progressContainer)
// this event listener holds a callback that allows the upload form to pop up
document.getElementById('toggleFormButton').addEventListener('click', function() {
  const form = document.getElementById('uploadForm');
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
});



function editBanner() {
  const editModal = document.getElementById('editModal');
  const modalObj = new bootstrap.Modal(editModal);
  modalObj.show();
}
function setProgress(e){
  const width = this.clientWidth;
  const clickX= e.offsetX;

  for (let i = 0; i < AudioArray.length; i++) {
    let duration = AudioArray[i].duration;
    AudioArray[i].currentTime = (clickX / width) * duration;
  }
}
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progArray.map(element=> element.style.width = `${progressPercent}%`);
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
progressUpdateArray.map(element=> element.addEventListener('click', setProgress))
// backBtn.addEventListener('click', back);
// forwardBtn.addEventListener('click', forward);