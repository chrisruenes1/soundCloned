const React = require('react');
import {Link} from 'react-router';

const TrackIndexItem = React.createClass({
  getInitialState(){
    return {playing: false, audio: null};
  },
  playTrack(e){
    e.preventDefault();
    let audio = this.state.audio || new Audio(this.props.track.audio_file_url);
    if (audio.currentTime === 0){
      audio.addEventListener("ended", () => {
        this.setState({playing: false, audio: null});
      });
      //make sure that the track has loaded enough if it is starting at the beginning
      audio.addEventListener("canplaythrough", () => {
        audio.play();
        this.setState({playing:true, audio: audio});
      });
    }
    else {
      audio.play();
      this.setState({playing: true});
    }
  },
  pauseTrack(e){
    e.preventDefault();
    this.state.audio.pause();
    this.setState({playing: false});
  },
  render(){
    let composer = this.props.track.composer;
    let composerURL = `users/url/${composer.custom_url}`;
    let buttonImageClass = this.state.playing ? "pause-button-image" : "play-button-image";
    let playOrPauseFunc = this.state.playing ? this.pauseTrack : this.playTrack;

    return(
    <li>
      <div className="track-index-item-container">
        <div className="track-index-item">
          <div className="track-content-container group">

            <img className="track-list-item-element track-image" src={this.props.track.image_url} />
            <div className="track-list-item-element">
              <button className="play-button" onClick={playOrPauseFunc}><div className={buttonImageClass} /></button>
            </div>

            <div className="track-list-item-element">
              <Link className="track-artist-link" to={composerURL}>{composer.group_name}</Link>
              <span className="track-title">{this.props.track.title}</span>
            </div>

          </div>
        </div>
      </div>

    </li>
    );
  }
});

module.exports = TrackIndexItem;
