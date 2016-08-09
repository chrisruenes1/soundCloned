const React = require('react');
const TrackActions = require('../actions/track_actions');
const TrackStore = require('../stores/track_store');
const TimeStore = require('../stores/time_store');
const CommentForm = require('./comment_form');
import {Link} from 'react-router';


const TrackIndexItem = React.createClass({
  getInitialState(){
    debugger
    this.listeners = [];
    return {playing: TrackStore.isTrackPlaying(this.props.track.id), elapsedTime: 0};
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

            <CommentForm trackId={this.props.track.id} currentTime={this.state.elapsedTime} />

          </div>
        </div>
      </div>

    </li>
    );
  },
  componentDidMount(){
    this.listeners.push(TrackStore.addListener(this._onTrackChange));
    this.listeners.push(TimeStore.addListener(this._onTimeChange));
  },
  componentWillUnmount(){
    this.listeners.forEach(function(listener){
      listener.remove();
    });
  },
  _onTrackChange(){
    let currentTrack = TrackStore.getCurrentTrack();
    if (currentTrack.id === this.props.track.id && currentTrack.playing ){
      this.setState({playing: true});
    }
    else {
      this.setState({playing: false});
    }
  },
  _onTimeChange(){
    if (TrackStore.isTrackPlaying(this.props.track.id)){
      this.setState( {elapsedTime: TimeStore.getCurrentTime() } );
    }
  }
});

module.exports = TrackIndexItem;
