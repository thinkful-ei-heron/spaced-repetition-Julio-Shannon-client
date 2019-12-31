import React, { Component } from 'react';
import './LearningPage.css';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';

export default class LearningPage extends Component {
  state = {
    flipped: false,
    guess: null,
    answer: null,
    //original: this.context.currentWord ? this.context.currentWord.nextWord : null,
    //answer: this.props.answer ? this.props.answer : 'star',
  };

  static contextType = UserContext;

  handleClick = e => {
    e.preventDefault();
    this.setState({
      flipped: !this.state.flipped,
      guess: document.getElementById('learn-guess-input').value.trim(),
    });
    document.getElementById('learn-guess-input').value = '';
  };

  handleWrongAns = () => {
    // this.setState({
    //   answer: 'wrong'
    // })
    // this.handleFlip('wrong')
    return (
      <div className="Learn_Feedback">
        <h3>You Are Incorrect !</h3>
        <h4>The correct translation was {this.context.currentWord && this.context.currentWord.translation}</h4>
        <h4>You guessed {this.state.guess}</h4>
      </div>
    );
  };

  handleRightAns = () => {
    // this.setState({
    //   answer: 'right'
    // })
    // this.handleFlip('right')
    return (
      <div className="Learn_Feedback">
        <h3>You Are Correct !</h3>
        <h4>The correct translation was {this.context.currentWord && this.context.currentWord.translation}</h4>
        <h4>You guessed {this.state.guess}</h4>
      </div>
    );
  };

  // handleFlip = (string) => {
  //   let element = document.getElementsByClassName('flip-card-back');
  //   console.log(element);
  //   console.log(element.length);
  //   if(element.length !== 0){
  //     element.classList.add(string);
  //   }
  // }

  render() {
    let flipCard = this.state.flipped ? 'flip-card flipped' : 'flip-card';
    //let flipCardBack = this.state.answer ? `flip-card-back ${this.state.answer}` : 'flip-card-back';
    return (
      <>
        <div className={flipCard}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h2>Translate the word:</h2>
              <span>{this.context.currentWord && this.context.currentWord.nextWord}</span>
              <div className="Learn_Input">
                <form>
                <label htmlFor="learn-guess-input">What's the translation for this word?</label>
                <input
                  placeholder="Input Translation"
                  id="learn-guess-input"
                  type= 'text'
                  required
                />
                </form>
                {/* <p>Your total score is: {this.context.currentWord && this.context.currentWord.totalScore}</p>
                <p>You have answered this word correctly {this.context.currentWord && this.context.currentWord.wordCorrectCount} times</p>
                <p>You have answered this word incorrectly {this.context.currentWord && this.context.currentWord.wordIncorrectCount} times</p> */}
              </div>
            </div>
            <div className='flip-card-back'>
              {this.state.guess && this.state.guess === this.context.currentWord.translation
                ? this.handleRightAns()
                : this.handleWrongAns()}
                
              <h3>Stats for this Word</h3>
              <p>Correct {this.context.currentWord && this.context.currentWord.wordCorrectCount} times</p>
              <p>Incorrect {this.context.currentWord && this.context.currentWord.wordIncorrectCount} times</p>
              <p>Total Score: {this.context.currentWord && this.context.currentWord.totalScore} </p>
              
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
