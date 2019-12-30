import React, { Component } from 'react';
import './Dashboard.css';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
  state = {
    language: null,
    words: null,
  };
  componentDidMount() {
    AuthApiService.fetchDashboard().then(res => {
      this.setState({
        language: res.language,
        words: res.words,
      });
    });
  }
  renderWordList = () => {
    return this.state.words.map(word => {
      return (
        <li className="main_word">
          <h4>{word.original}</h4>
          {/* Correct: {word.correct_count} Incorrect: {word.incorrect_count} */}
          <ul className='scores'>
            <li className='correct'>Correct: {word.correct_count}</li>
            <li className='incorrect'>Incorrect: {word.incorrect_count}</li>
          </ul>
        </li>
      );
    });
  };
  render() {
    console.log(this.state.words && this.renderWordList());
    return (
      <div className="Dashboard_Container">
        <h2>{this.state.language && this.state.language.name}</h2>
        <Link to='/learn'><Button>Start Practicing</Button></Link>
        <section>
          <h3>
            Total Correct Answers:{' '}
            {this.state.language && this.state.language.total_score}
          </h3>
        </section>
        <h3 className='wordsHeader'>Words to Practice</h3>
        <ul className="wordList">
          {this.state.words && this.renderWordList()}
        </ul>
      </div>
    );
  }
}
