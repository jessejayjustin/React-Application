## React Application
```
Note:- Will be change to Humanitarian aid for middle east crisis
```
![]()

![alt text](https://github.com/jessejayjustin/React-Application/blob/master/resources/React%20Application.png
)

## Getting Started

install dependencies

```
npm install
```

Run app in development mode.
Open http://127.0.0.1:3000 to view it in the browser.

``` 
npm run client (Hot Reload Dev Environment)
```

start dev server

```
npm run server
```

Launch test runner in interactive watch mode.

```
npm run test
```

##General Flow

The flow goes something like this:

  1. Before the initial rendering occurs, the application dispatches an action creator which triggers a GET to the server, the server returns a data 

  2. The action creator parses the server response and returns Redux actions accordingly

  3. Success actions trigger an update of the application state, passing along any decoded data from the payload

  4. The connected component receives the new state as props renders its child component and passes the props down to it Before mounting, the child use the data it received from its parent wrapper
	
## Built With

* [React](https://reactjs.org/docs/getting-started.html) - The web framework used
* [Redux](https://redux.js.org/introduction/getting-started) - A framework for application state management
* [Jest](https://github.com/facebook/jest) - A comprehensive JavaScript testing solution
* [Enzyme](https://github.com/airbnb/enzyme) - A JavaScript Testing utility for React 

## Author

* **Jesse Jay** - *Initial work* - [jessejayjustin](https://github.com/jessejayjustin)


