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
    currentResults: null
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
          this.context.setCurrentResult(res);
          this.setState({
            guess: userInput.trim(),
            flipped: !this.state.flipped
          });
        }
      );
    }
  };

  handleWrongAns = () => {
    return (
      <div className="Learn_Feedback" aria-live="polite">
        <h2>Good try, but not quite right :(</h2>
        <p>
          The correct translation for{' '}
          {this.context.currentWord && this.context.currentWord.nextWord} was{' '}
          {this.context.currentResult && this.context.currentResult.answer} and
          you chose {this.state.guess}!
        </p>
      </div>
    );
  };

  handleRightAns = () => {
    return (
      <div className="Learn_Feedback" aria-live="polite">
        <h2 className="correct">You were correct! :D</h2>
        <p>
          The correct translation for{' '}
          {this.context.currentWord && this.context.currentWord.nextWord} was{' '}
          {this.context.currentResult && this.context.currentResult.answer} and
          you chose {this.state.guess}!
        </p>
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
              <h2 className="translateHeader">Translate the word:</h2>
              <span>
                {this.context.currentResult
                  ? this.context.currentResult.nextWord
                  : this.context.currentWord &&
                    this.context.currentWord.nextWord}
              </span>
              <div className="Learn_Input">
                <form onSubmit={e => this.handleClick(e)}>
                  <fieldset>
                    <label htmlFor="learn-guess-input">
                      What's the translation for this word?
                    </label>
                    <input
                      placeholder="Input Translation"
                      id="learn-guess-input"
                      type="text"
                      aria-label="Translation Input"
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <Button type="submit" className="submitAnswer">
                    Submit
                  </Button>
                </form>
                {/* the following p elements are not currently displayed on the font of the card 
                in order to give the front of the card a cleaner look. Remove display:none from the css file to display. */}
                <p>
                  Your total score is:{' '}
                  {this.context.currentResult
                    ? this.context.currentResult.totalScore
                    : this.context.currentWord &&
                      this.context.currentWord.totalScore}
                </p>
                <p className="correctCount">
                  {' '}
                  You have answered this word correctly{' '}
                  {this.context.currentWord &&
                    this.context.currentWord.wordCorrectCount}{' '}
                  times.{' '}
                </p>
                <p className="incorrectCount">
                  You have answered this word incorrectly{' '}
                  {this.context.currentWord &&
                    this.context.currentWord.wordIncorrectCount}{' '}
                  times.
                </p>
              </div>
            </div>
            <div className={flipCardBack} aria-live="polite">
              {this.context.currentResult &&
              this.context.currentResult.isCorrect
                ? this.handleRightAns()
                : this.handleWrongAns()}
              <Button
                className="nextQuestion"
                type="submit"
                onClick={e => this.handleClick(e)}
              >
                Try another word!
              </Button>
              <div className="stats" aria-live="polite">
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
                <div className="DisplayScore">
                  <p>
                    Total Score:{' '}
                    {this.context.currentResult &&
                      this.context.currentResult.totalScore}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
