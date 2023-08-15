# BenchMarket

## A little about BenchMarket

BenchMarket is an application for tech professionals to see how they rank up against others in similar positions to them. Users can enter their candidate id and see what percentile they rank in both coding and communication! (Actually a take home assignment but it's fun to imagine.)

Live: https://benchmarket-sfa.herokuapp.com/ (NOTE: If visiting outside of 8:00am - 6:00pm est please give the dynos a few seconds to wake up)

## Development

* Setup:
   1. Clone the repository at: https://github.com/CamChandler98/simple-fractal-takehome
   2. Check that Postgresql is installed localy
   3. Create a database user
   4. Create a database with the user you created as the owner
   5. Create a .env in the root directory file following the .envexample
* To start a development environment:
    1. Run the command "npm install" from the react-app directory in your terminal to install dependencies for the front end
    2. Run the command "pipenv install" from the root directory in your terminal to install dependencies for the backend and create a virtual environment.
    3. Run the command "flask db upgrade" to add tables to the database
    4. Run the command "flask seed all" to seed data
    5. Run the command "flask run" from the root directory to start the backend server.
    6. Run the command "npm start" from the react-app directory to start the frontend server.
    7. Navigate to the localhost port specified in config/index.js

 ## Technologies Used
* Javascript
* HTML/CSS
* Reactjs
* Python
* Node.js
* Flask
* SQLAlchemy
* Postgres
* Heroku
* Git/Github
* Pytest
* Styled-Components


## Application Architecture
BenchMarket is built using a React frontend , a Flask web framework , Flask-SQLAlchemy ORM and Postgresql RDMS. This stack was chosen primarily with extensibility in mind. Currently the database only has two tables, Companies and Candidates, but since there is a one-to-many relationship between these two tables I thought it was appropriate to use a RDMS like postgres. Flask and Flask-SQLAlchemy we're chosen due to the ease of writing routes and changing/adding models. React's state mangement and virtual DOM allows for data to easily be updated and displayed and React's functional components compartmentalizes changes so features can be added and mutated without too much worry of immediately breaking everything. Pytest was used for automated unit testing.

## Code Snippets
### Find similar companies
hybrid instance-static method returns true if a companies fractal_score is within the allowed range
```python
Class Companies

    @hybrid_method
    def are_similar(self, target_fi, max_distance):
        return math.fabs(self["fractal_index"] - target_fi) < max_distance

    @are_similar.expression
    def are_similar(clss, target_fi, max_distance):

        return and_(clss.fractal_index > target_fi - max_distance, clss.fractal_index < target_fi +max_distance)

```
Function performers a query, filtering based upon the return result of `are_similar` method

```python
def get_similar_companies(company_id):

    target_company = Company.query.get(company_id)

    similar_companies = db.session.query(Company).filter(Company.are_similar(target_company.fractal_index, 0.15)).all()
    return [company.id for company in similar_companies]
```

### Calculate percentiles
``` python

def percentile_calculator(lst, value):

    # Total number of data points
    total = len(lst)
    # calculate percentile as percent of total datapoints strictly less than or equal to target value subtract by 1 to exclude target
    total_below = len([item for item in lst if item <= value]) - 1

    percentile = (total_below/total) * 100


    return percentile
```
## API Routes
* `GET /api/score/candidate/<id>`
   returns :
   ```js

   {
   "communication": candidate_communication_percentile,
   "coding": candidate_coding_percentile
   }

   ```
