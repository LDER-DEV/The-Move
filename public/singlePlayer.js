
const player = document.querySelector('.radio-container')
const progressContainer = document.querySelector('.progressContainer')
const progressBar = document.querySelector('.progBar')
const audio = document.querySelector('#audio')
const backBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const forwardBtn = document.querySelector('#next')
const trackTitle = document.querySelector('.trackTitle')
const aritst = document.querySelector('.artist')




//playing the song on click of the play button as well as changing the icon to pause
function playSong() {
  player.classList.add('play')
  playBtn.querySelector('i').classList.remove('fa-play')
  playBtn.querySelector('i').classList.add('fa-pause')
  audio.play()
}

//pausing the song on click of the play button as well as changing the icon to play
function pauseSong() {
  player.classList.remove('play')
  playBtn.querySelector('i').classList.add('fa-play')
  playBtn.querySelector('i').classList.remove('fa-pause')
  audio.pause()
}
// having the progress bar move over time
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
    //choosing the inital index for the player to start on
    let trackIndex = 4
//loading the track initially onto the page when the page is rendered
    function trackLoad(trackIndex) {
      trackTitle.innerText = trackNames[trackIndex]
      aritst.innerText = uploadedBy[trackIndex]
      audio.src = trackUrls[trackIndex]

    }
    trackLoad(trackIndex)

    //functionality for going to the previous track
    function back() {
      trackIndex--
      if (trackIndex < 0) {
        trackIndex = trackUrls.length - 1
      }
      trackLoad(trackIndex)
      playSong()
    }
    //functionality for moving to the next track
    function forward() {
      trackIndex++
      if (trackIndex > trackUrls.length - 1) {
        trackIndex = 0
      }
      trackLoad(trackIndex)
      playSong()
    }
    //event listeners for forward and backward buttons
    backBtn.addEventListener('click', back)

    forwardBtn.addEventListener('click', forward)
  })
  .catch((error) => console.error(error));



