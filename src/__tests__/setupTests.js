import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { mount, shallow, render } from 'enzyme';
import nock from 'nock';
import SmartApp, { App } from '../App';
import { Overlay } from '../components/Overlay';
import * as actions from '../actions';
import * as types from '../action-types';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
configure({ adapter: new Adapter() });

describe('Components', () => {
  let wrapper, container, containerProp, childContainer, childContainerProps;

  const props = {
    fetchCharities: jest.fn(),
    fetchPayments: jest.fn() 
  }

  beforeEach(() => {
    wrapper = shallow(<App {...props} />);
    container = wrapper.find("div");
    containerProp = container.props();
    childContainer = wrapper.find('Cards');
    childContainerProps = childContainer.props();
  });

  it('it should render the <App/> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a <div>", () => {
    expect(container).toHaveLength(1);
  });

  it("should have donate as prop", () => {
    expect(containerProp.donate).toEqual();
  });

  it("should have message as prop", () => {
    expect(containerProp.message).toEqual();
  });

  it("should have a <div> with properly className prop", () => {
    expect(containerProp.className).toEqual("app");
  });

  it("should have a <ChildContainer>", () => {
    expect(childContainer).toHaveLength(1);
  });

  it("should have payments as prop", () => {
    expect(childContainerProps.payments).toEqual([10, 20, 50, 100, 500]);
  });

  it("should have charities as prop", () => {
    expect(childContainerProps.charities).toEqual();
  });

  it("should have handleAddPayment as prop", () => {
    expect(childContainerProps.handleAddPayment).toEqual();
  });
});

describe('>>><SmartApp/> --- REACT-REDUX (wrapping in <Provider>)',()=>{
    const initialState = {
      donate: 0,
      charities: [],
      message: ''
    }
    const mockStore = configureMockStore()
    let store, wrapper;

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = shallow(<Provider store={store}><SmartApp/></Provider>)
    });

    it('+++ render the <SmartApp/> component', () => {
       expect(wrapper.find(SmartApp).length).toEqual(1)
    });
});

describe('action', () => {
  it('should create an action to fetchCharities', () => {
    expect(actions.fetchCharities({})).toBeDefined;
  })
});

describe('action', () => {
  it('should create an action to fetchPayments', () => {
    expect(actions.fetchPayments({})).toBeDefined;
  })
});

describe('action', () => {
  it('should create an action to handleAddPayment', () => {
    expect(actions.handleAddPayment({})).toBeDefined;
  })
});

/* Asynchronous actions, HTTP request to a server, npm run server */
const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureMockStore(middlewares)

function fetchCharitiesSuccess() {
  return {
    type: 'FETCH_CHARITIES'
  }
}

function fetchCharities () {
  return dispatch => {
    return fetch('http://localhost:3001/charities') // Some async action with promise
      .then(() => dispatch(fetchCharitiesSuccess()))
  };
}

it('should execute fetch charities data', () => {
  const store = mockStore({})

  // Return the promise
  return store.dispatch(fetchCharities())
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual(fetchCharitiesSuccess())
    })
})

function fetchPaymentsSuccess() {
  return {
    type: 'UPDATE_TOTAL_DONATE'
  }
}

function fetchPayments () {
  return dispatch => {
    return fetch('http://localhost:3001/payments') // Some async action with promise
      .then(() => dispatch(fetchPaymentsSuccess()))
  };
}

it('should execute fetch payments data', () => {
  const store = mockStore({})

  // Return the promise
  return store.dispatch(fetchPayments())
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual(fetchPaymentsSuccess())
    })
})

function handleAddPaymentSuccess() {
  return {
    type: 'UPDATE_TOTAL_DONATE'
  }
}

function handleAddPayment () {
  return dispatch => {
    return fetch('http://localhost:3001/payments') // Some async action with promise
      .then(() => dispatch(handleAddPaymentSuccess()))
  };
}

it('should execute post payments data', () => {
  const store = mockStore({})

  // Return the promise
  return store.dispatch(handleAddPayment())
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual(handleAddPaymentSuccess())
    })
})
/* Asynchronous actions, HTTP request to a server, npm run server */

const ROOT_URL = 'http://localhost:3001';

describe('actions', () => {

    beforeEach(() => {
        nock.disableNetConnect();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });

  describe('charities', () => {

    it('has the correct type', () => {
      var scope = nock(ROOT_URL).get('/charities').reply(200,{ charities: [{ id: 1, name: 'Baan Kru Noi', image: 'baan-kru-noi.jpg', currency: 'THB' }] });
      const store = mockStore({ charities: [] });

      store.dispatch(fetchCharities()).then(() => {
      const actions = store.getStore()
      expect(actions.charities).toEqual([{ id: 1, name: 'Baan Kru Noi', image: 'baan-kru-noi.jpg', currency: 'THB' }]);
    })

    });
  });
});

describe('actions', () => {

    beforeEach(() => {
        nock.disableNetConnect();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });

  describe('charities', () => {

    it('has the correct type', () => {
      var scope = nock(ROOT_URL).get('/payments').reply(200,{ payments: [{ charitiesId: 5, amount: 500, currency: 'THB', id: 1 }] });
      const store = mockStore({ payments: [] });

      store.dispatch(fetchPayments()).then(() => {
      const actions = store.getStore()
      expect(actions.payments).toEqual([{ charitiesId: 5, amount: 500, currency: 'THB', id: 1 }]);
    })

    });
  });
});





