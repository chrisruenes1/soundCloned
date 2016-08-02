const React = require('react');
const ReactDOM = require('react-dom');

const Placeholder = React.createClass({
  render(){
    return(
      <div>
        <marquee>Watch me go!</marquee>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Placeholder />, document.getElementById('content'));
});
