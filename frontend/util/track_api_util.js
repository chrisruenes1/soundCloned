const ErrorConstants = require('../constants/error_constants');

module.exports = {
  fetchAllTracks: function(success){
    $.ajax({
      url:"api/tracks",
      type:"GET",
      success,
      error: function(xhr){
        error(ErrorConstants.TRACKS_INDEX, xhr.responseJSON);
      }
    });
  },
  fetchTrack: function(id, success){
    $.ajax({
      url:`api/tracks/${id}`,
      type:"GET",
      success,
      error: function(xhr){
<<<<<<< HEAD
        error(ErrorConstants.FETCH_TRACK, xhr.responseJSON);
=======
        console.log("Error in tracks#fetchTrack: " + xhr.responseJSON);
>>>>>>> 54b341296df34fbf4b4b418c243c3bafc14988d5
      }
    });
  },
  createTrack: function(formData, success, error){
    $.ajax({
      url:`api/tracks`,
      type:"POST",
      data: formData,
      contentType: false,
      processData: false,
      success,
      error: function(xhr){
        error(ErrorConstants.CREATE_TRACK, xhr.responseJSON);
      }
    });
  },
  editTrack: function(formData, success, error){
    $.ajax({
      url:`api/tracks/${track.id}`,
      type:"PATCH",
      data: formData,
      contentType: false,
      processData: false,
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
<<<<<<< HEAD
        error(ErrorConstants.DELETE_TRACK, xhr.responseJSON);
=======
        console.log("Error in tracks#deleteTrack: " + xhr.responseJSON);
>>>>>>> 54b341296df34fbf4b4b418c243c3bafc14988d5
      }
    });
  }
};
