import React from 'react';
import {RouteHandler} from 'react-router';

import Header from './header.jsx';
import FluxComponent from "flummox/component";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <FluxComponent connectToStores={{SessionsStore:
                                        store => ({isLoggedIn: store.isLoggedIn()})}}>
          <Header />
        </FluxComponent>
        <RouteHandler/>
      </div>
    );
  }
}

export default App;
