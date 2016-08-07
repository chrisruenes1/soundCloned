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
    console.log("play called");
    let audio = new Audio(this.props.track.audio_file_url);
      audio.addEventListener("canplaythrough", function(){
        audio.play();
        setInterval(function(){console.log(audio.currentTime);}, 1000);
      });
    }
});

module.exports = TrackIndexItem;
