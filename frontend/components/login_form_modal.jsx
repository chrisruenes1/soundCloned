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
          style={getStyles()}
        >
        <LoginForm close={this.closeModal}/>
        </Modal>
      </div>
    );
  }

});

let getStyles = function(){
  return {
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
      width                      : '500px',
      height                     : '500px',
      position                   : 'absolute',
      left                       : '50%',
      top                        : '40%',
      transform                  : "translate(-50%, -50%)",
      border                     : '1px solid rgba(240, 238, 238, 1)',
      background                 : '#fff',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '20px'

    }
  };
};

module.exports = LoginFormModal;
