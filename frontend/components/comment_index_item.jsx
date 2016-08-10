const React  = require('react');


const CommentIndexItem = React.createClass({
  render(){
    let leftPosition = 900/this.props.comment.elapsed_time.toString();
    const imageStyle = {
      width:'10px',
      height:'10px',
      backgroundColor: 'red',
      float: 'left',
      position: 'absolute',
      left: leftPosition
    };
    return(
      <div style={imageStyle}/>
    );
  }
});




module.exports = CommentIndexItem;
