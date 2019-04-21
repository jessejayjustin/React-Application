import React, { Component } from "react";
import styled from 'styled-components';
import OverLay from "./OverLay";

const Container = styled.div`
  background-color: white;
  width: 530px;
  height: 320px;
  position: relative;
  left: 115px;
  margin: 20px 20px;
  float: left;
  border-radius: 5px;
  -moz-box-shadow: 0px 3px 11px rgb(211,211,211);
  -webkit-box-shadow: 0px 3px 11px rgb(211,211,211);
  box-shadow: 0px 3px 15px rgb(211,211,211);
`;

export class Cards extends Component {
  constructor() {
    super();

    this.state = {
      selectedAmount: 10,
      active: null,
      activate: null
    };
    this.myVisibility = this.myVisibility.bind(this);   // Bind returns a new function, allowing you to pass in a this array and any number of arguments.
    this.active = this.active.bind(this);
    this.disable = this.disable.bind(this);
    this.btnDisabled = this.btnDisabled.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
  }

  active(index) {
    if (this.state.active === index) {
      this.setState({active : null})
    } else {
      this.setState({active : index})
    }
  }

  myVisibility(index) {
    if (this.state.active === index) {
      return "visible";
    }
    return "hidden";
  }

  disable(item) {
    if (this.state.activate === item) {
      this.setState({activate : null})
    } else {
      this.setState({activate : item})
    }
  }

  btnDisabled(item) {
    if (this.state.activate === item) {
      return true;
    }
    return false;
  }

  hideOverlay() {
    //console.log("button clicked")
    this.setState({active : null})
    this.setState({activate : null})
  }

  render() {

    const imageStyle = {
      position: 'absolute',
      top: '0px',
      right: '0px',
      zIndex: '1',
      maxHeight:'100%',
      width: '530px',
      height: '245px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    };

    const btnStyle = {
      position: 'absolute',
      bottom: '23px',
      right: '25px',
      padding: '4px 9px',
      backgroundColor: 'rgb(255,255,255)',
      color: 'rgb(30,144,255)',
      fontFamily: 'system-ui',
      border: '2px solid rgb(30,144,255)',
      borderRadius: '3px',
      fontSize: '15px',
      fontWeight: 'bold',
      cursor: 'pointer'
    };

    const itemName = {
      position: 'absolute',
      bottom: '11px',
      left: '22px',
      fontSize: '17px',
      color: 'rgb(96,96,96)',
      fontFamily: 'Trebuchet MS, Helvetica, sans-serif'
    };

    const {charities, payments, handlePay} = this.props;
   
    return (
      <div className="app">
      {charities.map((item, index) => {
          return (
            <Container key={index} id="container">
            <img style={imageStyle} src={require(`../../public/images/${item.image}`)} alt="The image" className="img-responsive" />
            <p style={itemName}>{item.name}</p>
           
            <button style={btnStyle} onClick={() => { this.active(index); this.disable(index) }} disabled={this.btnDisabled(index)}>Donate</button> {/* onClick handler, invoking multiple functions */}
            
            <div style={{visibility:this.myVisibility(index)}}> {/* Using identifiers on map elements i can now activate/deactivate them all every time. By referencing each of them in a different way, then i can set the visibility property individually. */}
            <OverLay 
              payments={payments}
              item={item}
              handlePay={handlePay}
              hideOverlay={this.hideOverlay}
            />
            </div>
            </Container>
          )
      })}
      </div>
    );
  }
}

export default Cards;




