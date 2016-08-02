## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * Navbar
  * **ProfileView**
    * Profile Header
    * Profile Form
    * TracksIndex (for user)
  * **TracksIndex**
    * TracksIndexItem
      * Track Visualizer
  * **TracksShow**    
  * TrackForm (upload/update modal)
  * **LoginForm**
  * **SignupForm**
  * CurrentTrack


## Routes

* **component:** `App` **path:** `/`
  * **component:** `ProfileView` **path:** `/profile/:userId`
  * **component** `LoginForm` **path:** /login
  * **component** `SignupForm` **path:** /signup
  * **component:** `TracksIndex` **path:** /tracks
  * **component:** `TracksShow` **path:** `tracks/:trackid`
  * **component:** `TracksIndex` **path:** `users/:userId/tracks`

For routes that have no :userId, Tracks will render a collection of tracks,
similar to SoundCloud's Stream functionality; 10 per database call.
