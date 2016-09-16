const AppDispatcher = require("../dispatcher/dispatcher");
const TimeConstants = require('../constants/time_constants');

module.exports = {
  resetTimer(time, currentTrackId){
    AppDispatcher.dispatch({
      actionType: TimeConstants.RESET_TIMER,
      time: time,
      currentTrackId: currentTrackId
    });
  },
  updateTimeForTrack(time, trackId){
    AppDispatcher.dispatch({
      actionType: TimeConstants.UPDATE_TRACK,
      time: time,
      trackId: trackId
    });
  },
  resetTimeForTrack(trackId){
    AppDispatcher.dispatch({
      actionType: TimeConstants.RESET_TRACK,
      trackId: trackId
    });
  }
};
