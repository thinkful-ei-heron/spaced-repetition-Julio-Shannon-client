import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import UserContext from '../../contexts/UserContext';

class DashboardRoute extends Component {
  static contextType = UserContext;
  render() {
    return (
      <section>
        <h2>Hello, {this.context.user.name}</h2>
        <Dashboard />
      </section>
    );
  }
}

export default DashboardRoute;
