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
    return(
      <ul>
        {
          this.state.tracks.map(function(track){
            return <TrackIndexItem
              className="track-index-item"
              track={track}
              key={track.id}
            />;
          })
        }
      </ul>
    );
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
