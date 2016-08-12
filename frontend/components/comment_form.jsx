const React = require('react');
const SessionStore = require('../stores/session_store');
const CommentActions = require('../actions/comment_actions');


const CommentForm = React.createClass({
  getInitialState(){
    return { content: "" };
  },
  contentChange(e){
    let newContent = e.currentTarget.value;
    this.setState({content: newContent});
  },
  handleSubmit(e){
    e.preventDefault();
    let comment = this.state;
    comment.author_id = SessionStore.currentUser().id;
    let track_id = this.props.trackId;
    comment.elapsed_time = this.props.currentTime;
    CommentActions.createComment(comment, track_id);
    this.setState({ content: "" });
  },
  render(){
    if (SessionStore.isUserLoggedIn()){
      return(

        <form onSubmit={this.handleSubmit}>
          <span><img className="comment-pic" src={SessionStore.currentUser().image_url}/></span>
          <input className="comment-input"
            type="text"
            value={this.state.content}
            onChange={this.contentChange}
            placeholder="Add a comment"
            ></input>

          <button
            type="submit"
            />

        </form>
      );
    }
    else {
      return(
        <div></div>
      );
    }
  }
});

module.exports = CommentForm;
