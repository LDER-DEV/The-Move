
const editButton = document.querySelector('.editButton')
const player = document.querySelector('.player-container')
const progressContainer = document.querySelector('.progressContainer')
const progressBar = document.querySelector('.progBar')
const audio = document.querySelector('#audio')
const banner = document.querySelector('.profileBanner')
const backBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const forwardBtn = document.querySelector('#next')


//Modal
function editProfile() {
  const editModal = document.getElementById('Modal');
  const modalObj = new bootstrap.Modal(editModal);
  modalObj.show();
}
function editBanner() {
  const editModal = document.getElementById('editModal');
  const modalObj = new bootstrap.Modal(editModal);
  modalObj.show();
}

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

editButton.addEventListener('click', editProfile)
banner.addEventListener('click',editBanner)
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
