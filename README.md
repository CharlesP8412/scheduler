# Interview Scheduler

The interview scheduler is a single page applicaiton (SPA) built with React.

The program allows a student to book an interview with a mentor.
Spots remaining for each day of the week will automatically update with any changes.

Built with components from Storybooks.js, the frontend communicates with an API server over HTTP using JSON format.

#### Data is persisted by an API server using a PostgreSQL database.  Currently the app routes to a Heroku server for the API:

Route | Heroku Route (Url)
----- | ----------------
Days | ![http://scheduler-cvp.herokuapp.com/api/days](http://scheduler-cvp.herokuapp.com/api/days)
Appointments | ![http://scheduler-cvp.herokuapp.com/api/appointments](http://scheduler-cvp.herokuapp.com/api/appointments)
Interviewers | ![http://scheduler-cvp.herokuapp.com/api/interviewers](http://scheduler-cvp.herokuapp.com/api/interviewers)

NOTE: *Heroku server instances automatically shutdown after 30 minutes of inactivity; It may take two requests to bring the instance back online.*

To run your own API locally see: 
!["scheduler-api"](https://github.com/CharlesP8412/scheduler-api)
*Must adjust API calls (See useApplicationData.js Lines 11 to 24)* 


### Tools used to build Scheduler: 
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
- CircleC (Pipeline)
```

-----------------------------------

## Screenshots
!["Overview"](https://raw.githubusercontent.com/CharlesP8412/scheduler/master/docs/overview.gif)

-----------------------------------

## Dependencies
- React
- React-DOM
- React-Scripts
- Axios
- Classnames
- Normalize.css

-----------------------------------

## Setup
1. Fork this repository, then clone your fork.
2. Install dependencies using the `npm install` command.

To Run:                             | Shell Command       | Note
----------------------------------  | ------------------- | -------------
Webpack Development Server          | `npm start`| *http://localhost:8000/ opens automatically*
Jest Test Framework                 | `npm test`
Storybook Visual Testbed            | `npm run storybook`| http://localhost:9009/*
Cypress End to End Testbed          | `npm run cypress`| Webpack Development Server MUST be running prior to this command

## Features
- SPA Design with state of data.
  - Spots available will update as appointments are created or deleted
  - Error Handling on Save and Delete:
    - Will return to the appointment form when the message is closed

## Known Issues
- Concurrent users need to refresh to see LIVE changes made by other users
  - [ ] Implement Websockets
