import React, {Component} from 'react';
import getApplicants from './DataApplicants';
import {ShowApplicant} from './ShowApplicant';
import {AddApplicant} from "./AddApplicant";

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            // List of applicants
            applicants: getApplicants(),
            // Determine the actual page to render
            renderPage: "ShowApplicant",
        }
    }

    setRenderPage = (toRender) => {
        this.setState({renderPage: toRender});
        localStorage.setItem("todos", JSON.stringify(this.state));
    };

    componentDidMount = () => {
        let data = localStorage.getItem("todos");
        this.setState(data != null ? JSON.parse(data) : {
               renderPage: "ShowApplicant",
            });
    }

    render() {
        if(this.state.renderPage === "ShowApplicant") {
            return <ShowApplicant callback={this.setRenderPage}/>
        } else if (this.state.renderPage === "AddApplicant") {
            return <AddApplicant callback={this.setRenderPage}/>
        }
    }

}
