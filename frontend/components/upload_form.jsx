const React = require('react');
const ErrorListItem = require('./error_list_item');
const TrackActions = require('../actions/track_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const ErrorConstants = require('../constants/error_constants');

const UploadForm = React.createClass({
  getInitialState(){
    this.listeners = [];
    return {
      public:true,
      title:"",
      genre:"",
      description:"",
      imageFile: null,
      imageUrl: null,
      trackFile: null,
      trackUrl: null,
      errors:[],
      success_message:""
    };
  },
  handleSubmit(e){
    e.preventDefault();
    var formData = new FormData();

    formData.append("track[title]", this.state.title);
    formData.append("track[composer_id]", SessionStore.currentUser().id);
    formData.append("track[public]", this.state.public);
    formData.append("track[genre]", this.state.genre);
    formData.append("track[description]", this.state.description);
    formData.append("track[image]", this.state.imageFile);
    formData.append("track[audio_file]", this.state.trackFile);

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
      else if ( character === character.toUpperCase() && i > 0 && i-1 != " " ){
        niceName = niceName.concat(" ").concat(name[i]);
      }
      else {
        niceName = niceName.concat(name[i]);
      }
    }

    return niceName;
  },

  updateTrackFile: function (e) {
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ trackFile: file, trackUrl: fileReader.result, title: this.parseName(file.name), success_message: `Successfully uploaded "${file.name}"` });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  triggerImageFileInput: function(e) {
    e.preventDefault();
    $("#image-file-input").trigger('click');
  },

  triggerTrackFileInput: function(e) {
    e.preventDefault();
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

    let success = <span className="success">{this.state.success_message}</span>;

    let messages =
      <div className="message-container">
        {errors}
        {success}
      </div>;

    let image = this.state.imageUrl ? <img className="upload-form-image" src={this.state.imageUrl} /> : <div></div>;

    let imageWithButton = <header className="upload-form-image image-placeholder">
      <div className="image-overlay">
        {image}
        <div className="image-button-positioner">
          <div className="image-button-container">
            <button onClick={this.triggerImageFileInput} className="image-button">Update image</button>
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

        <section className="modal-form-section">
          <div className="horizontal-radio-button-container">
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
            <input className="upload-submit"
              type="submit"
              value="Save"
            ></input>
          </div>
        </section>

      </article>;


    return (
      <div className="form-container">

        <form className="upload-form" onSubmit={this.handleSubmit}>

          <div className="upload-form-header-container">

            <h1 className="modal-form-title">Upload to SoundCloned</h1>

            <div className="track-button-container">
              <button onClick={this.triggerTrackFileInput} className="track-button">Choose a file to upload</button>
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
  },
  _onErrorChange(){
    this.setState({errors:ErrorStore.errors(ErrorConstants.CREATE_TRACK)});
  }
});

module.exports = UploadForm;
