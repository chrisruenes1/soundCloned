const React = require('react');
const TrackActions = require('../actions/track_actions');
const TrackStore = require('../stores/track_store');
const TimeStore = require('../stores/time_store');
const CommentForm = require('./comment_form');
import {Link} from 'react-router';


const TrackIndexItem = React.createClass({
  getInitialState(){
    this.commentShowLength = 4000;
    //sort comments to be able to play through them in correct order
    let sortedComments = this.props.track.comments.sort(function(a, b){
      return a.elapsed_time - b.elapsed_time;
    });

    this.listeners = [];

    return {
      playing: TrackStore.isTrackPlaying(this.props.track.id),
      elapsedTime: 0,
      //the first comment may be well into the song, so we want
      //it to start as the NEXT comment rather than current comment
      currentCommentIdx: -1,
      comments: sortedComments,
      hideComments: false
    };
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
    let currentComment =
      this.state.comments[this.state.currentCommentIdx] && !this.state.hideComments ?
      this.state.comments[this.state.currentCommentIdx].content :
      "";

    //wipe currentComment off screen after a few seconds
    if (currentComment && !this.wipeCommentTimeoutSet){
      this.wipeCommentTimeoutSet = true;
      this.hideTimeout = window.setTimeout(() => {
        this.setState( {hideComments: true });
        this.clearWipeoutTimer();
      }, this.commentShowLength);
    }

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

            <section>{currentComment}</section>

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

      let currentTime = TimeStore.getCurrentTime();

      let nextCommentIdx = this.state.currentCommentIdx + 1;
      let nextComment = this.state.comments[nextCommentIdx];

      let commentIdx =
        nextComment && nextComment.elapsed_time <= currentTime ?
        nextCommentIdx :
        this.state.currentCommentIdx;

      //make sure hide comments is set to false
      let shouldHide;
      if (commentIdx !== this.state.currentCommentIdx){
        this.clearWipeoutTimer();
        shouldHide = false;
      }
      else {
        shouldHide = this.state.hideComments;
      }

      this.setState( { elapsedTime: currentTime, currentCommentIdx: commentIdx, hideComments: shouldHide } );
    }
  },
  clearWipeoutTimer(){
    window.clearTimeout(this.hideTimeout);
    this.wipeCommentTimeoutSet = false;
  }
});

module.exports = TrackIndexItem;
