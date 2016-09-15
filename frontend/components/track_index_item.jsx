const React = require('react');
const TrackActions = require('../actions/track_actions');
const TrackStore = require('../stores/track_store');
const TimeStore = require('../stores/time_store');
const CommentStore = require('../stores/comment_store');
const CommentForm = require('./comment_form');
const CommentIndex = require('./comment_index');
const WaveSurferVisualizer = require('./wave_surfer_visualizer');
import {Link} from 'react-router';
import Measure from 'react-measure';


const TrackIndexItem = React.createClass({
  getInitialState(){
    //sort comments to be able to play through them in correct order
    let sortedComments = this.props.track.comments.sort(function(a, b){
     return a.elapsed_time - b.elapsed_time;
    });

    this.commentShowLength = 4000;

    this.listeners = [];
    return {
      playing: TrackStore.isTrackPlaying(this.props.track.id),
      elapsedTime: 0,
      currentComment: null,
      comments: sortedComments,
      dimensions: {}
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
    let currentComment = this.state.playing && this.state.currentComment !== -1 ?
      this.state.currentComment :
      "";

    //clear comment from screen after a few seconds
    if (currentComment && !this.wipeCommentTimeoutSet){
      this.wipeCommentTimeoutSet = true;
      this.hideTimeout = window.setTimeout(() => {
        this.setState( {currentComment: null });
        this.clearWipeoutTimer();
      }, this.commentShowLength);
    }
    
    
    
    return(
    <li>
      <div className="track-index-item group">

        <img className="track-image" src={this.props.track.image_url} />

        <div className="track-content-container">

          <div className="track-play-buttons group">
            <button className="play-button track-list-item-element" onClick={playOrPauseFunc}><div className={buttonImageClass} /></button>

            <div className="track-list-item-element">
              <Link className="track-artist-link" to={composerURL}>{composer.group_name}</Link>
              <span className="track-title">{this.props.track.title}</span>
            </div>
          </div>

          {/*measure playback container with react-measure so that fixed-width comment_index_item always represents correct portion of variable width track_index_item*/}
          <Measure
            onMeasure={(dimensions) => {
              this.setState({dimensions: dimensions});
            }}
          >
            <div className="playback-container">
                <WaveSurferVisualizer
                  track={this.props.track}
                  playing={this.state.playing}
                  pos={this.state.elapsedTime}
                />
              <CommentIndex
                currentComment={currentComment}
                comments={this.state.comments}
                track={this.props.track}
                currentTime={this.state.elapsedTime}
              />
            </div>
          </Measure>

          <div className="comment-form-container">
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
    this.listeners.push(CommentStore.addListener(this._onCommentChange));
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
    if (this.state.playing){

      let currentTime = TimeStore.getCurrentTime();
      
      let commentDuration = (10 * this.props.track.duration) / this.state.dimensions.width;
      let timeOverlappingComment = function(comment){
        if (currentTime >= comment.elapsed_time && currentTime <= comment.elapsed_time + commentDuration){
          return true;
        }
        return false;
      };
      let currentComment = this.state.comments.find(timeOverlappingComment);
      if (currentComment !== -1){
        //prevent it from being erased immediately
        this.clearWipeoutTimer();
      }

      this.setState( { elapsedTime: currentTime, currentComment: currentComment } );
    }
  },
  _onCommentChange(){
    let comments = CommentStore.allCommentsForTrack(this.props.track.id);
    let sortedComments = comments.sort(function(a, b){
      return a.elapsed_time - b.elapsed_time;
    });
    
    this.setState( { comments: sortedComments });
  },
  clearWipeoutTimer(){
    window.clearTimeout(this.hideTimeout);
    this.wipeCommentTimeoutSet = false;
  }
});

module.exports = TrackIndexItem;
