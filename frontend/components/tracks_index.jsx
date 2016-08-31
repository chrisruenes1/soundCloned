const React = require('react');
const TrackStore = require('../stores/track_store');
const UserStore = require('../stores/user_store');
const TrackIndexItem = require('./track_index_item');
const TrackActions = require('../actions/track_actions');
const CommentActions = require('../actions/comment_actions');
const FormModal = require('./form_modal');
const UploadForm = require('./upload_form');

let _tracksWithDuration = [];

const TracksIndex = React.createClass({
  getInitialState(){
    this.listeners = [];
    return { tracks: null };
  },
  render(){
    let tracks = this.state.tracks ?
      this.state.tracks.length === 0 ?
        <div>It looks like you do not have any tracks uploaded yet! Click&nbsp;
          <FormModal
            buttonText=" here"
            className="clickable-text"
            big
            inline>
              <UploadForm/>
          </FormModal> to add your first.</div> :
        
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
        </ul> :
      <div></div>;
    return(
      tracks
    );
  },
  componentWillReceiveProps(newProps){
    let tracks = newProps.hasOwnProperty("userId") ? //the user show page will pass down the user's tracks
      TrackStore.allForUserId(newProps.userId) :
      TrackStore.all();
    this.setState({ tracks: tracks });
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
    if (this.props.userId){
      this.setState( {tracks: TrackStore.allForUserId(this.props.userId)});
    }else {
      this.setState({ tracks: TrackStore.all() });
    }
    
  }
});

module.exports = TracksIndex;
