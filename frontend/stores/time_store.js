const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const TimeConstants = require('../constants/time_constants');
const TimeStore = new Store(AppDispatcher);

let _currentTime = 0;

TimeStore.getCurrentTime =function() {
  return _currentTime;
};

const _resetCurrentTime = function(time) {
  _currentTime = time;
  TimeStore.__emitChange();
};

TimeStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case TimeConstants.RESET_TIMER :
      _resetCurrentTime(payload.time);
  }
};

module.exports = TimeStore;
