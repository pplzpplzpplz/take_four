let audioContext = new AudioContext();
const playStopButton = document.querySelector('.playstop');
const debugDiv = document.querySelector('.debugDiv');
const p1 = document.querySelector('.p1');
const p2 = document.querySelector('.p2');
const p3 = document.querySelector('.p3');
const p4 = document.querySelector('.p4');
const ps = [p1, p2, p3, p4];
const loadprogressDiv = document.querySelector('.loadprogress');

const buffer1 = new Tone.Buffer("audio/1bb.wav");
const buffer2 = new Tone.Buffer("audio/2bb.wav");
const buffer3 = new Tone.Buffer("audio/3bb.wav");
const buffer4 = new Tone.Buffer("audio/4bb.wav");

// players
const players = [
  new Tone.Player(buffer1).toDestination(),
  new Tone.Player(buffer2).toDestination(),
  new Tone.Player(buffer3).toDestination(),
  new Tone.Player(buffer4).toDestination()
];

let interval;

playStopButton.addEventListener('click', function () {
  if (this.dataset.playing === 'false') {
    startIt();
    this.dataset.playing = 'true';
  } else {
    stopIt();
    this.dataset.playing = 'false';
  }
}, false);

function startIt() {
  loadprogressDiv.innerHTML = 'loading...';

  function loadingState() {
    setInterval(() => {
      const dots = loadprogressDiv.innerHTML.split('.').length - 1;
      loadprogressDiv.innerHTML = 'loading' + '.'.repeat(dots % 3 + 1);
    }, 500);
  }

  loadingState();

  Tone.loaded().then(() => {
    loadprogressDiv.innerHTML = 'loaded!';
    setTimeout(() => {
      loadprogressDiv.innerHTML = '';
      loadprogressDiv.style.display = 'none';
    }, 1000);

    const buffers = [buffer1, buffer2, buffer3, buffer4];

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const p = ps[i];
      const buffer = buffers[i];

      // pick a random start time within the duration of the audio file
      const randomStartPosition = Math.random() * buffer.duration;

      player.fadeIn = 0.1;
      player.fadeOut = 0.1;
      player.loop = true;
      player.playbackRate = 1;
      player.start();
      Tone.Transport.start();

      // seek to the random start position
      player.seek(randomStartPosition);

      // create a separate interval for each player
      const playerInterval = setInterval(() => {
        // find the current position of the track 
        const currentPosition = (randomStartPosition + Tone.Transport.seconds) % buffer.duration;
      
        // move the line with the audio playback
        p.style.left = `${((currentPosition / buffer.duration) * 100)}%`;
        // turn off transition so it jumps right back to 0 immediately
        if (currentPosition >= buffer.duration - 0.01) {
          p.style.transition = 'none';
        }
      });

      // store the player interval in a property on the player object
      player.interval = playerInterval;
    }
  });
}

function stopIt() {
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const p = ps[i];
  
    // clear the player's interval using the player's interval property
    clearInterval(player.interval);
  
    // reset the player
    player.seek(0);
    player.playbackRate = 1;
  
    // reset the player's visual position
    p.style.left = 0;
  }
  
  // stop all players
  players.forEach(player => player.stop());
  // stop the transport
  Tone.Transport.stop();
  
  // reset the transport
  Tone.Transport.seconds = 0;
  Tone.Transport.bpm.value = 120;

}