const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const TrackStore = new Store(AppDispatcher);
const TrackConstants = require('../constants/track_constants');

let _tracks = {};
let _playQueue = [];
let _currentTrack = null;

TrackStore.all = function(){
  let allTracks = [];
  for (let key in _tracks){
    allTracks.push(_tracks[key]);
  }
  return allTracks;
};

TrackStore.allForUserId = function(userId){
  let allTracksForUserId = [];
  for (let key in _tracks){
    if (_tracks[key].composer.id === userId){
      allTracksForUserId.push(_tracks[key]);
    }
  }
  return allTracksForUserId;
};

TrackStore.find = function(id){
  return _tracks[id] ? tracks[id] : {};
};

TrackStore.getCurrentTrack = function(){
  return Object.assign({}, _tracks[_currentTrack]);
};

TrackStore.isTrackPlaying = function(trackId){
  let track = _tracks[trackId];
  if (track){
    return track.playing;
  }
  return false;
};

const _updateTracks = function(tracks){
  tracks.forEach(function(track){
    //for now, only update tracks if they are not already in the store
    if (!_tracks[track.id]){
      track.playing = false;
      _tracks[track.id] = track;
      _playQueue.push(track.id);
    }
  });
  TrackStore.__emitChange();

};

const _addTrack = function(track){
  if (_tracks[track.id]){
    track.playing = _tracks[track.id].playing;
  }
  else {
    track.playing = false;
  }
  _tracks[track.id] = track;
  _playQueue.push(track.id);
  TrackStore.__emitChange();
};

const _removeTrack = function(track){
  delete _tracks[track.id];
  let trackIdx = _playQueue.indexOf(track);
  _playQueue.splice(trackIdx, 1);
  TrackStore.__emitChange();
};

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

const _playNextTrack = function(){
  let currentTrackIdx = _playQueue.indexOf(_currentTrack);
  let nextTrackId = _playQueue[currentTrackIdx+1];
  if (nextTrackId){
    _setCurrentTrack(nextTrackId);
  }
  else {
    _currentTrack = null;
  }
  TrackStore.__emitChange();
};

const _playPreviousTrack = function(){
  let currentTrackIdx = _playQueue.indexOf(_currentTrack);
  let previousTrackId = _playQueue[currentTrackIdx-1];
  if (previousTrackId){
    _setCurrentTrack(previousTrackId);
  }
  else {
    _currentTrack = null;
  }
  TrackStore.__emitChange();
};

TrackStore.__onDispatch = (payload) => {
  switch (payload.actionType){
    case TrackConstants.RECEIVE_ALL_TRACKS:
      _updateTracks(payload.tracks);
      break;
    case TrackConstants.RECEIVE_SINGLE_TRACK:
      _addTrack(payload.track);
      break;
    case TrackConstants.REMOVE_TRACK:
      _removeTrack(payload.track);
      break;

    //playback
    case TrackConstants.SET_CURRENT_TRACK:
      _setCurrentTrack(payload.id, payload.timestamp);
      break;
    case TrackConstants.PAUSE_CURRENT_TRACK:
      _pauseCurrentTrack();
      break;
    case TrackConstants.SET_TIME_FOR_TRACK:
      _setTimeForTrack(payload.track, payload.time, payload.current);
      break;
    case TrackConstants.PLAY_NEXT_TRACK:
      _playNextTrack();
      break;
    case TrackConstants.PLAY_PREVIOUS_TRACK:
      _playPreviousTrack();
      break;
  }
};

module.exports = TrackStore;
