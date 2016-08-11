const React = require('react');
const WebAudio = require('webaudio');
const AudioSouceStore = require('../stores/audio_source_store');
import Wavesurfer from 'react-wavesurfer';

const Visualizer = React.createClass({
  render(){
    if (true){
      return <div/>;
    }
    else {

      let source = AudioSourceStore.getAudioSource();
      if (source){
        //only render content if audio source is available
        let audioCtx = new window.AudioContext() || new window.webkitAudioContext();
        let analyser = audioCtx.createAnalyser(); //[sic]

        let source = audioCtx.createMediaStreamSource(this.props.source);
        source.connect(analyser);
        analyser.fftSize = 2048;
        let bufferLength = alayser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        analyser.getByteTimeDomainData(dataArray);

        return(
          <div>
          </div>

        );
      }

    }
  }
});

module.exports = Visualizer;
