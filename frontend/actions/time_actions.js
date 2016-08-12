const AppDispatcher = require("../dispatcher/dispatcher");
const TimeConstants = require('../constants/time_constants');

module.exports = {
  reset_timer(time, currentTrackId){
    AppDispatcher.dispatch({
      actionType: TimeConstants.RESET_TIMER,
      time: time,
      currentTrackId: currentTrackId
    });
  }
};
