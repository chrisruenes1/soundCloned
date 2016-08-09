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
  handleSubmit(){
    let comment = this.state;
    comment.author_id = SessionStore.currentUser().id;
    let track_id = this.props.trackId;
    //switch this out with real time code!!
    comment.elapsed_time = 23.3323521;
    CommentActions.createComment(comment, track_id);
    this.setState({ content: "" });
  },
  render(){
    return(

      <form onSubmit={this.handleSubmit}>
        <input
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
});

module.exports = CommentForm;
