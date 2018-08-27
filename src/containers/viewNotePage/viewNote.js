import React from 'react';
import axios from 'axios';
import Divider from 'material-ui/Divider';
import EditNote from '../../components/editNotePage/editNote';

class ViewNote extends React.Component {
  state = {
    id: '',
    title: '',
    content: '',
    isEditing: false,
  }

  componentDidMount() {
    axios.get(`/api/notes/${this.props.match.params.title}`)
      .then((res) => {
        this.setState({
          id: res.data.id,
          title: res.data.title,
          content: res.data.content,
        });
      })
      .catch(error => console.error(error));
  }

  editNote = () => {
    this.setState({
      isEditing: true,
    });
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === 'titleEdit') {
      this.setState({
        title: value,
      });
    } else if (name === 'contentEdit') {
      this.setState({
        content: value,
      });
    }
  };

  updateNote = () => {
    const { title, content, id } = this.state;
    const payload = { title, content };
    axios.put(`/api/notes/${id}`, payload)
      .then(() => {
        this.setState({
          isEditing: false,
        });
      });
  }

  deleteNote = (id) => {
    axios.delete(`/api/notes/${id}`)
      .then(() => {
        this.props.history.push('/notes');
      });
  }

  render() {
    const {
      isEditing, title, content, id,
    } = this.state;
    return (
      <div className="page">
        {isEditing
          ? (
            <EditNote
              noteEdit={{ title, content }}
              handleChange={this.handleChange}
              updateNote={this.updateNote}
            />
          )
          : (
            <div>
              <div style={{ float: 'right' }}>
                <button
                  type="button"
                  onClick={() => this.editNote()}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => this.deleteNote(id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </div>
              <h1>
                {title}
              </h1>
              <Divider />
              <p>
                {content}
              </p>
            </div>
          )
        }
      </div>
    );
  }
}
export default ViewNote;
