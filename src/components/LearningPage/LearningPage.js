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
      guess: document.getElementById('translation_input').value.trim(),
    });
    document.getElementById('translation_input').value = '';
  };

  handleWrongAns = () => {
    // this.setState({
    //   answer: 'wrong'
    // })
    // this.handleFlip('wrong')
    return (
      <div className="Learn_Feedback">
        <h4>You Are Incorrect !</h4>
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
        <h4>You Are Correct !</h4>
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
              <h2>Word : {this.context.currentWord && this.context.currentWord.nextWord}</h2>
              <div className="Learn_Input">
                <label htmlFor="translation_input">Translate the Word</label>
                <input
                  placeholder="Input Translation"
                  id="translation_input"
                  required
                />
              </div>
            </div>
            <div className='flip-card-back'>
              <h1>Stats for this Word</h1>
              <p>Correct {this.context.currentWord && this.context.currentWord.wordCorrectCount} times</p>
              <p>Incorrect {this.context.currentWord && this.context.currentWord.wordIncorrectCount} times</p>
              <p>Total Score: {this.context.currentWord && this.context.currentWord.totalScore} </p>
              {this.state.guess && this.state.guess === this.context.currentWord.translation
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
