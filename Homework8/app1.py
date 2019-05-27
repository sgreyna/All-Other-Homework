import numpy as np
import datetime as dt
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func



from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Queries precipitation
#################################################
getDate = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
for i in getDate:
	    currentYear = dt.datetime.strptime(i, "%Y-%m-%d").strftime("%Y")
	    currentMonth = dt.datetime.strptime(i, "%Y-%m-%d").strftime("%m")
	

lastYear = int(currentYear)-1
currentYear = int(currentYear)
currentMonth = int(currentMonth)
currentDay = 1

currentYearDate = dt.date(currentYear, currentMonth ,currentDay)
lastYearDate = dt.date(lastYear, currentMonth ,currentDay)

results = session.query(Measurement.date, func.sum(Measurement.prcp)).\
    filter(Measurement.date >= lastYearDate).\
    filter(Measurement.date < currentYearDate).\
    group_by(Measurement.date).order_by(Measurement.date.asc()).all()
#################################################
# Queries station
#################################################
conn = engine.connect()
station = pd.read_sql("SELECT * FROM station", conn)
stationList = station.values.tolist()

#################################################
# Queries tobs
#################################################
active1 = session.query(Measurement.station).\
    group_by(Measurement.station).order_by(func.count(Measurement.station).desc()).first()

for i in active1:
    active1 = active1[0]

maxTStation = session.query(Measurement.station).\
    group_by(Measurement.station).order_by(func.max(Measurement.tobs).desc()).first()
for i in maxTStation:
    maxTStation = maxTStation[0]

# Query the last 12 months of temperature observation data for this station and plot the results as a histogram
resultsMaxTStation = session.query(Measurement.date, Measurement.tobs).\
    filter(Measurement.date >= lastYearDate).\
    filter(Measurement.date < currentYearDate).\
    filter(Measurement.station == active1).\
    group_by(Measurement.date).order_by(Measurement.date.asc()).all()

#dataframe
resultsMaxTStationdf = pd.DataFrame(resultsMaxTStation[:], columns=['date', 'tobs'])
resultsMaxTStationdf.reset_index()

tobsList = resultsMaxTStationdf.values.tolist()

#################################################
# Queries start and end
#################################################

def calc_temps(start_date, end_date):
    """TMIN, TAVG, and TMAX for a list of dates.
    
    Args:
        start_date (string): A date string in the format %Y-%m-%d
        end_date (string): A date string in the format %Y-%m-%d
        
    Returns:
        TMIN, TAVE, and TMAX
    """
    
    return session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all()

minAvgMax = calc_temps('2016-08-01', '2016-08-15')
	
# Return the JSON representation of your dictionary.
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
    return (
         f"Available Routes:<br/>"
         f"/api/v1.0/precipitation<br/>"
         f"/api/v1.0/stations<br/>"
         f"/api/v1.0/tobs<br/>"
         f"/api/v1.0/startAndend"
     )   

@app.route("/api/v1.0/precipitation")
def precipitation():

# `/api/v1.0/precipitation`
# Convert the query results to a Dictionary using `date` as the key and `prcp` as the value.
	return jsonify(results = results)

@app.route("/api/v1.0/stations")
def stations():
# `/api/v1.0/stations`
# Return a JSON list of stations from the dataset.
 return jsonify(results=stationList)

@app.route("/api/v1.0/tobs")
def tobs():
# `/api/v1.0/tobs`
# query for the dates and temperature observations from a year from the last data point.
# Return a JSON list of Temperature Observations (tobs) for the previous year.
 return jsonify(results = tobsList)

@app.route("/api/v1.0/startAndend")
def start():
# `/api/v1.0/<start>` and `/api/v1.0/<start>/<end>`
# Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.
# When given the start only, calculate `TMIN`, `TAVG`, and `TMAX` for all dates greater than and equal to the start date.
# When given the start and the end date, calculate the `TMIN`, `TAVG`, and `TMAX` for dates between the start and end date inclusive.
	

 return jsonify(results = minAvgMax)


if __name__ == '__main__':
    app.run(debug=True)

