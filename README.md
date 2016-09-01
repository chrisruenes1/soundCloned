# SoundCloned

[SoundCloned live](http://soundcloned.com)

SoundCloned is a single-page audio hosting and streaming app built on [Ruby on Rails](http://rubyonrails.org/) and [React.js](http://facebook.github.io/react/) and inspired by [Soundcloud](http://soundcloud.com).


# Features & Implementation

## Profiles

Users can listen to music and visit artist pages regardless of their authentication status, but they must log in to upload music or comment on tracks. Users are able to create and update profiles, and their information is stored in a `users` table. The user object uses ActiveRecord associations to keep references to all `tracks` and `comments` that a user has created, and which are stored in separate tables.

![](./app/assets/images/edit_profile_screenshot?raw=true)

### Custom URLS

A field in the `ProfileForm` asks users for a `customURL`. This field defautls to the user's `username`, but users can also choose, and dynamically switch whenever they so please, the path at which their profile should live (e.g. soundcloned.com/this_is_my_path). Soundcloud's site inspired this feature, but SoundCloned's implementation enhances the original by using [ReactRouter](https://github.com/reactjs/react-router)'s' `hashHistory` to instantaneously update the url on change, making sure that the page always loads as expected upon a refresh.

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


## Comments

## Continuous & Interactive Playback

## Waveform Visualization



 The app leverages a lean audio stack — HTML5 audio enhanced and centralized with React and Flux — in order to provide the user with a seamless listening experience. Playback responsibilities are divided between two Flux cycles, one for time information and the other for audio, making the app exceptionally fast when it comes to switching between songs at arbitrary points in playback. AJAX integration and a modular component architecture allow users to navigate around the site freely while audio plays continuously.

[Heroku link][heroku] https://soundcloned.herokuapp.com/

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

SoundCloned is a web application inspired by SoundCloud that will be built using Ruby on Rails, React.js and the Web Audio API, with potential 3rd party integration with the Giphy API. By the end of Week 9, this app will have the following set of features, as a minimum:

- [x] Hosting on Heroku
- [x] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README
- [ ] Song CRUD
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
  - [ ] Playback using Web Audio
- [ ] User comments
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
  - [ ] Realtime 'playback' of comments based on where in song they were created
- [x] User pages with profile information
  - [x] Smooth, bug-free navigation
  - [x] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling
- [ ] Continuous Playback

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days, W1 W 6pm)

**Objective:** Functioning rails project with front-end Authentication

- [x] create new project
- [x] set up Heroku
- [x] create `User` model
- [x] authentication backend setup
- [x] create `StaticPages` controller and root view
- [x] set up webpack & flux scaffold with skeleton files
- [x] setup `APIUtil` to interact with the API
- [x] set up flux cycle for frontend auth
- [x] user signup/signin components
- [x] blank landing component after signin
- [x] style signin/signup components
- [x] seed users

### Phase 2: Profiles (1 day, W1 Th 6pm)

**Objective:** Users can create CRU profiles

- build out API, Flux loop, and components for:
  - [x] creating a profile
  - [x] profiles are only editable by owner
- [x] Style new elements
- [x] Seed profiles

### Phase 3: Tracks Model, API, and CRUD components (2 day, W2 M 6pm)

**Objective:** Tracks can be created, read (played), edited and destroyed through the API. Users can start or stop the song by clicking a play/pause button

- [ ] create `Track` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for tracks (`TracksController`)
- [ ] test out API interaction in the console.
- [ ] jBuilder views for tracks
- implement each track component, building out the flux loop as needed.
  - [ ] `TracksIndex`
  - [ ] `TrackIndexItem (minus playback)`
  - [ ] `TrackForm`
- [ ] save tracks to the DB when the form loses focus or is left idle after editing.
- [ ] style tracks components
- [ ] seed tracks
- [ ] Add playback/pause button to TrackIndexItem
- [ ] Integrate Web Audio functionality to start and stop a track
- Build out state of the TrackIndexItem using Web Audio analyzer so that
- [ ] it knows the current position of playback
- [ ] it knows whether its track is currently playing or not
- [ ] it can (optionally) keep track of elapsed time of the track using setTimeout
(supposedly it is non-trivial to fetch elapsed time from Web Audio)
- [ ] given these, all tracks can be in multiple states of play status and position at the same time   
- [ ] displaying a user's tracks


### Phase 4: Continuous Playback (1 Day, W2 T 6pm)

**Objective:** a currentTrack component allows users to navigate around site while track plays and control playback

- [ ] Create currentTrack footer component
- [ ] Build out flux cycle to allow for
   - [ ] keeping track of the currently played song, regardless of navigation
   - [ ] the current tracker updates only when a new play button, outside of the
         current track footer, has been pressed
   - [ ] `Next` button resets currentTrack to whatever is next on the trackIndex's
          track list
- [ ] Use progress bar from previous phase to visualize track's progress
- [ ] Add volume control to currentTrack component and control using a gain node in
      Web Audio
- [ ] Test current track by navigating around site and trying to break it. Make
      sure it works smoothly and without stutters
- [ ] Style currentTrack footer component


### Phase 5: Comments (2 day, W2 T 6pm)

**Objective:** Comments belong to tracks and to users. As a bonus, they are played at a particular position in the song

- [ ] create `Comment` model
- build out API, Flux loop, and components for:
  - [ ] Comment CRUD
     - [ ] Add comment input to TrackIndexItem
  - [ ] Adding comments requires the user to have started listening to track
        - A simple implementation will add a comment input when the play/pause
          button or track visualizer has been engaged. More complex could keep
          track of plays by a particular user
  - [ ] Allow all of a songs comments to be viewed on TrackIndexItem
- [ ] Use CSS to style new components
- [ ] Seed Comments
- [ ] BONUS: tracks are `played` in the order in which they were created, one at a time


### Phase 6: Infinite scroll for Tracks Index (1 day, W2 F 6pm)

**objective:** Add infinite scroll to Tracks Index

- [ ] Paginate Tracks Index API to send 20 results at a time
- [ ] Append next set of results when user scrolls and is near bottom
- [ ] Make sure styling still looks good
- [ ] Ensure we have enough seeded tracks to demo infinite scroll

### Bonus Features (TBD)
- [ ] create `TrackVisualizer` component
- [ ] add a canvas to `TrackVisualizer`
- [ ] use web audio's analyzer to divide the canvas into clickable portions mapped to song position
- [ ] add a simple progress bar to the canvas
- [ ] use setTimeout to update the state of the progress bar
- [ ] BONUS: turn the progress bar into a bar graph that updates color based on the current spectrum of the audio, derived from Web Audio's fft analyzer. Animate background color of page to match current color of bar.
- [ ] Giphy integration to automatically generate track images if none are provided
- [ ] Search by genre, name or tag
- [ ] Location services to localize Stream (trackIndex)

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
[phase-six]: docs/phases/phase6.md
