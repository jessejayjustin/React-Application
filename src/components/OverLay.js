import React, { Component } from "react";
import styled from 'styled-components';

class OverLay extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: [],
      selectedAmount: 10
    };
  }

  handlePay(id, amount, currency) {
    this.setState(
      {
        selectedItem: {
          id: id,
          amount: amount,
          currency: currency
        }
      },
      function() {
        this.props.handlePay(this.state.selectedItem);
      }
    );
  }

  selectedAmount(amount) {
    this.setState({ selectedAmount: amount })
  }

  render() {
  
    const {payments, item, hideOverlay} = this.props;

    const overLayStyle = {
      backgroundColor: 'white',
      transition: '0.5s',
      zIndex: '1',
      width: '530px',
      height: '320px',
      opacity: '0.9',
      position: 'absolute',
      left: '0px',
      top: '0px'
    }

    const inputStyle = {
      display: 'inline-block',
      float: 'left',
      width: '12%',
      position: 'relative',
      left: '115px',
      top: '135px',
    }

    const textStyle = {
      fontSize: '18px',
      color: 'rgb(96,96,96)',
      fontFamily: 'Trebuchet MS, Helvetica, sans-serif'
    }

    const payBtn = {
      position: 'absolute',
      top: '190px',
      left: '245px',
      padding: '5px 9px',
      backgroundColor: 'rgb(255,255,255)',
      color: 'rgb(30,144,255)',
      fontFamily: 'system-ui',
      border: '2px solid rgb(30,144,255)',
      borderRadius: '3px',
      fontSize: '15px',
      fontWeight: 'bold',
      cursor: 'pointer'
    };

    const paymentText = {
      position: 'absolute',
      top: '70px',
      left: '119px',
      fontSize: '19px',
      color: 'rgb(96,96,96)',
      textAlign: 'center',
      fontFamily: 'Trebuchet MS, Helvetica, sans-serif'
    };

    const closeBtn = {
      position: 'absolute',
      right: '20px',
      top: '22px',
      zIndex: '1',
      cursor: 'pointer',
      fontSize: '22px',
      fontWeight: 'bold'
    };

    return (
      <div style={overLayStyle}>
      <span style={closeBtn} onClick={hideOverlay}>&#215;</span>
      <p style={paymentText}>Select the amount to donate (EUR)</p>
      {payments.map((amount, index) => {
          return (
            <div style={inputStyle} key={index} className="radio">
            <label>
              <input
               name="payment"
               type="radio"
               value={amount}
               onClick={() => {this.selectedAmount(amount)}}
              /><span></span><span style={textStyle}>{amount}</span>
            </label>
            </div>
          )
      })}
      <button 
      style={payBtn}
      onClick={this.handlePay.bind(
      this,
      item.id,
      this.state.selectedAmount,
      item.currency
      )}
      >Pay
      </button>
      </div>
    );
  }
}
 
export default OverLay;
