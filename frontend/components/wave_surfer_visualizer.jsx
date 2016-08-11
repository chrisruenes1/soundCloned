const React = require('react');
import Wavesurfer from 'react-wavesurfer';

const WaveSurferVisualizer = React.createClass({
  render(){
    return(
      <div>
        <Wavesurfer
          audioFile={this.props.track.audio_file_url}
          waveColor='#333'
          progressColor={this.props.progressColor}
        />
      </div>

    );

  }
});

module.exports = WaveSurferVisualizer;
