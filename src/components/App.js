'use strict';

import React from 'react';
import _ from 'lodash';

const d2h = d => d.toString(16);
const h2d = h => parseInt(h,16);

function interpolateColor(minColor, maxColor, maxDepth, depth) {
  if (depth == 0){
    return minColor;
  }
  if (depth == maxDepth){
    return maxColor;
  }

  var color = "#";

  for (var i = 1; i <= 6; i += 2){
    var minVal = new Number(h2d(minColor.substr(i, 2)));
    var maxVal = new Number(h2d(maxColor.substr(i, 2)));
    var nVal = minVal + (maxVal - minVal) * (depth / maxDepth);
    var val = d2h(Math.floor(nVal));
    while (val.length < 2){
      val = "0" + val;
    }
    color += val;
  }

  return color;
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMessage: '',
      currentVote: '',
      messages: [],
      step: 0
    };
  }

  _handleTextareaKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      const messages = this.state.messages;

      if (this.state.currentMessage.trim() !== '') {
        messages.push({
          text: this.state.currentMessage,
          vote: 0,
          unvoted: true
        });
      }

      this.setState({
        messages,
        currentMessage: ''
      });

      if (e.metaKey) {
        const step = this.state.step + 1;
        this.setState({ step });
      }
    }
  }

  _handleTextareaChange(e) {
    this.setState({ currentMessage: e.target.value });
  }

  _handleInputChange(e) {
    this.setState({ currentVote: e.target.value });
  }

  _handleInputKeyDown(e) {
    if (e.keyCode === 13) {
      let step = this.state.step;
      const messages = this.state.messages;
      const message = _.find(this.state.messages, 'unvoted');
      message.unvoted = false;
      message.vote = parseInt(e.target.value, 10);

      if (!_.any(messages, 'unvoted')) {
        step++;
      }

      this.setState({
        step, messages,
        currentVote: ''
      });
    }
  }

  render() {
    switch(this.state.step) {
      case 0: {
        return (
          <section id="typePost">
            <header>
              <h3>Was denkst du über Deutschland?</h3>
            </header>
            <textarea onKeyDown={this._handleTextareaKeyDown.bind(this)}
                      onChange={this._handleTextareaChange.bind(this)}
                      value={this.state.currentMessage}
                      className="baseTextarea"
                      autoFocus />
          </section>
        );
      }
      case 1: {
        const message = _.find(this.state.messages, 'unvoted');
        return (
          <section id="votePost">
            <p className="baseTextarea">{message.text}</p>
            <div id="voteControls">
              <input type="text"
                     onChange={this._handleInputChange.bind(this)}
                     onKeyDown={this._handleInputKeyDown.bind(this)}
                     value={this.state.currentVote}
                     autoFocus />
            </div>
          </section>
        );
      }
      case 2: {
        const maxVote = _.max(this.state.messages.map(m => m.vote));
        const maxColor = '#74b917';
        const minColor = '#ff5500';
        return (
          <section id="ranking">
            {this.state.messages.map(m => (
              <div style={{color: interpolateColor(minColor, maxColor, maxVote, m.vote)}} className="rankedPost" key={Math.random()}>
                <p className="baseTextarea">{m.text}</p>
                <div className="voting"><div>{m.vote}</div></div>
              </div>
            ))}
          </section>
        );
      }
    }
  }
}
