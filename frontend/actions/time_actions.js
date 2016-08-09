const AppDispatcher = ('../dispatcher/dispatcher');
const TimeConstants = ('../constants/time_constants');

module.exports = {
  reset_timer(time){
    AppDispatcher.dispatch({
      actionType: TimeConstants.RESET_TIMER,
      time: time
    });
  }
};
