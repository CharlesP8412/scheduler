# Interview Scheduler

The interview scheduler is a single page applicaiton (SPA) built with React.

The program allows a student to book an interview with a mentor.
Spots remaining for each day of the week will automatically update with any changes.

Built with components from Storybooks.js, the frontend communicates with an API server over HTTP using JSON format.

Data is persisted by an API server using a PostgreSQL database please see: 
!["Overview"](https://github.com/CharlesP8412/scheduler-api)

### Tools used: 
```
- React
- Storybook
- Jest
- React Testing Library
- Axios
- Babel
- Webpack
- Webpack Dev Server
```
## Screenshots
!["Overview"](https://raw.githubusercontent.com/CharlesP8412/scheduler/master/docs/overview.gif)
!["Static Overview"](https://raw.githubusercontent.com/CharlesP8412/scheduler/master/docs/Screenshot%201.png)


## Dependencies
- React
- React-DOM
- React-Scripts
- Axios
- Classnames
- Normalize.css

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress End to End Testbed

```sh
npm run cypress
```

## Known Issues
- Concurrent users need to refresh for latest info.  Plan on implementing Websockets
