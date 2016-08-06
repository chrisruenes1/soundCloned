const TrackAPIUtil = require("../util/track_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const ErrorActions = require('./error_actions');
const TrackConstants = require('../constants/track_constants');

module.exports = {
  fetchAllTracks(){
    TrackAPIUtil.fetchAllTracks(this.receiveAllTracks);
  },
  fetchTrack(id){
    TrackApiUtil.fetchTrack(id, this.receiveSingleTrack);
  },
  createTrack(track){
    TrackApiUtil.createTrack(track, this.receiveSingleTrack, ErrorActions.setErrors);
  },
  editTrack(track){
    TrackApiUtil.updateTrack(track, this.receiveSingleTrack, ErrorActions.setErrors);
  },
  deleteTrack(track){
    TrackApiUtil.deleteTrack(track, this.removeTrack);
  },
  receiveAllTracks(tracks){
    AppDispatcher.dispatch({
      actionType:TrackConstants.RECEIVE_ALL_TRACKS,
      tracks:tracks
    });
  },
  receiveSingleTrack(track){
    AppDispatcher.dispatch({
      actionType:TrackConstants.RECEIVE_SINGLE_TRACK,
      track:track
    });
  },
  removeTrack(track){
    AppDispatcher.dispatch({
      actionType:TrackConstants.REMOVE_TRACK,
      track:track
    });
  }
};
