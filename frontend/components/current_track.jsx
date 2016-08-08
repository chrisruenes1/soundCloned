const React = require('react');
const TrackStore = require('../stores/track_store');

const CurrentTrack = React.createClass({
  getInitialState(){
    return { currentTrack: TrackStore.getCurrentTrack(), playing: false };
  },
  render(){
    let buttonImageClass = this.state.playing ? "footer-pause-button-image" : "footer-play-button-image";

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
  }
});

module.exports = CurrentTrack;
