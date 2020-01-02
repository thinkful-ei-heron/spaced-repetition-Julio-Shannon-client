import React, { Component } from 'react';
import './LearningPage.css';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import LanguageApiService from '../../services/language-api-service';

export default class LearningPage extends Component {
  state = {
    flipped: false,
    guess: null,
    answer: null,
    currentResults: null,
  };

  static contextType = UserContext;

  handleClick = e => {
    e.preventDefault();
    let userInput = document.getElementById('learn-guess-input').value;
    if (this.state.flipped) {
      document.getElementById('learn-guess-input').value = '';
      LanguageApiService.fetchCurrentWord().then(res => {
        this.context.setCurrentWord(res);
        this.setState({ flipped: !this.state.flipped });
      });
    } else {
      LanguageApiService.postListGuess({ guess: userInput.trim() }).then(
        res => {
          console.log(res);
          this.context.setCurrentResult(res);
          this.setState({
            guess: userInput.trim(),
            flipped: !this.state.flipped,
          });
        }
      );
    }
  };

  handleWrongAns = () => {
    return (
      <div className="Learn_Feedback">
        <h3>You Are Incorrect !</h3>
        <h4>
          The correct translation was{' '}
          {this.context.currentResult && this.context.currentResult.answer}
        </h4>
        <h4>You guessed {this.state.guess}</h4>
      </div>
    );
  };

  handleRightAns = () => {
    return (
      <div className="Learn_Feedback">
        <h3>You Are Correct !</h3>
        <h4>
          The correct translation was{' '}
          {this.context.currentResult && this.context.currentResult.answer}
        </h4>
        <h4>You guessed {this.state.guess}</h4>
      </div>
    );
  };

  render() {
    let flipCard = this.state.flipped ? 'flip-card flipped' : 'flip-card';
    let flipCardBack = this.context.currentResult
      ? `flip-card-back ${
          this.context.currentResult.isCorrect ? 'right' : 'wrong'
        }`
      : 'flip-card-back';
    return (
      <>
        <div className={flipCard}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h2>Translate the word:</h2>
              <span>
                {this.context.currentWord && this.context.currentWord.nextWord}
              </span>
              <div className="Learn_Input">
                <form>
                  <label htmlFor="learn-guess-input">
                    What's the translation for this word?
                  </label>
                  <input
                    placeholder="Input Translation"
                    id="learn-guess-input"
                    type="text"
                    required
                  />
                </form>
                {/* <p>Your total score is: {this.context.currentWord && this.context.currentWord.totalScore}</p>
                <p>You have answered this word correctly {this.context.currentWord && this.context.currentWord.wordCorrectCount} times</p>
                <p>You have answered this word incorrectly {this.context.currentWord && this.context.currentWord.wordIncorrectCount} times</p> */}
              </div>
            </div>
            <div className={flipCardBack}>
              {this.context.currentResult &&
              this.context.currentResult.isCorrect
                ? this.handleRightAns()
                : this.handleWrongAns()}

              <h3>Stats for this Word</h3>
              <p>
                Correct{' '}
                {this.context.currentResult &&
                  this.context.currentResult.wordCorrectCount}{' '}
                times
              </p>
              <p>
                Incorrect{' '}
                {this.context.currentResult &&
                  this.context.currentResult.wordIncorrectCount}{' '}
                times
              </p>
              <p className="DisplayScore">
                Total Score:{' '}
                {this.context.currentResult &&
                  this.context.currentResult.totalScore}{' '}
              </p>
            </div>
          </div>
        </div>
        <Button type="submit" onClick={e => this.handleClick(e)}>
          {this.state.flipped ? 'Next Question' : 'Submit'}
        </Button>
      </>
    );
  }
}
