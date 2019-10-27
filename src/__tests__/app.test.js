import React from 'react';
import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { configure, mount, shallow, render } from 'enzyme';
import SmartComponent, { App } from '../App';
import { Card } from '../components/card';
import * as actions from '../actions';
import * as types from '../action-types';
import summaryDonations from '../helpers';
configure({ adapter: new Adapter() });

const props = {
  getCharities: jest.fn(),
  getDonations: jest.fn(),
  handleAddPayment: jest.fn()
}

const charities = [ 
  {
    "id": 1,
    "name": "Lorem ipsum dolor sit amet",
    "image": "hchi16.jpg",
    "currency": "EUR"
  },
  {
    "id": 2,
    "name": "Ut enim ad minim veniam",
    "image": "hchi2.jpg",
    "currency": "EUR"
  },
  {
    "id": 3,
    "name": "Neque porro quisquam est",
    "image": "hchi4.jpg",
    "currency": "EUR"
  }
];

describe('Component Rendering', () => {
  let wrapper, container, containerProp;

  beforeEach(() => {
    wrapper = shallow(<App charities={charities} {...props} />);
    container = wrapper.find('h3');
    containerProp = container.props();
  });

  it('renders <App> component', () => {
    expect(wrapper).toBeDefined();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a <div>', () => {
    expect(wrapper.find('div')).toHaveLength(3); 
  });

  it('should have a <div>', () => {
    expect(wrapper.find('p')).toHaveLength(1); 
  });

  it('should have a <div> with className container', () => {
    expect(wrapper.find('.container')).toHaveLength(1);
  });

  it('should have a <div> with className header', () => {
    expect(wrapper.find('.header')).toHaveLength(1);
  });

  it('should have a <div> with className row', () => {
    expect(wrapper.find('.row')).toHaveLength(1);
  });

  it('renders child component', () => {
    expect(wrapper.find('Card')).toBeDefined();
  });

  it('should have a <div> with properly className prop', () => {
    expect(containerProp.className).toEqual('text-center title');
  });

});

const middlewares = [thunk]; // add your middlewares like redux-thunk`
const mockStore = configureMockStore(middlewares);

describe('>>><SmartComponent/> --- REACT-REDUX (wrapping in <Provider>)',()=>{
  let store, wrapper;

  const initialState = {
    donations: 0,
    charities: [],
    message: '',
    error: null,
  }

  beforeEach(()=>{
    store = mockStore(initialState)
    wrapper = shallow(<Provider store={store}><SmartComponent/></Provider>)
  });

  it('+++ render the <SmartComponent/>', () => {
    expect(wrapper.find(SmartComponent).length).toEqual(1)
  });
});

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates GET_CHARITIES_SUCCESS when fetching charities has been done', () => {
    nock('http://localhost:3001')
      .get('/charities')
      .reply(200, { charities: ['do something'] });

    const expectedActions = [
      { type: types.GET_CHARITIES_SUCCESS, payload: { charities: ['do something']  } }
    ]

    const store = mockStore({ charities: [] });
    store.dispatch(actions.getCharities()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
});

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates UPDATE_TOTAL_DONATIONS when fetching donations has been done', () => {
    
    nock('http://localhost:3001')
      .get('/donations')
      .reply(200, {});

    const expectedActions = [
      { type: types.UPDATE_TOTAL_DONATIONS, payload: 0 }
    ];

    const store = mockStore({});
    store.dispatch(actions.getDonations()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
});
/*
describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates UPDATE_TOTAL_DONATIONS when post donations has been done', () => {
    fetchMock.getOnce('/donations', {
      body: { donations: ['do something'] },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { donations: ['do something'] } }
    ]
    const store = mockStore({ donations: [] })

    return store.dispatch(actions.handleAddPayment()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
*/
     





