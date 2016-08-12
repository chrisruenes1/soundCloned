const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const TimeConstants = require('../constants/time_constants');
const TimeStore = new Store(AppDispatcher);

let _currentTime = 0;
let _pauseTimes = {};

TimeStore.getCurrentTime =function() {
  return _currentTime;
};

TimeStore.getTimeForTrack = function(trackId){
  return _pauseTimes[trackId] || 0;
};

const _resetCurrentTime = function(time, currentTrackId) {
  _currentTime = time;
  _pauseTimes[currentTrackId] = time;
  TimeStore.__emitChange();
};

const _setTimeForTrack = function(time, trackId){
  _pauseTimes[trackId] = time;
};

TimeStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case TimeConstants.RESET_TIMER :
      _resetCurrentTime(payload.time, payload.currentTrackId);
      break;
    case TimeConstants.UPDATE_TRACK :
      _setTimeForTrack(payload.time, payload.trackId);
      break;
  }
};

module.exports = TimeStore;
