// https://ourcodeworld.com/articles/read/1627/how-to-easily-generate-a-beep-notification-sound-with-javascript
const myAudioContext = new AudioContext(); // reuse concurrent audio contexts
/**
 * Helper function to emit a beep sound in the browser using the Web Audio API.
 */
function beep(duration /*ms*/, frequency /*hz*/, volume /*0-100*/) {
  // resolves when the beep sound is finished.
  return new Promise((resolve, reject) => {
    // Set default duration
    duration = duration || 200;
    frequency = frequency || 440;
    volume = volume || 100;

    try {
      let oscillatorNode = myAudioContext.createOscillator();
      let gainNode = myAudioContext.createGain();
      oscillatorNode.connect(gainNode);

      oscillatorNode.frequency.value = frequency;
      oscillatorNode.type = "square";

      gainNode.connect(myAudioContext.destination);

      gainNode.gain.value = volume * 0.01;

      oscillatorNode.start(myAudioContext.currentTime);
      oscillatorNode.stop(myAudioContext.currentTime + duration * 0.001);

      oscillatorNode.onended = () => {
        resolve();
      };
    } catch (error) {
      reject(error);
    }
  });
}
