const React = require('react');
import Modal, {closeStyel} from 'simple-react-modal';

const LoginForm = require('./login_form');

const LoginFormModal = React.createClass({
  getInitialState(){
    return {show:false};
  },
  show(){
    console.log("SHOW CLICKED");
    this.setState({show:true});
  },

  close(){
    this.setState({show:false});
  },
  render(){
    return(
      <Modal
        className='modal'
        conatinerStyle='modal-container'
        closeOnOuterClick={true}
        show={this.state.show}
        onClose={this.close}
      >
      <LoginForm />

      </Modal>
    );
  }

});

module.exports = LoginFormModal;
