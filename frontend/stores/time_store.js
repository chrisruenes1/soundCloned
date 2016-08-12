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
  console.log("currentTrackId is " + currentTrackId);
  _currentTime = time;
  _pauseTimes[currentTrackId] = time;
  TimeStore.__emitChange();
};

TimeStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case TimeConstants.RESET_TIMER :
      _resetCurrentTime(payload.time, payload.currentTrackId);
      break;
  }
};

module.exports = TimeStore;
