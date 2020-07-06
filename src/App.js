import React, {Component} from 'react';
import {ShowApplicant} from './ShowApplicant';
import {AddApplicant} from "./AddApplicant";

export default class App extends Component {

  constructor() {
    super();
    // Determine the actual page to render
    this.renderPage = "ShowApplicant";
  }

  switchRenderPage(toRender){
    this.renderPage = toRender;
  }

  render() {
    if(this.renderPage === "ShowApplicant") {
      return <ShowApplicant callback={this.switchRenderPage}/>
    } else if (this.renderPage === "AddApplicant") {
      return <AddApplicant/>
    }
  }

}
