const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const TrackStore = new Store(AppDispatcher);
const TrackConstants = require('../constants/track_constants');

let _tracks = {};
let _playQueue = [];

TrackStore.getCurrentTrack = function(){
  if (_playQueue.length > 0){
    return _playQueue.shift();
  }
};

TrackStore.all = function(){
  let allTracks = [];
  for (let key in _tracks){
    allTracks.push(_tracks[key]);
  }
  return allTracks;
};

TrackStore.find = function(id){
  return _tracks[id] ? tracks[id] : {};
};

const _resetTracks = function(tracks){
  _tracks = {};
  tracks.forEach(function(track){
    _tracks[track.id] = track;
    _playQueue.push(track);
  });
  TrackStore.__emitChange();

};

const _addTrack = function(track){
  _tracks[track.id] = track;
  TrackStore.__emitChange();
};

const _removeTrack = function(track){
  delete _tracks[track.id];
  TrackStore.__emitChage();
};

TrackStore.__onDispatch = (payload) => {
  switch (payload.actionType){
    case TrackConstants.RECEIVE_ALL_TRACKS:
      _resetTracks(payload.tracks);
      break;
    case TrackConstants.RECEIVE_SINGLE_TRACK:
      _addTrack(payload.track);
      break;
    case TrackConstants.REMOVE_TRACK:
      _removeTrack(payload.track);
      break;
  }
};

module.exports = TrackStore;
