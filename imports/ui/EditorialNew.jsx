import React, { Component } from 'react';
import Editorials from '../../lib/editorials';

export default class EditorialNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      content: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let author = this.state.author;
    let content = this.state.content;
    let that = this;

    Editorials.insert({ author, content }, function(err, _id) {
        if (err) {
          alert('Unexpected error creating this editorial! (' + err + ')');
        }
        else {
          that.setState({
            author: '',
            content: ''
          });
          alert('Published');
          Meteor.call( 'broadcastEmail', (err) => {
            if (err) {
              alert('broascastEmail error (' + err + ')');
            }
          });
        }
      }
    );

    return;
  }

  render() {
    return (
      <div className="container">
        <form id="new-editorial-form" action="action" onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label>Author</label>
            <input className="form-control" type="text" name="author" maxLength="40"
              value={this.state.author}
              onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea className="form-control" rows="10" cols="80" type="text" name="content" maxLength="500"
              value={this.state.content}
              onChange={this.handleChange} />
          </div>

          <input className="btn btn-default" type="submit" value="Create"/>

        </form>
      </div>
    )
  }
}
