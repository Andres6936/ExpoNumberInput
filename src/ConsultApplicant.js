import React, {Component} from 'react';

export class ConsultApplicant extends Component {
    render = () =>
        <div className="row row-cols-1">
            <div className="col col-12 btn-group">
                <button className="col-2 btn btn-outline-primary offset-1">Hire</button>
                <button className="col-2 btn btn-outline-secondary">Younger</button>
                <button className="col-2 btn btn-outline-secondary">Older</button>
                <button className="col-2 btn btn-outline-secondary">Expert</button>
                <button className="col-2 btn btn-outline-danger">Delete</button>
            </div>
        </div>
}