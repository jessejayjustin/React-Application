import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './components/Card';
import { summaryDonations } from './helpers';
require('es6-promise').polyfill(); 
import 'isomorphic-fetch';

export class App extends Component {

  constructor(props) {
    super();
    this.state = {
      donations: 0,
      error: null,
      message: "",
      currIndex: null,
      charities: [],
    };
  }

  componentDidMount() {
    this.getCharities();
    this.getPayments();
  }

  async getCharities() {
    try {
      const url = `http://localhost:3001/charities`;
      const response = await fetch(url);
      if (!response.ok) {
        this.setState({ error: response.statusText });
      }
      const data = await response.json();
      this.setState({ charities: data });
    } catch (error) {
      this.setState({ error: error });
    }
  }

  async getPayments() {
    try {
      const url = `http://localhost:3001/payments`;
      const response = await fetch(url);
      if (!response.ok) {
        this.setState({ error: response.statusText });
      }
      const data = await response.json();
      this.setState({ donations: summaryDonations(data.map((item) => (item.amount)))});
    } catch (error) {
      this.setState({ error: error });
    }
  }

  handlePayment(id, amt, currency) {
    const url = `http://localhost:3001/payments`;
    const self = this;
    fetch(url, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        charitiesId : id,
        amount: amt,
        currency: currency
      })
    }).then(res => res.json())
    .then(responseJson => {
      self.getPayments();
    })
    .catch(error => console.error("error:", error));
  }
  
  handleOverlay(index) {
    this.setState({ currIndex: index });
  }

  render() {
    const { message, error, currIndex, donations, charities } = this.state;

    return (
    <div className="container">
      <div className="header">
        <h3 className="text-center title">Support Child Refugees of Iraq and Syria</h3>
        { message ? null : <p className="dn">All donations: £ {donations}</p> } 
        { error ? null : <p className="err tex-center">{error}</p> } 
      </div>
      <div className="row justify-content-center pb-5">
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
            handlePayment={this.handlePayment}
           ></Card>
          )
        })
      }
      </div>
    </div>
    );
  }
}

export default App;





