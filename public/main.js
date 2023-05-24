
const banner = document.querySelector('.editBanner');
const profilePicture = document.querySelector('.profileImage');
const editButton = document.querySelector('.editButton');
const editMove = document.getElementsByClassName('editMove');
const editMoveBtn = Array.from(editMove)

editMoveBtn.forEach(element =>{
  element.addEventListener('click',() =>{
  const moveModal = document.getElementById('moveModal');
  const modalObj = new bootstrap.Modal(moveModal);
  modalObj.show();

  })
})
const players = document.getElementsByClassName('player-container');
const progressContainer = document.getElementsByClassName('progressContainer');
const progressBar = document.getElementsByClassName('progBar');
const audios = document.getElementsByClassName('audio');
const playBtn = document.getElementsByClassName('playBtn');
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





// profile editing : profilePicture
profilePicture.addEventListener('click', () => {
  const editModal = document.getElementById('profilePictureModal');
  const modalObj = new bootstrap.Modal(editModal);
  modalObj.show();
});

//editing banner

banner.addEventListener('click', () =>{
  const bannerModal = document.getElementById('bannerModal');
  const modalObj = new bootstrap.Modal(bannerModal);
  modalObj.show(); 
});
// banner function end
// edit bio
editButton.addEventListener('click', () =>{
  const bioModal = document.getElementById('bioModal');
  const modalObj = new bootstrap.Modal(bioModal);
  modalObj.show(); 
});
// edit Move

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

//  editing progress bar on each song
function setProgress(e){
  const width = this.clientWidth;
  const clickX= e.offsetX;

  for (let i = 0; i < AudioArray.length; i++) {
    let duration = AudioArray[i].duration;
    AudioArray[i].currentTime = (clickX / width) * duration;
  }
}
//having the progress bar move over time
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progArray.map(element=> element.style.width = `${progressPercent}%`);
}

  // add progress event for each audio
  audio.addEventListener('timeupdate', updateProgress);
}
progressUpdateArray.map(element=> element.addEventListener('click', setProgress))
