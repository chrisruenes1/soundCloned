# SoundCloned

[SoundCloned live](http://soundcloned.com)

SoundCloned is a single-page audio hosting and streaming app built on [Ruby on Rails](http://rubyonrails.org/) and [React.js](http://facebook.github.io/react/) and inspired by [Soundcloud](http://soundcloud.com).


# Features & Implementation

## Profiles

Users can listen to music and visit artist pages regardless of their authentication status, but they must log in to upload music or comment on tracks. Users are able to create and update profiles, and their information is stored in a `users` table. The user object uses ActiveRecord associations to keep references to all `tracks` and `comments` that a user has created, and which are stored in separate tables.

![](./app/assets/images/edit_profile_screenshot?raw=true)

### Custom URLS

A field in the `ProfileForm` asks users for a `customURL`. This field defautls to the user's `username`, but users can also choose, and dynamically switch whenever they so please, the path at which their profile should live (e.g. soundcloned.com/this_is_my_path). Soundcloud's site inspired this feature, but SoundCloned's implementation enhances the original by using [ReactRouter](https://github.com/reactjs/react-router)'s `hashHistory` to instantaneously update the url on change, making sure that the page always loads as expected upon a refresh.

`frontend/components/profile_form.jsx`
````JavaScript
_onUserChange(){
  //little bit of handling to make sure modal stays open on initial refresh
  let shouldClose = false;
  if (this.state.userId){
    shouldClose = true;
  }

  let user = UserStore.user();
  hashHistory.push(`/users/url/${user.custom_url}`);
  this.setState({
    userId: user.id,
    fname: user.fname,
    lname: user.lname,
    groupName: user.group_name,
    customUrl: user.custom_url,
    city: user.city,
    state: user.state,
    bio: user.bio
  });

  if (shouldClose){
    this.props.close();
  }

},
````

## File Upload

Logged in users can upload mp3 files which are immediately added to their profile page and, if public, added to the app's stream, which all users can access. SoundCloned file upload uses Paperclip to validate the type of file attachments and upload attached files to AWS S3. The `track` object stores the S3 url for the audio file and for an optional image attachment associated with the file.


`app/models/track.rb`
````Ruby
class Track < ActiveRecord::Base
  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/


  has_attached_file :audio_file, default_url: "NoMoreHeroes-NineToLife.mp3"
  validates_attachment_content_type :audio_file, content_type: ['application/mp3', 'application/x-mp3', 'audio/mpeg', ['audio/mpeg'], 'audio/mp3']


  validates :title, :composer_id, :duration, :audio_file, presence: true

  belongs_to(
    :composer,
    class_name: "User",
    primary_key: :id,
    foreign_key: :composer_id
  )

  has_many(
    :comments,
    dependent: :destroy,
    class_name: "Comment",
    primary_key: :id,
    foreign_key: :track_id
  )
end
````

### Track Metadata Parsing

When a user uploads an mp3, the file type is verified by Paperclip. The title of the track and its duration are parsed from the track's metadata. The parsed title is automatically added to the title input field on the upload track.

`frontend/components/upload_form.jsx`
````JavaScript
fileReader.onloadend = () => {
  let audio = new Audio(fileReader.result);
  audio.addEventListener("loadedmetadata", () => {
    let duration = audio.duration;
    this.setState({
      trackFile: file,
      duration: duration,
      trackUrl: fileReader.result,
      title: this.parseName(file.name),
      frontendError: "",
      submitDisabled: false
    });
  });
}
````

## Comments

A logged in user is able to add comments to a track as they listen to it. Since the `CommentForm` is a child of the associated `TrackIndexItem`, it has access to the `currentTime` through its props when a track is playing. This enables associating a comment with a particular point in playback:

`frontend/components/comment_form.jsx`
````JavaScript
handleSubmit(e){
  e.preventDefault();
  let comment = this.state;
  comment.author_id = SessionStore.currentUser().id;
  let track_id = this.props.trackId;
  comment.elapsed_time = this.props.currentTime;
  CommentActions.createComment(comment, track_id);
  this.setState({ content: "" });
}
````
When a user submits the comment, they will see it appear in real time under the playing track, marked by a 10px image of their profile picture, with the text of the comment extending beneath this image. `CommentIndexItem`s are able to render in real time by listening to two stores: the `TimeStore` and the `CommentStore`.

When a `CommentIndexItem` registers a change in the `CommentStore` (for example, if a user has added a new comment), it gets all comments from the `CommentStore`, then sorts all of them by time:

`frontend/components/track_index_item.jsx`
````JavaScript
_onCommentChange(){
  let comments = CommentStore.allCommentsForTrack(this.props.track.id);
  let sortedComments = comments.sort(function(a, b){
    return a.elapsed_time - b.elapsed_time;
  });
  
  this.setState( { comments: sortedComments });
}
````

When the `CommentIndexItem` registers a change in the `TimeStore` (these occur periodically, as the HTML5 `<audio>` element emits `timeupdate` events to the `CurrentTrack` component), it checks to see if any of its comments overlap with the new timestamp.

`frontend/components/track_index_item.jsx`
````JavaScript
_onTimeChange(){
  if (this.state.playing){

    let currentTime = TimeStore.getCurrentTime();
    
    //calculated as a function of the comment's width (fixed at 10px) relative to the current width of the track (variable)
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
}
````

Finally, the `TrackIndexItem` passes `currentComment` state information to its associated `TrackIndex` component, which handles letting its `CommentIndexItem` children know that they should render their text as the `currentTime` overlaps them.

`frontend/components/comment_index.jsx`
````JavaScript
const CommentIndex = React.createClass({
  render(){
    return(
      <ul className='comment-image-list'>
        {
          this.props.comments.map((comment, idx) => {
            return <CommentIndexItem
              comment={comment}
              track={this.props.track}
              currentComment={this.props.currentComment}
              currentTime={this.props.currentTime}
              idx={idx}
              key={comment.id}/>;
          })
        }
      </ul>
    );
  }
});
````

## Continuous & Interactive Playback

Playback responsibilities are divided between two flux cycles. Dividing up data between a `TimeStore` and `TrackStore` allows multiple components to control playback at the same time while everything remains up to date.

A `CurrentTrack` component is responsible for continuous playback. It listens to the `TrackStore`, and, whenever it registers a change in the store, it fetches the new CurrentTrack, and stores the track's audio data in an HTML5 `<audio>` object. It then listens to this object, and sends an update to the `TimeStore` whenever it gets a new timestamp from the track.

`frontend/components/current_track.jsx`
````JavaScript
this.audio.addEventListener("timeupdate", () => {
  TimeActions.resetTimer(this.audio.currentTime, this.state.currentTrack.id);
});
````

Pausing and resuming tracks is extremely straightforward and rapid. When the `CurrentTrack` component gets an update from the `TrackStore`, it checks to see if:

  1) It needs to update its current playing track
  2) It needs to update its play/pause state
  
If it does need to update its play/pause state, it first updates the state of the audio, then, if pausing, kicks off a Flux cycle to save the pause time for the track to the `TimeStore`.

`frontend/components/track_index_item.jsx`
````JavaScript
_onChange(){
  let newCurrentTrack = TrackStore.getCurrentTrack();
  if (newCurrentTrack){
    if (newCurrentTrack.playing) {
      if (newCurrentTrack.id !== this.state.currentTrack.id){
        //pause the current track and save location
        if (this.state.currentTrack.id){
          this.audio.pause();
        }
        //change soruce to new current track
        this.audio.setAttribute('src', newCurrentTrack.audio_file_url);
        this.audio.load();
      }
      this.audio.currentTime = TimeStore.getTimeForTrack(newCurrentTrack.id);

      //if it's not a track switch and it's playing, let it play
      if (this.audio.paused){
        this.audio.play();
      }
    }
    //in case this is a pause message
    else {
      this.audio.pause();
    }
    this.setState({ currentTrack: newCurrentTrack });
  }
}
````

Because this component, along with the `Navbar`, is always rendered on the screen as part of the top-level `App` component, it enables continuous playback by holding on to the HTML5 `<audio>` objects it creates.

Relatedly, it will automatically send a message to the `TrackStore` to move to the next track when the current track ends. This allows a user to listen to the `TrackIndex` stream like a playlist.

`frontend/components/track_index_item.jsx`
````JavaScript
this.audio.addEventListener("ended", () => {
    this.resetPlayback(this.state.currentTrack);
    this.playNextTrack();
  }
);
````
The `TrackIndexItem` component handles waveform visualization using `react-wavesurfer`, and provides users with a more interactive playback experience. Users can click around the waveforms to update playback time, and even switch between arbitrary points in playback of different tracks by doing so. They can also switch between tracks as often as they like by hitting the play/pause button on the `TrackIndexItem` they would like to listen to. When this button is pressed, the `TrackIndexItem` initiates a Flux cycle to set itself as the current track and update the state of the audio to play or pause, respectively.

`track_store.jsx`
````JavaScript
const _setCurrentTrack = function(id){
  if (_currentTrack){
    _tracks[_currentTrack].playing = false;
  }
  _currentTrack = id;
  _tracks[id].playing = true;
  TrackStore.__emitChange();
};

const _pauseCurrentTrack = function(){
  _tracks[_currentTrack].playing = false;
  TrackStore.__emitChange();
};
````
