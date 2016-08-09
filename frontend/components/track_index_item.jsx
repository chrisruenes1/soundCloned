const React = require('react');
const TrackActions = require('../actions/track_actions');
const TrackStore = require('../stores/track_store');
import {Link} from 'react-router';


const TrackIndexItem = React.createClass({
  getInitialState(){
    this.listeners = [];
    return {playing: TrackStore.isTrackPlaying(this.props.track.id)};
  },
  playTrack(e){
    e.preventDefault();
    TrackActions.setCurrentTrack(this.props.track.id);
  },
  pauseTrack(e){
    e.preventDefault();
    TrackActions.pauseCurrentTrack();
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
    if (currentTrack.id === this.props.track.id && currentTrack.playing ){
      this.setState({playing: true});
    }
    else {
      this.setState({playing: false});
    }
  }
});

module.exports = TrackIndexItem;
