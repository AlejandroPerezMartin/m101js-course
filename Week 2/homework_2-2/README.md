# Homework 2.2

Write a program that finds the document with the highest recorded temperature for each state, and adds a "month_high" field for
that document, setting its value to true. Import the weather dataset provided executing the command below:

`mongoimport --type csv --headerline weather_data.csv -d weather -c data`

This is a sample document from the weather data collection:

```json
{
    "_id" : ObjectId("520bea012ab230549e749cff"),
    "Day" : 1,
    "Time" : 54,
    "State" : "Vermont",
    "Airport" : "BTV",
    "Temperature" : 39,
    "Humidity" : 57,
    "Wind Speed" : 6,
    "Wind Direction" : 170,
    "Station Pressure" : 29.6,
    "Sea Level Pressure" : 150
}```
