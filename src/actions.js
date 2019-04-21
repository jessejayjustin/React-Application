import { FETCH_CHARITIES, UPDATE_TOTAL_DONATE, UPDATE_MESSAGE } from "./action-types";
import { summaryDonations } from './helpers';

export function fetchCharities() {
    return dispatch => {
      return fetch('http://localhost:3001/charities')
        .then(function(resp) { return resp.json(); })
        .then(function(data) {
            dispatch({type: FETCH_CHARITIES, payload: data});
        }).catch(response => {
          console.log(response)
        });
    };
};

export function fetchPayments() {
    return dispatch => {
      return fetch('http://localhost:3001/payments')
        .then(function(resp) { return resp.json(); })
        .then(function(data) {
        	//console.log(data)
            dispatch({
            	type: UPDATE_TOTAL_DONATE, 
            	payload: summaryDonations(data.map((item) => (item.amount)))
            });
        }).catch(response => {
          console.log(response)
        });
    };
};

export function handleAddPayment({id, amount, currency}) {
    return dispatch => {
       return fetch('http://localhost:3001/payments', {
        method: 'POST',
        body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
        headers: { /* POST request should include a Content-Type: application/json header to use the JSON in the request body. Otherwise it will result in a 200 OK but without changes being made to the data. */
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      }).then((response) => {
        response.json().then(data =>{
          dispatch({type: UPDATE_TOTAL_DONATE, payload: data.amount});
          dispatch({
            type: UPDATE_MESSAGE,
            payload: `Thanks for donate ${data.amount}`,
          });
          setTimeout(function() {
            dispatch({
              type: UPDATE_MESSAGE,
              message: ``,
            });
          }, 2000);
        })
      }).catch(response => {
          console.log(response)
      });
    };
};