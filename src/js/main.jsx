import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({

  render() {
    return (
      <div className="app">
        Hello App
        <img src="/apple-icon.png" />
      </div>
    )
  }
});

ReactDOM.render(<App/>, document.querySelector('#main'));
