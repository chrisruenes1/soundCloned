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
      errors:[]
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
      this.setState({ trackFile: file, trackUrl: fileReader.result, title: this.parseName(file.name) });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  triggerFileInput: function(e) {
    e.preventDefault();
    $("#file-input").trigger('click');
  },

  render(){
    let current_error_key = 0;
    let errorMessages = this.state.errors.map( (error) => {
      current_error_key++;
      return <ErrorListItem key={current_error_key} error={error} />;
    });

    let image = this.state.imageUrl ?
    <header className="upload-form-image image-placeholder">
      <div className="image-overlay">
        <img className="upload-form-image" src={this.state.imageUrl} />
        <div className="image-button-positioner">
          <div className="image-button-container">
            <button onClick={this.triggerFileInput} className="image-button">Update image</button>
            <input type="file" className="hidden-file-input" id="file-input" onChange={this.updateImageFile} />
          </div>
        </div>
      </div>
    </header>
      :
      <header className="upload-form-image image-placeholder">
        <div className="image-overlay">
          <div className="image-button-positioner">
            <div className="image-button-container">
              <button onClick={this.triggerFileInput} className="image-button">Update image</button>
              <input type="file" className="hidden-file-input" id="file-input" onChange={this.updateImageFile} />
            </div>
          </div>
        </div>
      </header>;


    return (
      <div className="form-container">

        <form className="upload-form" onSubmit={this.handleSubmit}>

          <h1 className="modal-form-title">Upload to SoundCloned</h1>
          <hr/>

          <ul>
            {
              errorMessages
            }
          </ul>

          <div className="group upload-form-content-container">
              {image}
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
