const React = require('react');
const Modal = require('react-modal');
const FormConstants = require('../constants/form_constants');
const LoginForm = require('./login_form');
const SignupForm = require('./signup_form');

let formNameToObjectMap = {};
formNameToObjectMap[FormConstants.LOGIN_FORM] = <LoginForm />;
formNameToObjectMap[FormConstants.SIGNUP_FORM] = <SignupForm />;


const FormModal = React.createClass({
  getInitialState(){
    return {modalIsOpen:false, swappedChildren: null};
  },
  openModal(){
    this.setState({modalIsOpen:true});
  },
  closeModal(){
    this.setState({modalIsOpen: false});
  },
  swapChildren(newChildren){
    this.setState({ swappedChildren: newChildren });
  },
  render(){
    let children = this.state.swappedChildren ?
      this.state.swappedChildren.map(function(childFormName){
        return formNameToObjectMap[childFormName];
      }) 
      :
      this.props.children;

    //clone children with closeModal callback
    var newChildren = React.Children.map(children, (child) => {
      return React.cloneElement(child, { close: this.closeModal, swapChildren: this.swapChildren });
    });

    return(
      <div>
        <button
          className={this.props.className}
          onClick={this.openModal}>

          {this.props.buttonText}

        </button>
        <Modal
          className='modal'
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={getStyles.bind(this)()}
        >
        {newChildren}
        </Modal>
      </div>
    );
  }

});

let getStyles = function(){

  let height;
  let maxHeight;
  let width;
  let maxWidth;

  if (this.props.big){
    height = '85%';
    maxHeight = '535px';
    maxWidth='920px';
    width='60%';
  }

  else {
    height = this.props.height || 'inherit';
    maxHeight = '500px';
    width = "auto";
    maxWidth = "auto";
  }

  return {
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)',
      zIndex            : 9
    },
    content : {
      width                      : width,
      maxWidth                   : maxWidth,
      maxHeight                  : maxHeight,
      height                     : height,
      position                   : 'absolute',
      left                       : '50%',
      top                        : '50%',
      transform                  : "translate(-50%, -50%)",
      border                     : '1px solid rgba(240, 238, 238, 1)',
      background                 : '#fff',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '20px',
      zIndex                     : 10

    }
  };
};

module.exports = FormModal;
