import React, {Component} from 'react';
import {ShowApplicant} from './ShowApplicant';

export default class App extends Component {

  constructor() {
    super();
    // Determine the actual page to render
    this.renderPage = "ShowApplicant";
  }

  render() {
    if(this.renderPage === "ShowApplicant") {
      return <ShowApplicant/>
    }
  }

}
