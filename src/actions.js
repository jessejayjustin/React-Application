import { GET_CHARITIES, UPDATE_TOTAL_DONATIONS, UPDATE_MESSAGE, ERROR_MESSAGE } from "./action-types";
import { summaryDonations } from './helpers';

export function getCharities() {
    return dispatch => {
      const url = `http://localhost:3001/charities`;
      return fetch(url)
      .then(function(resp) { return resp.json(); })
      .then(function(data) {
        dispatch({ type: GET_CHARITIES, payload: data });
      }).catch(err => {
        dispatch({ type: ERROR_MESSAGE, payload: err });
      });
    };
};

export function getDonations() {
    return dispatch => {
      const url = `http://localhost:3001/payments`;
      return fetch(url)
      .then(function(resp) { return resp.json(); })
      .then(function(data) {
        dispatch({
          type: UPDATE_TOTAL_DONATIONS, 
          payload: summaryDonations(data.map((item) => (item.amount)))
        });
      }).catch(err => {
        dispatch({ type: ERROR_MESSAGE, payload: err });
      });
    };
};

export function handleAddPayment(id, amt, currency) {
    return dispatch => {
        return fetch(`http://localhost:3001/payments`, {
        method: 'POST',
        body: `{ "charitiesId": ${id}, "amount": ${amt}, "currency": "${currency}" }`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      }).then((response) => {
        response.json().then(data =>{
          dispatch({type: UPDATE_TOTAL_DONATIONS, payload: data.amount});
          dispatch({
            type: UPDATE_MESSAGE,
            payload: `Thanks for donating £ ${data.amount}`,
          });
          setTimeout(function() {
            dispatch({
              type: UPDATE_MESSAGE,
              message: ``,
            });
          }, 2000);
        })
      }).catch(err => {
          dispatch({ type: ERROR_MESSAGE, payload: err });
      });
    };
};