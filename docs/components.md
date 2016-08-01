## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * Navbar
  * **ProfileView**
    * Profile Header
    * Profile Form
    * TracksIndex (for user)
  * **TracksIndex**
    * TracksIndexItem
      * Track Visualizer
  * **LoginForm**
  * **SignupForm**
  * CurrentTrack


## Routes

* **component:** `App` **path:** `/`
  * **component:** `ProfileView` **path:** `/profile/:userId`
  * **component** `LoginForm` **path:** /login
  * **component** `SignupForm` **path:** /signup
  * **component:** `TracksIndex` **path:** index
  * **component:** `TracksIndex` **path:** `tracks/:userId`

For routes that have no :userId, Tracks will render a collection of tracks,
similar to SoundCloud's Stream functionality; 10 per database call. 
