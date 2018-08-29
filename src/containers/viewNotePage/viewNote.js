import React from 'react';
import axios from 'axios';
import moment from 'moment';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import EditNote from '../../components/editNotePage/editNote';


class ViewNote extends React.Component {
  state = {
    id: '',
    title: '',
    content: '',
    createdDate: '',
    isEditing: false,
    token: localStorage.getItem('token'),
  }

  componentDidMount() {
    const { token } = this.state;
    const { match, history } = this.props;
    axios.get(`/api/notes/${match.params.id}`, { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        this.setState({
          id: res.data.id,
          title: res.data.title,
          content: res.data.content,
          createdDate: res.data.created_at,
        });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toastr.error(error.response.data.message);
          history.push('/notes');
        } else {
          toastr.error('Internal Server Error');
        }
      });
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
    const {
      title, content, id, token,
    } = this.state;
    const payload = { title, content };
    const Exp = /^([0-9]+[\s]*|[a-z]+[\s]*)+([0-9a-z]+)$/i;
    if (!title.match(Exp)) {
      toastr.error('Title can only contain letters and numbers');
      return;
    }
    axios.patch(`/api/notes/${id}`, payload, { headers: { authorization: `Bearer ${token}` } })
      .then(() => {
        this.setState({
          isEditing: false,
        });
      });
  }

  deleteNote = (id) => {
    const { token } = this.state;
    const { history } = this.props;
    axios.delete(`/api/notes/${id}`, { headers: { authorization: `Bearer ${token}` } })
      .then(() => {
        history.push('/notes');
      });
  }

  handleCancel = () => {
    this.setState({
      isEditing: false,
    });
  }

  render() {
    const {
      isEditing, title, content, id, createdDate,
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
              <span style={{ float: 'right', marginTop: '-20px' }}>
                {`Written on ${moment(createdDate).format('LL')}`}
              </span>
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

ViewNote.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ViewNote;
