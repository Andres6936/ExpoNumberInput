import React, {Component} from 'react';

export class AddApplicant extends Component {

    showNavigation = () =>
        <ul className="col-lg-4 nav nav-tabs mx-auto">
            <li className="nav-item">
                <a className="nav-link" onClick={() => this.props.callback("ShowApplicant")}>Show</a>
            </li>

            <li className="nav-item">
                <a className="bg-light nav-link active">Add</a>
            </li>
        </ul>

    showLabel = (label) =>
        <div className="row form-inline">
            <label className="col-4 col-form-label pr-5">{label}</label>
            <input className="col-7 form-control pl-4" type="text"/>
        </div>

    render = () =>
        <div className="container-fluid pt-5">

            {this.showNavigation()}

            <main className="col-12 col-lg-4 bg-light mx-auto p-3 border border-top-0">
                <section className="row row-cols-1">
                    <div className="col">

                        {this.showLabel("Name:")}
                        {this.showLabel("Age:")}
                        {this.showLabel("Profession:")}
                        {this.showLabel("Experience:")}
                        {this.showLabel("Telephone:")}

                    </div>
                </section>
            </main>
        </div>
}