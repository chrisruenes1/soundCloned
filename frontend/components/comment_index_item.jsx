const React  = require('react');


const CommentIndexItem = React.createClass({
  render(){
    let portionDone = this.props.comment.elapsed_time/this.props.track.duration || 0;
    const imageStyle = {
      width:'10px',
      height:'10px',
      backgroundColor: 'red',
      float: 'left',
      position: 'absolute',
      left: `calc(100% * ${portionDone})`
    };
    return(
      <div style={imageStyle}/>
    );
  }
});




module.exports = CommentIndexItem;
