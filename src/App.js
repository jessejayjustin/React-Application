import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getCharities, getDonations, handleAddPayment } from './actions';
import Card from './components/Card';
import { summaryDonations } from './helpers';
require('es6-promise').polyfill(); 
import 'isomorphic-fetch';

export class App extends Component {

  constructor(props) {
    super();
    this.state = {
      currIndex: null,
    };
  }

  componentDidMount() {
    this.props.getCharities();
    this.props.getDonations();
  }

  handleAddPayment(id, amt, currency) {
    this.props.handleAddPayment(id, amt, currency);
  }
  
  handleOverlay(index) {
    this.setState({ currIndex: index });
  }

  render() {

    const { currIndex } = this.state;
    const { message, error, charities, donations } = this.props;

    return (
    <div className="container">
      <div className="header">
        <h3 className="text-center title">Donate to Save the Children Foundation</h3>
        { message ? <p className="msg">{message}</p> : <p className="msg">All donations: £ {donations}</p> } 
        { error ? <p className="msg">{error}</p> : null } 
      </div>
      <div className="row pb-5 d-flex flex-row justify-content-center">
      { 
        charities.map((item, index) => {
          return (
           <Card 
            key={index} 
            id={index}
            name={item.name} 
            image={item.image}
            currency={item.currency}
            currIndex={currIndex}
            handleOverlay={this.handleOverlay.bind(this, index)}
            handlePayment={this.handleAddPayment.bind(this)}
           ></Card>
          )
        })
      }
      </div>
    </div>
    );
  }
}

// Access state properties
function mapStateToProps(state) {
  return {
    charities: state.store.charities,
    donations: state.store.donations,
    message: state.store.message,
    error: state.store.error
  }
}

export default connect(mapStateToProps, { getCharities, getDonations, handleAddPayment })(App);





