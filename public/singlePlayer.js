
const editButton = document.querySelector('.editButton')
const player = document.querySelector('.radio-container')
const progressContainer = document.querySelector('.progressContainer')
const progressBar = document.querySelector('.progBar')
const audio = document.querySelector('#audio')
const banner = document.querySelector('.profileBanner')
const backBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const forwardBtn = document.querySelector('#next')



function editProfile() {
  const profileModal = document.getElementById('profileModal');
  const modalObj = new bootstrap.Modal(profileModal);
  modalObj.show();
}

// function editBanner() {
//   const bannerModal = document.getElementById('bannerModal');
//   const modalObj = new bootstrap.Modal(bannerModal);
//   modalObj.show();
// }

function playSong(){
player.classList.add('play')
playBtn.querySelector('i').classList.remove('fa-play')
playBtn.querySelector('i').classList.add('fa-pause')
audio.play()
}

function pauseSong(){
  player.classList.remove('play')
  playBtn.querySelector('i').classList.add('fa-play')
playBtn.querySelector('i').classList.remove('fa-pause')
audio.pause()
}

function back(){

}

function forward(){

}

function updateProgress(e){
const {duration, currentTime} = e.srcElement
const progressPercent = (currentTime/ duration)*100
progressBar.style.width = `${progressPercent}%`

}
//play song
playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play')
  if(isPlaying){
    pauseSong()
  }else{
    playSong()
  }
})

backBtn.addEventListener('click', back)

forwardBtn.addEventListener('click' ,forward)

audio.addEventListener('timeupdate', updateProgress)

// Fetch the songs from the server
function trackFetch(){
  fetch('/tracks')
  .then((response) => response.json())
  .then((data) => {
    const songUrls = data.map((track) => track.song);
    const trackNames = data.map((track) => track.trackName);
    const uploadedBy = data.map((track) => track.uploadedBy);
 
    console.log(songUrls);
    console.log(trackNames);
    console.log(uploadedBy);
  })
  .catch((error) => console.error(error));
}

trackFetch()