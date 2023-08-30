# BeatBreakdown

## A little about BeatBreakdown

BeatBreakdown is an application powered by the spotify web api to get more information on your tracks and get recommendations from that info!

Live: [BeatBreakdown](https://beat-breakdown-fa70b7f295a5.herokuapp.com/)

Note: BeatBreakdown is currently still in [development mode](https://developer.spotify.com/documentation/web-api/concepts/quota-modes), so please [click](https://docs.google.com/forms/d/1LGoQ1KocdjkDp-hEhzbn3qjZEdCeT3dOpKSwbtTg0PY/prefill) to get access.

## Development

* Setup:
   1. Clone the repository at: <https://github.com/CamChandler98/BeatBreakdown>
   2. Check that Postgresql is installed localy
   3. Create a database user
   4. Create a database with the user you created as the owner
   5. Create a .env in the root directory file following the .envexample
   6. Create an app with spotify developer: <https://developer.spotify.com/documentation/web-api/concepts/apps>
* To start a development environment:
    1. Run the command "npm install" from the react-app directory in your terminal to install dependencies for the front end
    2. Run the command "pipenv install" from the root directory in your terminal to install dependencies for the back end and create a virtual environment.
    3. Run the command "flask run" from the root directory to start the backend server.
    4. Run the command "npm start" from the react-app directory to start the frontend server.
    5. Navigate to the localhost port specified in config/index.js

## Technologies Used

* Javascript
* HTML/CSS
* Reactjs
* Redux
* Python
* Flask
* Postgres
* Heroku
* Git/Github
* Pytest
* Styled-Components
* Spotify API
* Anime.js

## Application Architecture 

BeatBreakdown is built using a React frontend , a Flask web framework , Flask-SQLAlchemy ORM and Postgresql RDMS.

### React

React's components and state management greatly eases the process of translating new features into intuitive UI elements

### Redux

Redux is used as a store for HeartString as well as being used to make API calls to the backend server

### Flask and Flask-SQLAlchemy

Flask and Flask-SQLAlchemy greatly increased the speed of developent by easing the process of writing API routes and database models.