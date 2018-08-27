import React from 'react';
import axios from 'axios';
import Divider from 'material-ui/Divider';

class ViewNote extends React.Component {
  state = {
    note: '',
  }

  componentDidMount() {
    axios.get(`/${this.props.match.params.title}`)
      .then((res) => {
        this.setState({
          note: res.data,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { note } = this.state;
    return (
      <div className="page">
        <h1>
          {note.title}
        </h1>
        <p>
          {note.content}
        </p>
        <Divider />
      </div>
    );
  }
}
export default ViewNote;
