const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const AudioSourceStore = new Store(AppDispatcher);
const AudioSourceConstants = require('../constants/audio_source_constants');

let _audioSource = {};

AudioSourceStore.getAudioSource = function(){
  return Object.assign({}, _audioSource);
};

const _setAudioSource = function(HTMLAudioElement){
  _audioSource = HTMLAudioElement;
  AudioSourceStore.__emitChange();
};

AudioSourceStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case AudioSourceConstants.SET_AUDIO_SOURCE:
      _setAudioSource(payload.audio_source);
      break;
  }
};

module.exports = AudioSourceStore;
