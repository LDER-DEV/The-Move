
const player = document.querySelector('.radio-container')
const progressContainer = document.querySelector('.progressContainer')
const progressBar = document.querySelector('.progBar')
const audio = document.querySelector('#audio')
const backBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const forwardBtn = document.querySelector('#next')
const trackTitle = document.querySelector('.trackTitle')
const aritst = document.querySelector('.artist')





function playSong() {
  player.classList.add('play')
  playBtn.querySelector('i').classList.remove('fa-play')
  playBtn.querySelector('i').classList.add('fa-pause')
  audio.play()
}

function pauseSong() {
  player.classList.remove('play')
  playBtn.querySelector('i').classList.add('fa-play')
  playBtn.querySelector('i').classList.remove('fa-pause')
  audio.pause()
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progressBar.style.width = `${progressPercent}%`

}
//play song
playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play')
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})



audio.addEventListener('timeupdate', updateProgress)

// Fetch the songs from the server

fetch('/tracks')
  .then((response) => response.json())
  .then((data) => {
    const trackUrls = data.map((track) => track.song);
    const trackNames = data.map((track) => track.trackName);
    const uploadedBy = data.map((track) => track.uploadedBy);

    console.log(trackUrls);
    console.log(trackNames);
    console.log(uploadedBy);
    let trackIndex = 3

    function trackLoad(trackIndex) {
      trackTitle.innerText = trackNames[trackIndex]
      aritst.innerText = uploadedBy[trackIndex]
      audio.src = trackUrls[trackIndex]

    }
    trackLoad(trackIndex)
    
    function back() {
      trackIndex--
      if (trackIndex < 0) {
        trackIndex = trackUrls.length - 1
      }
      trackLoad(trackIndex)
      playSong()
    }

    function forward() {
      trackIndex++
      if (trackIndex > trackUrls.length - 1) {
        trackIndex = 0
      }
      trackLoad(trackIndex)
      playSong()
    }
    backBtn.addEventListener('click', back)

    forwardBtn.addEventListener('click', forward)
  })
  .catch((error) => console.error(error));



