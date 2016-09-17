# SoundCloned

[SoundCloned live](http://soundcloned.com)

SoundCloned is a single-page audio hosting and streaming app built on [Ruby on Rails](http://rubyonrails.org/) and [React.js](http://facebook.github.io/react/) and inspired by [Soundcloud](http://soundcloud.com).


# Features & Implementation

## Profiles

Users can listen to music and visit artist pages regardless of their authentication status, but they must log in to upload music or comment on tracks. Users are able to create and update profiles, and their information is stored in a `users` table. The user object uses ActiveRecord associations to keep references to all `tracks` and `comments` that a user has created, and which are stored in separate tables.

![](./app/assets/images/edit_profile_screenshot?raw=true)

### Custom URLS

A field in the `ProfileForm` asks users for a `customURL`. This field defautls to the user's `username`, but users can also choose, and dynamically switch whenever they so please, the path at which their profile should live (e.g. soundcloned.com/this_is_my_path). Soundcloud's site inspired this feature, but SoundCloned's implementation enhances the original by using [ReactRouter](https://github.com/reactjs/react-router)'s `hashHistory` to instantaneously update the url on change, making sure that the page always loads as expected upon a refresh.

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

When a user uploads an mp3, the file type is verified by Paperclip. The title of the track and its duration are parsed from the track's metadata. The parsed title is automatically added to the title input field on the upload track. All of the information is saved to the database when the user submits, except for the audio and image files themselves, which are uploaded to AWS S3 using Paperclip.



## Comments

## Continuous & Interactive Playback

## Waveform Visualization
