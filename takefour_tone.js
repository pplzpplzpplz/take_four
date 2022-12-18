let audioContext = new AudioContext();
const playStopButton = document.querySelector('.playstop');
const debugDiv = document.querySelector('.debugDiv');
const p1 = document.querySelector('.p1');
const p2 = document.querySelector('.p2');
const p3 = document.querySelector('.p3');
const p4 = document.querySelector('.p4');
const loadprogressDiv = document.querySelector('.loadprogress');

const buffer1 = new Tone.Buffer("audio/1bb.wav");
const buffer2 = new Tone.Buffer("audio/2bb.wav");
const buffer3 = new Tone.Buffer("audio/3bb.wav");
const buffer4 = new Tone.Buffer("audio/4bb.wav");

// players
const player1 = new Tone.Player(buffer1).toDestination();
const player2 = new Tone.Player(buffer2).toDestination();
const player3 = new Tone.Player(buffer3).toDestination();
const player4 = new Tone.Player(buffer4).toDestination();

playStopButton.addEventListener('click', function() {
  // PLAY OR STOP track depending on state
  if (this.dataset.playing === 'false') {
    // START MUSIC
    startIt();
    console.log('playing');
    this.dataset.playing = 'true';

  } else if (this.dataset.playing === 'true') {
    // STOP MUSIC (reload page)
    location.reload();
  }
}, false);


function startIt() {
  loadprogressDiv.innerHTML = 'loading...';

  function loadingState() {
    setInterval(function() {
    if (loadprogressDiv.innerHTML === 'loading...') {
      loadprogressDiv.innerHTML = 'loading.';
    } else if (loadprogressDiv.innerHTML === 'loading.') {
      loadprogressDiv.innerHTML = 'loading..';
    } else if (loadprogressDiv.innerHTML === 'loading..') {
      loadprogressDiv.innerHTML = 'loading...';
    }
  }, 500);
}

loadingState();


  Tone.loaded().then(() => {
    loadprogressDiv.innerHTML = 'loaded!';
    setTimeout(() => {
      loadprogressDiv.innerHTML = '';
      loadprogressDiv.style.display = 'none';
    }, 1000);

    // AUDIO 1 ------------START--------------------
    // pick a random start time within the duration of the audio file
    randomStartPosition1 = Math.random() * buffer1.duration;
    
    player1.fadeIn = .1;
    player1.fadeOut = .1;
    player1.loop = true;
    player1.playbackRate = 1;
    player1.start();
    Tone.Transport.start();
    
    // seek to the random start position
    player1.seek(randomStartPosition1);    

    setInterval(function() {
      // find the current position of the track 
      let currentPosition1 = (randomStartPosition1 + Tone.Transport.seconds) % buffer1.duration;

      // move the line with the audio playback
      p1.style.left = `${((currentPosition1 / buffer1.duration) * 100)}%`;

      // turn off transition so it jumps right back to 0 immediately
      if (currentPosition1 >= buffer1.duration -.01) {
        p1.style.transition = 'none';
      }

    });
    // AUDIO 1 ----------------END----------------



    // AUDIO 2 ------------START--------------------
    // pick a random start time within the duration of the audio file
    randomStartPosition2 = Math.random() * buffer2.duration;
    
    player2.fadeIn = .1;
    player2.fadeOut = .1;
    player2.loop = true;
    player2.playbackRate = 1;
    player2.start();

    // seek to the random start position
    player2.seek(randomStartPosition2);


    setInterval(function() {
      // find the current position of the track 
      let currentPosition2 = ((randomStartPosition2 + Tone.Transport.seconds) % buffer2.duration);

      // move the line with the audio playback
      p2.style.left = `${((currentPosition2 / buffer2.duration) * 100)}%`;
      // turn off transition so it jumps right back to 0 immediately
      if (currentPosition2 >= buffer2.duration -.01) {
        p2.style.transition = 'none';
      }
    });
    // AUDIO 2 ----------------END----------------


    // AUDIO 3 ------------START--------------------
    // pick a random start time within the duration of the audio file
    randomStartPosition3 = Math.random() * buffer3.duration;
    
    player3.fadeIn = .1;
    player3.fadeOut = .1;
    player3.loop = true;
    player3.playbackRate = 1;
    player3.start();

    // seek to the random start position
    player3.seek(randomStartPosition3);


    setInterval(function() {
      // find the current position of the track 
      let currentPosition3 = (randomStartPosition3 + Tone.Transport.seconds) % buffer3.duration;

      // move the line with the audio playback
      p3.style.left = `${((currentPosition3 / buffer3.duration) * 100)}%`;
      // turn off transition so it jumps right back to 0 immediately
      if (currentPosition3 >= buffer3.duration -.01) {
        p3.style.transition = 'none';
      }
    });
    // AUDIO 3 ----------------END----------------

    // AUDIO 4 ------------START--------------------
    // pick a random start time within the duration of the audio file
    randomStartPosition4 = Math.random() * buffer4.duration;
    
    player4.fadeIn = .1;
    player4.fadeOut = .1;
    player4.loop = true;
    player4.playbackRate = 1;
    player4.volume.value = -10;
    player4.start();

    // seek to the random start position
    player4.seek(randomStartPosition4);

    setInterval(function() {
      // find the current position of the track 
      let currentPosition4 = (randomStartPosition4 + Tone.Transport.seconds) % buffer4.duration;

      // move the line with the audio playback
      p4.style.left = `${((currentPosition4 / buffer4.duration) * 100)}%`;
      // turn off transition so it jumps right back to 0 immediately
      if (currentPosition4 >= buffer4.duration -.01) {
        p4.style.transition = 'none';
      }
    });
    // AUDIO 4 ----------------END----------------
  });
}

function stopIt() {
  player1.stop();
  Tone.Transport.stop();
  Tone.Transport.seconds = 0;
  randomStartPosition1 = 0;
  player1.seek(0);
}



