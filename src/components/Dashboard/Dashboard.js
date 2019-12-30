import React, { Component } from 'react';
import './Dashboard.css';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
  static contextType = UserContext;

  renderWordList = () => {
    return this.context.words.map((word, index) => {
      return (
        <li className="main_word" key={index}>
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
    return (
      <div className="Dashboard_Container">
        <h2>{this.context.language && this.context.language.name}</h2>
        <Link to='/learn'><Button>Start Practicing</Button></Link>
        <section>
          <h3>
            Total Correct Answers:{' '}
            {this.context.language && this.context.language.total_score}
          </h3>
        </section>
        <h3 className='wordsHeader'>Words to Practice</h3>
        <ul className="wordList" tabIndex="0">
          {this.context.words && this.renderWordList()}
        </ul>
      </div>
    );
  }
}
