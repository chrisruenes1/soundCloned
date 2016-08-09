const AppDispatcher = require("../dispatcher/dispatcher");
const TimeConstants = require('../constants/time_constants');

module.exports = {
  reset_timer(time){
    AppDispatcher.dispatch({
      actionType: TimeConstants.RESET_TIMER,
      time: time
    });
  }
};
