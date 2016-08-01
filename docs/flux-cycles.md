# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result.

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  0. invoked from an API callback
  0. removes `_currentUser` in `CurrentUserStore`

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. sets `form` and `_errors` in the `ErrorStore`
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. removes `_errors` for a given `form` in the `ErrorStore`

## Track Cycles

Ultimately, I would like to store the tracks, audio files, and images in three respective databases,
loading all tracks first, then in the success callbacks asynchronously loading the associated
image and audio files. However, I first want to do more research about the best way to avoid
turning the track query into an N+1 query.

So, for now, 'tracks' refers to the metadata about a track, as well as the image and
audio file associated with that track. This will be fleshed out more in the next day or two.

### Tracks API Request Actions

* `fetchNTracks`
  0. invoked from `TracksIndex` `didMount`/`willReceiveProps`
  0. `GET /api/tracks` is called.
  0. `receiveNTracks` is set as the success callback.

* `createTrack`
  0. invoked from upload modal's `TrackForm` `onSubmit`
  0. `POST /api/tracks` is called.
  0. `receiveSingleTrack` is set as the success callback.

* `fetchUserTracks`
  0. Should be ActiveRecord#included in `fetchUserProfile` method
  0. invoked from `ProfileView` `didMount`/`willReceiveProps`
  0. `GET /api/tracks/:userId` is called.
  0. `receiveNTracks` is set as the success callback.

* `editTrack`
  0. invoked from update modal's `TrackForm` `onSubmit`
  0. `PATCH /api/tracks/:id` is called.
  0. `receiveSingleTrack` is set as the success callback.

* `destroyTrack`
  0. invoked from delete track button `onClick`
  0. `DELETE /api/tracks/:id` is called.
  0. `removeTrack` is set as the success callback.

### Tracks API Response Actions

* `receiveAllTracks`
  0. invoked from an API callback.
  0. `Track` store updates `_tracks` and emits change.
  0. `Comments` store updates `_comments` and emits change

* `receiveSingleTrack`
  0. invoked from an API callback.
  0. `Track` store updates `_tracks[id]` and emits change.
  0. `Comments` store updates `_comments` and emits change

* `removeTrack`
  0. invoked from an API callback.
  0. `Track` store removes `_tracks[id]` and emits change.
  0. `Comments` store updates `_comments` and emits change

### Store Listeners

* `TracksIndex` component listens to `Track` store.
* `TrackIndexItem` component listens to `Track` store.


## Comment Cycles

### Comments API Request Actions

There is no fetchAllComments because all comments for the current set of tracks
will be fetched along with the tracks, using ActiveRecord#includes

* `createComment`
  0. invoked from add comment button `onClick`
  0. `POST /api/comments` is called.
  0. `receiveSingleComment` is set as the callback.

* `destroyComment`
  0. invoked from delete comment button `onClick`
  0. `DELETE /api/comments/:id` is called.
  0. `removeComment` is set as the success callback.

### Comments API Response Actions

* `receiveSingleComment`
  0. invoked from an API callback.
  0. `Comment` store updates `_comments[:trackId]` and emits change.

* `removeComment`
  0. invoked from an API callback.
  0. `Comment` store removes `_comments[:trackId][:id]` and emits change.

### Store Listeners

* `CommentsIndex` component listens to `Comment` store.

## Profile Cycles

### Profile API Request Actions

* `createProfile`
  0. invoked from `ProfileForm` `onSubmit`
  0. `POST /api/profiles` is called.
  0. `receiveProfile` is set as the callback.

*  `editProfile`
  0. invoked from `ProfileForm` `onSumbit`
  0. `PATCH /api/profiles/` is called.
  0. `receiveProfile` is set as the callback
  
*   `fetchUserProfile`
  0. invoked from `ProfileView` `didMount`/`willReceiveProps`
  0. `GET /api/profiles/:id` is called.
  0. `receiveProfile` is set as the callback.
  0. `GET /api/tracks/:userId` is called. (see above: `FetchUserTracks`)
  0. `receiveNTracks` is set as callback

### Profile API Response Actions

* `receiveProfile`
  0. invoked from an API callback.
  0. `Profile` store updates `_profiles[:id]` and emits change.

### Store Listeners

* `ProfileView` component listens to `Profile` store.


## SearchSuggestion Cycles (Bonus)

* `fetchSearchSuggestions`
  0. invoked from `TrackSearchBar` `onChange` when there is text
  0. `GET /api/tracks` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the success callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `TracksSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
