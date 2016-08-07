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

    TrackActions.createTrack(formData, this.props.close);
  },
  update(field, e){
    let newValue = e.target.value;
    let updateObject = {};

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

  render(){
    //error_stuff
    let current_error_key = 0;
    let errorMessages = this.state.errors.map( (error) => {
      current_error_key++;
      return <ErrorListItem key={current_error_key} error={error} />;
    });

    return(
      <div>

        <div className="form-container">

          <form className="upload-form" onSubmit={this.handleSubmit}>


            <h1 className="modal-form-title">Upload to SoundCloned</h1>
            <hr/>

            <ul>
              {
                errorMessages
              }
            </ul>

            <img className="track-image" src={this.state.imageUrl}/>

            <label>Public
              <input
                type="radio"
                name="privacy"
                checked={this.state.public}
                onChange={this.update.bind(null, "public")}
              ></input>
            </label>

            <label>Private
              <input
                type="radio"
                name="privacy"
                checked={!this.state.public}
                onChange={this.update.bind(null, "public")}
                ></input>
            </label>

            <article className="modal-form-text-info" >

              <section className="modal-form-section">
                <label className="modal-form-label">Title
                  <input className="modal-form-element modal-form-input modal-input-long"
                    type="text"
                    defaultValue={this.state.title}
                    onChange={this.update.bind(null, "title")}
                    placeholder="title"
                  ></input>
                </label>

              </section>

              <section className="modal-form-section multi-input-section">
                <label className="modal-form-label">Genre
                  <input className="modal-form-element modal-form-input modal-input-short"
                      type="text"
                      defaultValue={this.state.genre}
                      onChange={this.update.bind(null, "genre")}
                      placeholder="genre"
                    ></input>
                </label>

                <label className="modal-form-label">Track Image
                  <input className="modal-form-element modal-form-input"
                    type="file"
                    onChange={this.updateImageFile}
                    ></input>
                </label>

              </section>

              <label className="modal-form-label">Description
                <textarea className="modal-form-element modal-form-input modal-form-textarea"
                  defaultValue={this.state.description}
                  onChange={this.update.bind(null, "description")}
                  placeholder="description"
                ></textarea>
              </label>

              <section className="modal-form-section submit-container">

                <input className="modal-form-element modal-form-submit upload-submit"
                  type="submit"
                  value="Save"
                ></input>

              </section>

            </article>

          </form>
        </div>
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
