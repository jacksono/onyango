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
    token: localStorage.getItem('token'),
  }

  componentDidMount() {
    const { token } = this.state;
    axios.get(`/api/notes/${this.props.match.params.title}`, { headers: { authorization: `Bearer ${token}` } })
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
    const { title, content, id, token } = this.state;
    const payload = { title, content };
    axios.put(`/api/notes/${id}`, payload, { headers: { authorization: `Bearer ${token}` } })
      .then(() => {
        this.setState({
          isEditing: false,
        });
      });
  }

  deleteNote = (id) => {
    const { token } = this.state; 
    axios.delete(`/api/notes/${id}`, { headers: { authorization: `Bearer ${token}` } })
      .then(() => {
        this.props.history.push('/notes');
      });
  }

  handleCancel = () => {
    this.setState({
      isEditing: false,
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
              handleCancel={this.handleCancel}
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
