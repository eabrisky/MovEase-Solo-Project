import React from 'react';

// css
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {

  return (

      <div className="movieContainer">
        <h2 className="componentTitle">ABOUT</h2>
        <p>This about page is for anyone to read!</p>
      </div>

  ); // end return

} // end AboutPage fn

export default AboutPage;
