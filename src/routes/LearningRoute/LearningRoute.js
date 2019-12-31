import React, { Component } from 'react';
import LearningPage from '../../components/LearningPage/LearningPage';
import LanguageApiService from '../../services/language-api-service';
import UserContext from '../../contexts/UserContext';

class LearningRoute extends Component {
static contextType = UserContext;

  componentDidMount(){
    LanguageApiService.fetchCurrentWord().then(res => {
      this.context.setCurrentWord(res);
    })
  }
  render() {
    return (
      <section>
        <LearningPage />
      </section>
    );
  }
}

export default LearningRoute;
