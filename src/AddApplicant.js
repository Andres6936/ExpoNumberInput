import React, {Component} from 'react';

export class AddApplicant extends Component {

    showLabel = (label) =>
        <div className="row form-inline border-bottom">
            <label className="col-4 col-form-label pr-5 border-right">{label}</label>
            <input className="col-8 form-control pl-4" type="text"/>
        </div>

    render = () =>
        <div className="container-fluid pt-5">
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