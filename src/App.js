import React, {Component} from 'react';
import {ShowApplicant} from './ShowApplicant';
import {AddApplicant} from "./AddApplicant";

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            // Determine the actual page to render
            renderPage: "ShowApplicant"
        }
    }

    setRenderPage = (toRender) => this.setState({renderPage: toRender});

    render() {
        if(this.state.renderPage === "ShowApplicant") {
            return <ShowApplicant callback={this.setRenderPage}/>
        } else if (this.state.renderPage === "AddApplicant") {
            return <AddApplicant callback={this.setRenderPage}/>
        }
    }

}
