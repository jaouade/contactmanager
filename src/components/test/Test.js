import React, { Component } from 'react';

class Test extends Component {
  state = {
    title: '',
    body: ''
  };
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          body: data.body
        })
      );
  }
  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1 className="text-danger">{title}</h1>
        <pre className="text-info">{body}</pre>
      </div>
    );
  }
}
export default Test;
