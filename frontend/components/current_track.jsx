const React = require('react');
const TrackStore = require('../stores/track_store');
const TrackActions = require('../actions/track_actions');
import Link from 'react-router';

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
  playNextTrack(){
    TrackActions.playNextTrack();
  },
  playPreviousTrack(){
    if (this.audio.currentTime > 2){
      this.audio.currentTime = 0;
    }
    else {
      TrackActions.playPreviousTrack();
    }
  },
  resetPlayback(){
    this.audio.currentTime = 0;
  },
  render(){
    if (this.state.currentTrack.id){
      let buttonImageClass = this.state.currentTrack.playing ? "footer-pause-button-image" : "footer-play-button-image";
      let playOrPauseFunc = this.state.currentTrack.playing ? this.pauseTrack : this.playTrack;
      let composerShowLink = `users/url/${this.state.currentTrack.composer.custom_url}`;
      return(
        <footer className="group footer">
          <ul className="group playback-control-buttons">

            <li className="footer-playback-control-button">
              <button className="playback-button" onClick={this.playPreviousTrack}>
                <div className="rewind" />
              </button>
            </li>

            <li className="footer-playback-control-button">
              <button className="playback-button" onClick={playOrPauseFunc}>
                <div className={buttonImageClass} />
              </button>
            </li>

            <li className="footer-playback-control-button">
              <button className="playback-button" onClick={this.playNextTrack}>
                <div className="fastforward" />
              </button>
            </li>

            <li className="footer-track-info">
              <img className="footer-track-image" src={this.state.currentTrack.image_url} />
            </li>

          </ul>
        </footer>
      );
    }
    else {
      return <div></div>;
    }
  },
  componentDidMount(){
    this.listeners.push(TrackStore.addListener(this._onChange));
    this.audio.addEventListener("ended", () => {
        this.resetPlayback();
        this.playNextTrack();
      }
    );
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
          if (this.state.currentTrack.id){
            this.audio.pause();
            this.elapsedTimes[this.state.currentTrack.id] = this.audio.currentTime;
          }
          //change soruce to current track
          this.audio.setAttribute('src', newCurrentTrack.audio_file_url);
          this.audio.currentTime = this.elapsedTimes[newCurrentTrack.id] ?
            this.elapsedTimes[newCurrentTrack.id] :
            0;

          this.audio.load();
        }
        //if it's not a track switch and it's playing, let it play
        if (this.audio.paused){
          this.audio.play();
        }
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
