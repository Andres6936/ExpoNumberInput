import React, {Component} from 'react';
import getApplicants from './DataApplicants';
import {ShowApplicant} from './ShowApplicant';
import {AddApplicant} from "./AddApplicant";

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            // Index in the array for the actual applicant
            index: 0,
            // List of applicants
            applicants: getApplicants(),
            // Determine the actual page to render
            renderPage: "ShowApplicant",
        }
        // Reference to actual applicant
        this.actualApplicant = this.state.applicants[this.state.index];
        // For avoid lose the context {this} of React
        this.nextApplicant = this.nextApplicant.bind(this);
    }

    prevApplicant() {

    }

    nextApplicant = () => {
        if (this.state.index <= this.state.applicants.length) {
            this.setState({index: this.state.index + 1});
        } else {
            this.setState({index: 0});
        }

        this.actualApplicant = this.state.applicants[this.state.index];
    }

    setRenderPage = (toRender) => {
        this.setState({renderPage: toRender});
        localStorage.setItem("todos", JSON.stringify(this.state));
    };

    render() {
        if(this.state.renderPage === "ShowApplicant") {
            return <ShowApplicant callback={this.setRenderPage} applicant={this.actualApplicant} next={this.nextApplicant}/>
        } else if (this.state.renderPage === "AddApplicant") {
            return <AddApplicant callback={this.setRenderPage}/>
        }
    }

}
