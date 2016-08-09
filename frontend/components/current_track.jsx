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
  playTrack(){
    TrackActions.setCurrentTrack(this.state.currentTrack.id);
  },
  pauseTrack(){
    TrackActions.pauseCurrentTrack();
  },
  render(){
    let buttonImageClass = this.state.currentTrack.playing ? "footer-pause-button-image" : "footer-play-button-image";
    let playOrPauseFunc = this.state.currentTrack.playing ? this.pauseTrack : this.playTrack;
    return(
      <footer className="group footer">
        <ul className="group playback-control-buttons">

          <li className="footer-playback-control-button">
            <button className="playback-button" onClick={this.rewind}>
              <div className="rewind" />
            </button>
          </li>

          <li className="footer-playback-control-button">
            <button className="playback-button" onClick={playOrPauseFunc}>
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
    let newCurrentTrack = TrackStore.getCurrentTrack();
    if (newCurrentTrack){

      if (newCurrentTrack.playing) {

        if (newCurrentTrack.id !== this.state.currentTrack.id){
          //pause the current track and save location
          this.audio.pause();
          this.elapsedTimes[this.state.currentTrack.id] = this.audio.currentTime;
        }

        this.audio.setAttribute('src', newCurrentTrack.audio_file_url); //change soruce to current track
        let currentTime = this.elapsedTimes[newCurrentTrack.id] || 0;
        this.audio.currentTime = currentTime;
        this.audio.load();
        this.audio.play();
      }
      //in case this is a pause message
      else {
        this.audio.pause();
        this.elapsedTimes[newCurrentTrack.id] = this.audio.currentTime;
      }
      this.setState({ currentTrack: newCurrentTrack });
    }
  }
});

module.exports = CurrentTrack;
