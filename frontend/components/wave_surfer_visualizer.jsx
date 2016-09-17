const React = require('react');
const TrackActions = require('../actions/track_actions');
const TimeActions =  require('../actions/time_actions');
import Wavesurfer from 'react-wavesurfer';

const WaveSurferVisualizer = React.createClass({
  render(){
    let wavesurferOptions = {
      waveColor:'#333',
      progressColor:'#f50',
      height: 60,
      cursorColor:"transparent",
      cursorWidth:0,
      barWidth:2,
      playing:false,
      normalize:true,
      hideScrollbar: true
    };
    let wavesurfer =
     <Wavesurfer
        audioFile={this.props.track.audio_file_url}
        pos={this.props.pos}
        onPosChange={this.handlePosChange}
        options={wavesurferOptions}
        onZoom={this.handleZoom}
      />;
    return(
      <div className="clickable" width={this.props.parentContainerCurrentWidth}>
        {wavesurfer}
      </div>
    );

  },
  handlePosChange(e){
    let time = e.originalArgs[0];
    if (time > this.props.pos + 1 || time < this.props.pos - 1){ //very close clicks that are bigger than a single update
      TimeActions.updateTimeForTrack(time, this.props.track.id);
      TrackActions.setCurrentTrack(this.props.track.id);
    }
  }
});

module.exports = WaveSurferVisualizer;
