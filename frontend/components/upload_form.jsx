const React = require('react');
const ErrorListItem = require('./error_list_item');

const UploadForm = React.createClass({
  getInitialState(){
    return {
      public:false,
      title:"",
      genre:"",
      description:"",
      errors:[]
    };
  },
  handleSubmit(e){
    console.log("handleSubmitCalled");
  },
  update(field, e){
    let newValue = e.target.value;
    let updateObject = {};

    updateObject[field] = newValue;

    this.setState( updateObject );
  },

  render(){
    let errorMessages = this.state.errors.map(function(error){
      return <ErrorListItem error={error} />;
    });
    return(
      <div>

        <div className="form-container">

          <form className="upload-form" onSubmit={this.handleSubmit}>

            <ul>
              {
                errorMessages
              }
            </ul>

            <h1 className="modal-form-title">Upload to SoundCloned</h1>
            <hr/>

            <img className="profile-picture" src="http://assets9.classicfm.com/2015/51/danny-elfman-1450780658-article-0.jpg" />

            <label>Public
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={this.state.public}
                onChange={this.update}
              ></input>
            </label>

            <label>Private
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={!this.state.public}
                onChange={this.update}
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
  }
});

module.exports = UploadForm;
