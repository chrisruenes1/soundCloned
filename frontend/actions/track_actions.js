const TrackAPIUtil = require("../util/track_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const ErrorActions = require('./error_actions');
const TrackConstants = require('../constants/track_constants');

module.exports = {
  fetchAllTracks(){
    TrackAPIUtil.fetchAllTracks(this.receiveAllTracks);
  },
  fetchTrack(id){
    TrackAPIUtil.fetchTrack(id, this.receiveSingleTrack);
  },
  createTrack(track, modal_close_callback){
    TrackAPIUtil.createTrack(track, this.receiveSingleTrackAndCloseModal.bind(null, modal_close_callback), ErrorActions.setErrors);
  },
  editTrack(track){
    TrackAPIUtil.updateTrack(track, this.receiveSingleTrack, ErrorActions.setErrors);
  },
  deleteTrack(track){
    TrackAPIUtil.deleteTrack(track, this.removeTrack);
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
  receiveSingleTrackAndCloseModal(modal_close_callback, track){
    AppDispatcher.dispatch({
      actionType: TrackConstants.RECEIVE_SINGLE_TRACK,
      track: track
    });
    modal_close_callback();
  },
  removeTrack(track){
    AppDispatcher.dispatch({
      actionType:TrackConstants.REMOVE_TRACK,
      track:track
    });
  },
  //currentTrack methods; do not require calls to TrackAPIUtil
  setCurrentTrack(id){
    AppDispatcher.dispatch({
      actionType: TrackConstants.SET_CURRENT_TRACK,
      id: id
    });
  },
  //this method is for the sake of persistence when switching between tracks;
  //realtime play and pause will be handled by the DOM Audio object
  pauseCurrentTrack(currentTime){
    AppDispatcher.dispatch({
      actionType: TrackConstants.PAUSE_CURRENT_TRACK,
      currentTime: currentTime
    });
  },

  playNextTrack(){
    AppDispatcher.dispatch({
      actionType: TrackConstants.PLAY_NEXT_TRACK
    });
  },

  playPreviousTrack(){
    AppDispatcher.dispatch({
      actionType: TrackConstants.PLAY_PREVIOUS_TRACK
    });
  }
};
