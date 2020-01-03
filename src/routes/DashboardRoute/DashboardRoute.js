import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import UserContext from '../../contexts/UserContext';
import LanguageApiService from '../../services/language-api-service';

class DashboardRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };
  static contextType = UserContext;

  componentDidMount() {
    LanguageApiService.fetchDashboard().then(res => {
      if (res.error === 'Unauthorized request') {
        this.context.processLogout();
        this.props.history.push('/login');
      }
      if (res.error) {
        Promise.reject(res);
      }
      this.context.setWords(res.words);
      this.context.setLanguage(res.language);
    });
  }
  render() {
    return (
      <section aria-live="polite">
        <h2 aria-label="Welcome">Hello, {this.context.user.name}</h2>
        <Dashboard />
      </section>
    );
  }
}

export default DashboardRoute;
