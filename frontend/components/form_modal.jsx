const React = require('react');
const Modal = require('react-modal');

const FormModal = React.createClass({
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

    //clone children with closeModal callback
    var newChildren = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { close: this.closeModal });
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
          onAfterOpen={this.afterOpenModal}
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
    height = '55%';
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
      backgroundColor   : 'rgba(255, 255, 255, 0.75)'
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
      padding                    : '20px'

    }
  };
};

module.exports = FormModal;
