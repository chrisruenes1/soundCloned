const React = require('react');
const TrackStore = require('../stores/track_store');
const TrackIndexItem = require('./track_index_item');
const TrackActions = require('../actions/track_actions');
const CommentActions = require('../actions/comment_actions');

let _tracksWithDuration = [];

const TracksIndex = React.createClass({
  getInitialState(){
    this.listeners = [];
    return { tracks: TrackStore.all()};
  },
  render(){
    //extract duration information to pass to each element
    let tempAudio = new Audio();
    let idx = 0;

    let processedTracks = this.getDurationForTracks(this.state.tracks, idx, tempAudio);
    return(
      <ul>
        {
          this.state.tracks.map(function(track){
            return <TrackIndexItem
              className="track-index-item"
              track={track}
              key={track.id}
              style={trackIndexItemStyles}
            />;
          })
        }
      </ul>
    );
  },
  getDurationForTracks(tracks, currentIdx, audioElement){
    debugger
    if (tracks.length > 0){
      let track = tracks[currentIdx];
      if (track.duration){
        _tracksWithDuration.push(track);
        if (tracks[currentIdx+1]){
          this.getDurationForTracks(tracks, currentIdx+1, audioElement);
        }
        else {
          return _tracksWithDuration;
        }
      }
      else {
        audioElement.setAttribute('src', track.audio_file_url);
        audioElement.addEventListener('loadedmetadata', () => {
          track.duration = audioElement.duration;
          _tracksWithDuration.push(track);
          if (tracks[currentIdx+1]){
            this.getDurationForTracks(tracks, currentIdx+1, audioElement);
          }
          else {
            return _tracksWithDuration;
          }
        });
      }
    }
  },
  componentDidMount(){
    this.listeners.push(TrackStore.addListener(this._onChange));
    TrackActions.fetchAllTracks();
    CommentActions.fetchAllComments();
  },
  componentWillUnmount(){
    this.listeners.forEach(function(listener){
      listener.remove();
    });
  },
  _onChange(){
    this.setState({ tracks: TrackStore.all() });
  }
});

module.exports = TracksIndex;
