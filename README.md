# Interview Scheduler

The interview scheduler is a single page applicaiton (SPA) built with React.

The program allows a student to book an interview with a mentor.
Spots remaining for each day of the week will automatically update with any changes.

Built with components from Storybooks.js, the frontend communicates with an API server over HTTP using JSON format.

Data is persisted by an API server using a PostgreSQL database.  Currently the app routes to a Heroku server for the API:

### Heroku API Routes
-------------------------------
Days | ![http://scheduler-cvp.herokuapp.com/api/days](http://scheduler-cvp.herokuapp.com/api/days)
Appointments | ![http://scheduler-cvp.herokuapp.com/api/appointments](http://scheduler-cvp.herokuapp.com/api/appointments)
Interviewers | ![http://scheduler-cvp.herokuapp.com/api/interviewers](http://scheduler-cvp.herokuapp.com/api/interviewers)

If you want to run your own API locally please see: 
!["scheduler-api"](https://github.com/CharlesP8412/scheduler-api)


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
- Heroku (Remote )
```
-----------------------------------
## Screenshots
!["Overview"](https://raw.githubusercontent.com/CharlesP8412/scheduler/master/docs/overview.gif)
!["Static Overview"](https://raw.githubusercontent.com/CharlesP8412/scheduler/master/docs/Screenshot%201.png)

-----------------------------------

## Dependencies
- React
- React-DOM
- React-Scripts
- Axios
- Classnames
- Normalize.css

*Will start without API server but will not be populated (Data or buttons) (!["scheduler-api"](https://github.com/CharlesP8412/scheduler-api))*
-----------------------------------

## Setup
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.



To Run:                             | Shell Command | Note
------------                        | ------------- | -------------
 Running Webpack Development Server | `npm start`| *Will automatically open http://localhost:8000/ when loaded.*
Running Jest Test Framework         | `npm test` |
Storybook Visual Testbed            | `npm run storybook`| Served at http://localhost:9009/*
Cypress End to End Testbed          | `npm run cypress`| Webpack Development Server MUST be running prior to this command



## Known Issues
- Concurrent users need to refresh for latest info.  Plan on implementing Websockets
