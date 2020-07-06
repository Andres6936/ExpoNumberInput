import React, {Component} from 'react';

export class AddApplicant extends Component {

    showLabel = (label, value) =>
        <div className="row form-inline border-bottom">
            <label className="col-4 col-form-label pr-5 border-right">{label}</label>
            <input className="col-8 form-control-plaintext pl-4" type="text" readOnly value={value}/>
        </div>

    render = () =>
        <div className="container-fluid pt-5">
            <main className="col-12 col-lg-4 bg-light mx-auto p-3">
                <section className="row row-cols-1">
                    <div className="col">

                        {this.showLabel("Name:", "Joan")}
                        {this.showLabel("Age:", "23")}
                        {this.showLabel("Profession:", "Engineer System")}
                        {this.showLabel("Experience:", "2 years 4 months")}
                        {this.showLabel("Telephone:", "319 656 9458")}

                    </div>
                </section>
            </main>
        </div>
}