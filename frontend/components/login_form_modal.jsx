const React = require('react');
const Modal = require('react-modal');
const LoginForm = require('./login_form');

const LoginFormModal = React.createClass({
  getInitialState(){
    return {modalIsOpen:false};
  },
  openModal(){
    this.setState({modalIsOpen:true});
  },
  afterOpenModal(){

  },
  closeModal(){
    this.setState({modalIsOpen: false});
  },
  render(){
    return(
      <div>
        <button onClick={this.openModal}>Sign In!</button>
        <Modal
          className='modal'
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
        <LoginForm close={this.closeModal}/>
        </Modal>
      </div>
    );
  }

});

module.exports = LoginFormModal;
