#import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Passenger = Base.classes.passenger

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def homepage():
    """List all available api routes."""
    # return (
    #     f"Available Routes:<br/>"
    #     f"/api/v1.0/precipitation<br/>"
    #     f"/api/v1.0/stations<br/>"
    #     f"/api/v1.0/tobs<br/>"
    #     f"/api/v1.0/start<br/>"
    #     f"/api/v1.0/start/end"
    # )   

@app.route("/api/v1.0/precipitation")
def precipitation():

# `/api/v1.0/precipitation`
# Convert the query results to a Dictionary using `date` as the key and `prcp` as the value.
# Return the JSON representation of your dictionary.
    return()

@app.route("/api/v1.0/stations")
def stations():
# `/api/v1.0/stations`
# Return a JSON list of stations from the dataset.
    return()

@app.route("/api/v1.0/tobs")
def tobs():
# `/api/v1.0/tobs`
# query for the dates and temperature observations from a year from the last data point.
# Return a JSON list of Temperature Observations (tobs) for the previous year.
    return()

@app.route("/api/v1.0/start")
def start():
# `/api/v1.0/<start>` and `/api/v1.0/<start>/<end>`
# Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.
# When given the start only, calculate `TMIN`, `TAVG`, and `TMAX` for all dates greater than and equal to the start date.
# When given the start and the end date, calculate the `TMIN`, `TAVG`, and `TMAX` for dates between the start and end date inclusive.
    return()

@app.route("/api/v1.0/start/end")
def end():
# `/api/v1.0/<start>` and `/api/v1.0/<start>/<end>`
# Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.
# When given the start only, calculate `TMIN`, `TAVG`, and `TMAX` for all dates greater than and equal to the start date.
# When given the start and the end date, calculate the `TMIN`, `TAVG`, and `TMAX` for dates between the start and end date inclusive.
    return()

if __name__ == '__main__':
    app.run(debug=True)

