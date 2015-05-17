'use strict';

import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <section id="typePost">
        <header>
          <h3>Was denkst du über Deutschland?</h3>
        </header>
        <textarea className="baseTextarea" autoFocus></textarea>
      </section>
    );
  }
}
