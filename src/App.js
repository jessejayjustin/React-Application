import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Cards from './components/Cards';
import { summaryDonations } from './helpers';
import { fetchCharities, fetchPayments, handleAddPayment } from './actions';
require('es6-promise').polyfill(); /* To get to the REST of the IE incompatibilities */
import 'isomorphic-fetch';

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      charities: [],
      payments: [10, 20, 50, 100, 500]
    };
    this.handleAddPayment = this.handleAddPayment.bind(this);
  }

  componentWillMount() {
    const self = this;
    self.props.fetchCharities()
    self.props.fetchPayments()
  }

  handleAddPayment(selectedItem) {
    const self = this;
    self.props.handleAddPayment(selectedItem)
  }
  
  render() {

    // not trigger eslint no-undef
    /* global Modernizr */
   
    const msg = {
      color: 'red',
      margin: '1em 0',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
      lineHeight: '1em 0'

    };

    const header = {
      color: 'rgb(96,96,96)',
      marginTop: '1em',
      fontWeight: 'bold',
      fontSize: '39px',
      textAlign: 'center',
      lineHeight: '.5em',
      fontFamily: 'Trebuchet MS, Helvetica, sans-serif'
    };

    const errors = {
      color: 'red',
      margin: '2em 0',
      fontWeight: 'bold',
      fontSize: '17px',
      textAlign: 'center',
      lineHeight: '0'
    };

    const donations = {
      color: 'red',
      margin: '2em 0',
      fontWeight: 'bold',
      fontSize: '17px',
      textAlign: 'center',
      lineHeight: '0'
    };

    const donate = this.props.donate;
    const message = this.props.message;
    
    return (
      <div className="app">
        <h1 style={header}>Donate For Environmental Protection</h1>
        { message ? null : <p style={donations}>All donations: {donate}</p> }
        <p style={msg}>{message}</p> 

       <Cards 
        charities={this.props.charities}
        payments={this.state.payments}
        handlePay={this.handleAddPayment}
       />
      </div>
    );
  }
}

// Access state properties
function mapStateToProps(state) {
  return {
    charities: state.store.charities,
    donate: state.store.donate,
    message: state.store.message
  }
}

export default connect(mapStateToProps, {fetchCharities, fetchPayments, handleAddPayment})(App);





