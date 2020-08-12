import React, {Component} from 'react';
import DWrapper from './pages';
import {RunServer} from './networks/Server';

export default class App extends Component {
  componentDidMount() {
    // RunServer();
  }

  render() {
    return <DWrapper />;
  }
}
