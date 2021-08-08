class MediaPlayer {
  constructor(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];
    this._initPlugins();
  }

  _initPlugins() {}

  play() {
    this.media.play();
  }

  pause() {
    this.media.pause();
  }

  mute() {
    this.media.muted = true;
  }

  unmute() {
    this.media.muted = false;
  }

  getDuration(obj) {
    return new Promise(function (resolve) {
      const audio = new Audio();
      audio.addEventListener("loadedmetadata", (event) => {
        resolve(audio.duration);
      });
      audio.src = obj.src;
    });
  }

  calculateTime(time) {
    const currentMinute = Math.floor(time / 60);
    const currentSeconds = Math.round(time % 60);
    const formattedSeconds = currentSeconds.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });
    const currentValue = `${currentMinute}:${formattedSeconds}`;
    return currentValue;
  }

  calculatePercentPlayed(duration) {
    const percentedPlayed = (this.media.currentTime * 100) / duration;
    return percentedPlayed;
  }
}

export default MediaPlayer;
