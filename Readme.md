# Open weather map API with redis cache
This project uses redis as a cache database to
store results of https://openweathermap.org api.

Configuration resides in .env

### Project dependencies
- Redis -> Will not run without redis-server installed
- Koa

# How to run
Assuming you have Redis setup on your machine, clone this
repository and the run:
```npm i```

Afterwards create a file named ```.env``` in the projects 
root directory and copy the contents of ```.env.example```
into the newly created file.

Enter the configuration based on your environment and then
run the api using ```npm run start```

# How it works
A dummy endpoint that returns dummy data is at ```/weather.```
The endpoint that returns valid data based on OWM API is at
```/weather/:cityName```.
It is a GET endpoint. To get weather data of Tehran you would request
for the weather data by requesting
```http://localhost:8080/weahter/tehran``` and you will get data that looks like the following:

```
{
  "hasError": false,
  "errorMessage": "",
  "data": {
    "coord": {
      "lon": 51.4215,
      "lat": 35.6944
    },
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 288.37,
      "feels_like": 283.73,
      "temp_min": 288.15,
      "temp_max": 288.71,
      "pressure": 1022,
      "humidity": 14
    },
    "visibility": 10000,
    "wind": {
      "speed": 2.06,
      "deg": 130
    },
    "clouds": {
      "all": 0
    },
    "dt": 1617123159,
    "sys": {
      "type": 1,
      "id": 7464,
      "country": "IR",
      "sunrise": 1617071018,
      "sunset": 1617116020
    },
    "timezone": 16200,
    "id": 112931,
    "name": "Tehran",
    "cod": 200
  }
}
```
If for any reason a user enters an invalid url parameter,
the response will consist of ```hasError: true``` and
will be given an error message at 
```errorMessage: 'This is an error'```:
```
{
  "hasError": true,
  "errorMessage": "Request failed with status code 404",
  "data": null
}
```
No other endpoints are defined. If an attempt to consume
an undefined endpoint is made, Koa will automatically
return ```Not found```.

