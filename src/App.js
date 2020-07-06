import React, {Component} from 'react';
import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

export default class App extends Component {

    showLabel = (label, value) =>
        <div className="row form-inline border-bottom">
            <label className="col-4 col-form-label pr-5 border-right">{label}</label>
            <input className="col-8 form-control-plaintext pl-4" type="text" readOnly value={value}/>
        </div>

  render = () =>
    <div className="container-fluid pt-5">
        <main className="col-12 col-lg-4 bg-light mx-auto p-3">
            <section className="row row-cols-2">
                <div className="col">
                    <img src={logo} className="img-thumbnail" alt="Photo"/>
                </div>

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
