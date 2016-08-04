# Phase 3: Tracks Model, API, and CUD components (2 day, W1 F 6pm)

## Rails
### Models
* Track

### Controllers
* Api::TracksController (create, destroy, index, show, update)

### Views
* tracks/index.json.jbuilder
* tracks/show.json.jbuilder

## Flux
### Views (React Components)
* TracksIndex
  - TracksIndexItem
* TrackForm

### Stores
* Track

### Actions
* `ApiActions.receiveAllTracks`
* `ApiActions.receiveSingleTrack`
* `ApiActions.removeTrack`
* `TrackActions.fetchNTracks`
* `TrackActions.fetchUserTracks`
* `TrackActions.createTrack`
* `TrackActions.editTrack`
* `TrackActions.destroyTrack`

### ApiUtil
* `ApiUtil.fetchAllTracks`
* `ApiUtil.fetchUserTracks`
* `ApiUtil.createTrack`
* `ApiUtil.editTrack`
* `ApiUtil.destroyTrack`

## Gems/Libraries
* web-audio-api
