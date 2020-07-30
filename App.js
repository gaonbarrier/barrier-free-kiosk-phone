import React, {Component} from 'react';
import DWrapper from './pages/Index';
import {RunServer, RunClient} from './networks/Server';

export default class App extends Component {
  componentDidMount() {
    // RunServer();
  }

  render() {
    return <DWrapper />;
  }
}
