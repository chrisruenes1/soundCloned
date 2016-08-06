const ErrorConstants = require('../constants/error_constants');

module.exports = {
  fetchAllTracks: function(success){
    $.ajax({
      url:"api/tracks",
      type:"GET",
      success,
      error: function(xhr){
        console.log("Error in tracks#fetchAllTracks: " + xhr.responseJSON);
      }
    });
  },
  fetchTrack: function(id, success){
    $.ajax({
      url:`api/tracks/${id}`,
      type:"GET",
      success,
      error: function(xhr){
        console.log("Error in tracks#fetchTrack: " + xhr.responseJSON);
      }
    });
  },
  createTrack: function(track, success, error){
    $.ajax({
      url:`api/tracks`,
      type:"POST",
      data: { track: track },
      success,
      error: function(xhr){
        error(ErrorConstants.CREATE_TRACK, xhr.responseJSON);
      }
    });
  },
  editTrack: function(track, success, error){
    $.ajax({
      url:`api/tracks/${track.id}`,
      type:"PATCH",
      data: { track: track },
      success,
      error: function(xhr){
        error(ErrorConstants.UPDATE_TRACK, xhr.responseJSON);
      }
    });
  },
  deleteTrack: function(id, success, error){
    $.ajax({
      url:`api/tracks/${id}`,
      type:"DELETE",
      success,
      error: function(xhr){
        console.log("Error in tracks#deleteTrack: " + xhr.responseJSON);
      }
    });
  }
};
