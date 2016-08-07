const React = require('react');

const TrackIndexItem = React.createClass({
  render(){
    return(
    <li>
      <img className='track-image' src={this.props.track.image_url} />
      <section>
        {this.props.track.title}
        <button onClick={this.playTrack}>Play!</button>
      </section>

    </li>
    );
  },
  playTrack(){
    let audio = new Audio(this.props.track.audio_file_url);
      audio.load();
      audio.play();
  }
});

module.exports = TrackIndexItem;
