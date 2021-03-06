const React = require('react');
const ErrorListItem = require('./error_list_item');
const TrackActions = require('../actions/track_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const ErrorConstants = require('../constants/error_constants');
const ErrorActions = require('../actions/error_actions');

const UploadForm = React.createClass({
  getInitialState(){
    this.listeners = [];
    return {
      public:true,
      title:"",
      genre:"",
      description:"",
      duration: 0,
      imageFile: null,
      imageUrl: null,
      trackFile: null,
      trackUrl: null,
      errors:[],
      frontendError:"",
      loadMessage:"",
      submitDisabled:true
    };
  },
  handleSubmit(e){
    e.preventDefault();
    //render load message
    let loadMessage = "Saving";
    this.setState({ loadMessage: loadMessage, submitDisabled: true });
    this.loadingInterval = setInterval( () => {
      let currentLoadMessage = this.state.loadMessage;
      if (currentLoadMessage.length < "Saving...".length){
        currentLoadMessage = currentLoadMessage.concat(".");
      }
      else {
        currentLoadMessage = "Saving";
      }
      this.setState({ loadMessage : currentLoadMessage });
    }, 1000);
    
    
    
    var formData = new FormData();
    formData.append("track[title]", this.state.title);
    formData.append("track[composer_id]", SessionStore.currentUser().id);
    formData.append("track[public]", this.state.public);
    formData.append("track[genre]", this.state.genre);
    formData.append("track[description]", this.state.description);
    if (this.state.imageFile){
      formData.append("track[image]", this.state.imageFile);
    }
    formData.append("track[audio_file]", this.state.trackFile);
    formData.append("track[duration]", this.state.duration);

    TrackActions.createTrack(formData, this.props.close);
  },
  update(field, e){
    let updateObject = {};
    let newValue;

    //parse radio buttons as booleans
    if (field === "public"){
      if (e.target.value === "public"){
        newValue = true;
      }
      else {
        newValue = false;
      }
    }

    else {
      newValue = e.target.value;
    }

    updateObject[field] = newValue;

    this.setState( updateObject );
  },

  updateImageFile: function (e) {
    e.preventDefault();
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ imageFile: file, imageUrl: fileReader.result} );
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  parseName(name){
    let niceName = "";
    let dot_indices = [];
    //go through and make sure there is only the file extension dot,
    //to avoid cutting out early
    for (let i = 0; i < name.length; i++) {
      if (name[i] === "."){
        dot_indices.push(i);
      }
    }

    //push every character until final ".", unless it would be
    //best rendered as whitespace.

    const whitespace_characters = ["_"];

    for (let i = 0; i < dot_indices[dot_indices.length - 1]; i++){
      let character = name[i];
      if ( (whitespace_characters.indexOf(character) > -1) ) {
        niceName = niceName.concat(" ");
      }
      //Also check to see if file name is written in camelCase,
      //and add a space before next capital if it is
      else if ( character === character.toUpperCase() &&
        i > 0 &&
        character.match(/[A-Za-z]/) &&
        name[i-1].match(/[A-Za-z]/))
      {
        niceName = niceName.concat(" ").concat(name[i]);
      }
      else {
        niceName = niceName.concat(name[i]);
      }
    }

    return niceName;
  },
  isFileExtensionValid(name){
    let extension = name.split('.').pop().toLowerCase();
    return this.getValidAudioFileTypes().indexOf(extension) > -1;
  },

  getValidAudioFileTypes(){
    return ['mp3']; //consider supporting m4a etc.
  },
  updateTrackFile: function (e) {
    this.setState({ loadMessage: "Loading" });
    
    let loadingInterval = setInterval( () => {
      let loadMessage = this.state.loadMessage;
      if (loadMessage.length < "Loading...".length){
        loadMessage = loadMessage.concat(".");
      }
      else {
        loadMessage = "Loading";
      }
      this.setState({ loadMessage: loadMessage });
    }, 1000);
    
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = () => {
      let audio = new Audio(fileReader.result);
      audio.addEventListener("loadedmetadata", () => {
        let duration = audio.duration;
        this.setState({
          trackFile: file,
          duration: duration,
          trackUrl: fileReader.result,
          title: this.parseName(file.name),
          frontendError: "",
          submitDisabled: false
        });
      });
      
      clearInterval(loadingInterval);
      this.setState({ loadMessage: "" });
    };

    if (file) {
      if(this.isFileExtensionValid(file.name)){
        fileReader.readAsDataURL(file);
      }
      else {
        this.setState({frontendError: "Sorry, we cannot support that file type!"});
      }
    }
  },

  handleTrackUploadClick: function(e){
    e.preventDefault();
    ErrorActions.clearErrors();
    this.triggerTrackFileInput();
  },

  triggerImageFileInput: function(e) {
    e.preventDefault();
    $("#image-file-input").trigger('click');
  },

  triggerTrackFileInput: function() {
    $("#track-file-input").trigger('click');
  },

  render(){

    let current_error_key = 0;
    let errorMessages = this.state.errors.map( (error) => {
      current_error_key++;
      return <ErrorListItem key={current_error_key} error={error} />;
    });

    let errors =
    <ul>
      {
        errorMessages
      }
    </ul>;

    let frontendError = <span className="small-error">{this.state.frontendError}</span>;
      
    let loadMessage = <span className="small-error">{this.state.loadMessage}</span>;
    let messages =
      <div className="message-container">
        {loadMessage}
        {frontendError}
        {errors}
      </div>;

    let image = this.state.imageUrl ? <img className="upload-form-image" src={this.state.imageUrl} /> : <div></div>;

    let imageWithButton = <header className="upload-form-image image-placeholder">
      <div className="image-overlay">
        {image}
        <div className="image-button-positioner">
          <div className="image-button-container">
            <button onClick={this.triggerImageFileInput} className="image-button">
              <img
                className='camera-img'
                src="https://s3.amazonaws.com/SOUND-CLONED-PROD/images/camera.png" />
              Update image
            </button>
            <input type="file" className="hidden-file-input" id="image-file-input" onChange={this.updateImageFile} />
          </div>
        </div>
      </div>
    </header>;

    let textInfo =
      <article className = "upload-modal-form-text-info">

        <section className="modal-form-section">
          <label className="upload-modal-form-label">Title<span className="required">*</span>
            <input className="modal-form-element modal-form-input upload-form-input upload-form-input-long"
              type="text"
              value={this.state.title}
              onChange={this.update.bind(null, "title")}
              placeholder="title"
              ></input>
          </label>
        </section>

        <section className="modal-form-section">
          <label className="upload-modal-form-label">Genre
            <input className="modal-form-element modal-form-input upload-form-input upload-form-input-short"
              type="text"
              value={this.state.genre}
              onChange={this.update.bind(null, "genre")}
              placeholder="genre"
              ></input>
          </label>
        </section>

        <section className="modal-form-section">
          <label className="upload-modal-form-label">Description
            <textarea className="modal-form-input upload-form-input upload-form-textarea"
              value={this.state.description}
              onChange={this.update.bind(null, "description")}
              placeholder="Describe your track"
              ></textarea>
          </label>
        </section>

        <section className="modal-form-section full-length-section">
          <span className="radio-buttons">Track will be
            <label htmlFor="public-radio"> public </label>
              <input
                id="public-radio"
                type="radio"
                name="privacy"
                value="public"
                checked={this.state.public}
                onChange={this.update.bind(null, "public")}
              ></input>


            <label htmlFor="private-radio"> private </label>
              <input
                id="private-radio"
                type="radio"
                name="privacy"
                value="private"
                checked={!this.state.public}
                onChange={this.update.bind(null, "public")}
              ></input>
          </span>
          <input disabled={this.state.submitDisabled}
            className="upload-submit"
            type="submit"
            value="Save"
          ></input>
        </section>

      </article>;


    return (
      <div className="form-container">

        <form className="upload-form" onSubmit={this.handleSubmit}>

          <div className="upload-form-header-container">

            <h1 className="modal-form-title">Upload to SoundCloned</h1>

            <div className="track-button-container">
              <button onClick={this.handleTrackUploadClick} className="track-button">Choose a file to upload</button>
              <input type="file" className="hidden-file-input" id="track-file-input" onChange={this.updateTrackFile} />
            </div>

          </div>

          <hr/>

          {messages}

          <div className="group upload-form-content-container">
              {imageWithButton}
              {textInfo}
          </div>

        </form>
      </div>
    );
  },
  componentDidMount(){
    this.listeners.push(ErrorStore.addListener(this._onErrorChange));
  },
  componentWillUnmount(){
    this.listeners.forEach(function(listener){
      listener.remove();
    });
    clearInterval(this.loadingInterval);
  },
  _onErrorChange(){
    this.setState({errors:ErrorStore.errors(ErrorConstants.CREATE_TRACK)});
  }
});

module.exports = UploadForm;
