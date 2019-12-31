import React, { Component } from 'react';
import './LearningPage.css';
import Button from '../Button/Button';

export default class LearningPage extends Component {
  state = {
    flipped: false,
    guess: null,
    original: this.props.original ? this.props.original : 'etoille',
    answer: this.props.answer ? this.props.answer : 'star',
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({
      flipped: !this.state.flipped,
      guess: document.getElementById('translation_input').value.trim(),
    });
    document.getElementById('translation_input').value = '';
  };

  handleWrongAns = () => {
    return (
      <div className="Learn_Feedback">
        <h4>You Are Incorrect !</h4>
        <h4>The correct translation was {this.state.answer}</h4>
        <h4>You guessed {this.state.guess}</h4>
      </div>
    );
  };

  handleRightAns = () => {
    return (
      <div className="Learn_Feedback">
        <h4>You Are Correct !</h4>
        <h4>The correct translation was {this.state.answer}</h4>
        <h4>You guessed {this.state.guess}</h4>
      </div>
    );
  };

  render() {
    let flipCard = this.state.flipped ? 'flip-card flipped' : 'flip-card';
    return (
      <>
        <div className={flipCard}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h2>Word : {this.state.original}</h2>
              <div className="Learn_Input">
                <label htmlFor="translation_input">Translate the Word</label>
                <input
                  placeholder="Input Translation"
                  id="translation_input"
                  required
                />
              </div>
            </div>
            <div className="flip-card-back">
              <h1>Stats for this Word</h1>
              <p>Correct X times</p>
              <p>Incorrect X times</p>
              <p>Total Score</p>
              {this.state.guess === this.state.answer
                ? this.handleRightAns()
                : this.handleWrongAns()}
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
