const React = require('react');
import Wavesurfer from 'react-wavesurfer';

const WaveSurferVisualizer = React.createClass({
  onSeek(e){
    debugger
  },
  render(){
    
    let waveSurferOptions = {
        waveColor:'#333',
        progressColor:'#f50',
        height: 60,
        cursorColor:"transparent",
        cursorWidth:0,
        barWidth:2,
        playing:false,
        normalize:true
    };
    
    return(
      <div>
        <Wavesurfer
          audioFile={this.props.track.audio_file_url}
          pos={this.props.pos}
          onSeek={this.onSeek}
          options={waveSurferOptions}
        />
      </div>
    );

  },
});

module.exports = WaveSurferVisualizer;
