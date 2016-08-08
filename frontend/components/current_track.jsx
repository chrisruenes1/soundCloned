const React = require('react');
const TrackStore = require('../stores/track_store');
const TrackActions = require('../actions/track_actions');

const CurrentTrack = React.createClass({
  getInitialState(){
    this.listeners = [];
    this.audio = new Audio();
    this.elapsedTimes = {};
    return { currentTrack: TrackStore.getCurrentTrack()};
  },
  render(){
    let buttonImageClass = this.state.currentTrack.playing ? "footer-pause-button-image" : "footer-play-button-image";

    return(
      <footer className="group footer">
        <ul className="group playback-control-buttons">

          <li className="footer-playback-control-button">
            <button className="playback-button" onClick={this.rewind}>
              <div className="rewind" />
            </button>
          </li>

          <li className="footer-playback-control-button">
            <button className="playback-button">
              <div className={buttonImageClass} />
            </button>
          </li>

          <li className="footer-playback-control-button">
            <button className="playback-button" onClick={this.fastfowrward}>
              <div className="fastforward" />
            </button>
          </li>
        </ul>
      </footer>
    );
  },
  componentDidMount(){
    this.listeners.push(TrackStore.addListener(this._onChange));
  },
  componentWillUnmount(){
    this.listeners.forEach(function(listener){
      listener.remove();
    });
  },
  _onChange(){
    let currentTrack = TrackStore.getCurrentTrack();
    if (currentTrack){
      this.setState({ currentTrack: currentTrack });
      if (currentTrack.playing) {
        this.audio.setAttribute('src', currentTrack.audio_file_url); //change soruce to current track
        let currentTime = this.elapsedTimes[currentTrack.id] || 0;
        this.audio.currentTime = currentTime;
        this.audio.load();
        this.audio.play();
      }
      else {
        this.audio.pause();
        this.elapsedTimes[currentTrack.id] = this.audio.currentTime;
      }
    }
  }
});

module.exports = CurrentTrack;
