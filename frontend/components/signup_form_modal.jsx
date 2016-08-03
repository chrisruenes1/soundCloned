const React = require('react');
const Modal = require('react-modal');
const SignupForm = require('./signup_form');

const SignupFormModal = React.createClass({
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
        <button onClick={this.openModal}>Create account</button>
        <Modal
          className='modal'
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
        <SignupForm close={this.closeModal}/>
        </Modal>
      </div>
    );
  }

});

module.exports = SignupFormModal;
